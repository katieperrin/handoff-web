'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PLANS = [
  {
    tier: 'standard',
    name: 'Standard',
    price: '$149',
    period: '/month',
    perks: [
      '1 bag at a time',
      'No rental time limit',
      'Full catalog access',
    ],
  },
  {
    tier: 'premium',
    name: 'Premium',
    price: '$229',
    period: '/month',
    highlight: true,
    perks: [
      '2 bags at a time',
      'No rental time limit',
      'Full catalog access',
    ],
  },
];

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/browse` },
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? 'Processing…' : 'Subscribe'}
      </button>
    </form>
  );
}

export default function SubscribePage() {
  const router = useRouter();

  // step: 'plans' | 'address' | 'payment'
  const [step, setStep] = useState('plans');
  const [selectedTier, setSelectedTier] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [planError, setPlanError] = useState(null);

  // Address form state
  const [addr, setAddr] = useState({
    shipping_name: '', shipping_street1: '', shipping_street2: '',
    shipping_city: '', shipping_state: '', shipping_zip: '', shipping_phone: '',
  });
  const [savingAddr, setSavingAddr] = useState(false);
  const [addrError, setAddrError] = useState(null);

  const handleSelectPlan = async (tier) => {
    setLoadingPlan(tier);
    setPlanError(null);
    const { data, error } = await supabase.functions.invoke('create-subscription', {
      body: { tier, action: 'subscribe' },
    });
    if (error || !data?.clientSecret) {
      setPlanError(error?.message || 'Failed to start subscription. Please try again.');
      setLoadingPlan(null);
      return;
    }
    setSelectedTier(tier);
    setClientSecret(data.clientSecret);
    setLoadingPlan(null);
    setStep('address');
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!addr.shipping_name || !addr.shipping_street1 || !addr.shipping_city ||
        !addr.shipping_state || !addr.shipping_zip) {
      setAddrError('Please fill in all required fields.');
      return;
    }
    setSavingAddr(true);
    setAddrError(null);

    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('users').update({
      shipping_name:    addr.shipping_name,
      shipping_street1: addr.shipping_street1,
      shipping_street2: addr.shipping_street2 || null,
      shipping_city:    addr.shipping_city,
      shipping_state:   addr.shipping_state,
      shipping_zip:     addr.shipping_zip,
      shipping_phone:   addr.shipping_phone || null,
    }).eq('id', user.id);

    if (error) {
      setAddrError('Failed to save address. Please try again.');
      setSavingAddr(false);
      return;
    }
    setSavingAddr(false);
    setStep('payment');
  };

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300';
  const labelCls = 'block text-xs font-medium text-gray-500 mb-1';

  const selectedPlan = PLANS.find((p) => p.tier === selectedTier);

  return (
    <div className="min-h-screen bg-[#F8F6FB] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-1">The Handoffs</p>
          <h1 className="text-3xl font-bold text-[#2D2040]">Choose your membership</h1>
          <p className="text-gray-400 mt-2">Rent luxury bags, earn credits, and contribute your own.</p>
        </div>

        {/* ── Step 1: Plan selection ── */}
        {step === 'plans' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {PLANS.map((plan) => (
                <div
                  key={plan.tier}
                  className={`bg-white rounded-2xl border-2 p-6 flex flex-col ${
                    plan.highlight ? 'border-[#7B5EA7]' : 'border-gray-100'
                  }`}
                >
                  {plan.highlight && (
                    <span className="self-start text-xs font-bold text-[#7B5EA7] bg-purple-50 px-3 py-1 rounded-full mb-3">
                      Most Popular
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-[#2D2040]">{plan.name}</h2>
                  <p className="text-3xl font-bold text-[#2D2040] mt-1">
                    {plan.price}<span className="text-sm font-normal text-gray-400">{plan.period}</span>
                  </p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#7B5EA7] mt-0.5">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan.tier)}
                    disabled={loadingPlan === plan.tier}
                    className={`mt-6 w-full py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60 ${
                      plan.highlight
                        ? 'bg-[#7B5EA7] hover:bg-[#6a4f93] text-white'
                        : 'border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50'
                    }`}
                  >
                    {loadingPlan === plan.tier ? 'Loading…' : `Choose ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>
            {planError && <p className="text-center text-sm text-red-500">{planError}</p>}
          </>
        )}

        {/* ── Step 2: Shipping address ── */}
        {step === 'address' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md mx-auto">
            <h2 className="text-lg font-bold text-[#2D2040] mb-1">Shipping Address</h2>
            <p className="text-sm text-gray-400 mb-6">
              Where should we send your bags? You can update this anytime from your profile.
            </p>
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input className={inputCls} placeholder="Jane Smith" value={addr.shipping_name}
                  onChange={(e) => setAddr({ ...addr, shipping_name: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Street Address *</label>
                <input className={inputCls} placeholder="123 Main St" value={addr.shipping_street1}
                  onChange={(e) => setAddr({ ...addr, shipping_street1: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Apt / Suite (optional)</label>
                <input className={inputCls} placeholder="Apt 4B" value={addr.shipping_street2}
                  onChange={(e) => setAddr({ ...addr, shipping_street2: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>City *</label>
                  <input className={inputCls} placeholder="New York" value={addr.shipping_city}
                    onChange={(e) => setAddr({ ...addr, shipping_city: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>State *</label>
                  <select className={inputCls} value={addr.shipping_state}
                    onChange={(e) => setAddr({ ...addr, shipping_state: e.target.value })}>
                    <option value="">—</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>ZIP Code *</label>
                  <input className={inputCls} placeholder="10001" value={addr.shipping_zip}
                    onChange={(e) => setAddr({ ...addr, shipping_zip: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Phone (optional)</label>
                  <input className={inputCls} placeholder="212-555-0100" value={addr.shipping_phone}
                    onChange={(e) => setAddr({ ...addr, shipping_phone: e.target.value })} />
                </div>
              </div>
              {addrError && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{addrError}</p>}
              <button type="submit" disabled={savingAddr}
                className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors">
                {savingAddr ? 'Saving…' : 'Continue to Payment'}
              </button>
            </form>
            <button onClick={() => setStep('plans')}
              className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600">
              ← Back to plans
            </button>
          </div>
        )}

        {/* ── Step 3: Payment ── */}
        {step === 'payment' && clientSecret && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md mx-auto">
            <h2 className="text-lg font-bold text-[#2D2040] mb-1">
              {selectedPlan?.name} Membership
            </h2>
            <p className="text-sm text-gray-400 mb-6">{selectedPlan?.price}/month</p>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm onSuccess={() => router.push('/browse')} />
            </Elements>
            <button onClick={() => setStep('address')}
              className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600">
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
