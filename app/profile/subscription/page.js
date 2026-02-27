'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import MemberLayout from '@/components/MemberLayout';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PLANS = [
  {
    tier: 'standard',
    name: 'Standard',
    price: '$149/mo',
    perks: ['1 bag at a time', 'Up to 30-day rentals', '$60/month in credits'],
  },
  {
    tier: 'premium',
    name: 'Premium ✦',
    price: '$229/mo',
    perks: ['2 bags at a time', 'Up to 30-day rentals', '$60/month credit per bag', 'Priority queue', 'White glove support'],
  },
];

function UpgradeForm({ clientSecret, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/profile/subscription` },
      redirect: 'if_required',
    });
    if (error) { setError(error.message); setLoading(false); }
    else onSuccess();
  };

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
      <button type="submit" disabled={!stripe || loading}
        className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl">
        {loading ? 'Processing…' : 'Confirm Upgrade'}
      </button>
      <button type="button" onClick={onCancel} className="w-full text-sm text-gray-400 hover:text-gray-600">Cancel</button>
    </form>
  );
}

export default function SubscriptionPage() {
  const [currentTier, setCurrentTier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [pendingTier, setPendingTier] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { loadProfile(); }, []);

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from('users').select('subscription_tier').eq('id', user.id).single();
    setCurrentTier(data?.subscription_tier || null);
    setLoading(false);
  }

  async function handleAction(tier) {
    const isCurrent = tier === currentTier;
    if (isCurrent) return;

    const action = !currentTier ? 'subscribe' : tier === 'premium' ? 'upgrade' : 'downgrade';

    if (action === 'downgrade') {
      const confirmed = window.confirm('Downgrade to Standard? This takes effect at the end of your current billing period.');
      if (!confirmed) return;
    }

    setActionLoading(tier);
    setError(null);
    const { data, error } = await supabase.functions.invoke('create-subscription', {
      body: { tier, action },
    });

    if (error || (!data?.clientSecret && action !== 'downgrade')) {
      setError(error?.message || 'Something went wrong. Please try again.');
      setActionLoading(null);
      return;
    }

    if (data?.clientSecret) {
      setPendingTier(tier);
      setClientSecret(data.clientSecret);
    } else {
      setMessage('Your plan has been updated.');
      loadProfile();
    }
    setActionLoading(null);
  }

  const handleUpgradeSuccess = () => {
    setClientSecret(null);
    setPendingTier(null);
    setMessage('Upgrade successful! Welcome to Premium.');
    loadProfile();
  };

  return (
    <MemberLayout>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile" className="text-gray-400 hover:text-gray-600 text-sm">← Profile</Link>
        <h1 className="text-2xl font-bold text-[#2D2040]">Membership</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
        </div>
      ) : clientSecret ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md">
          <h2 className="text-lg font-bold text-[#2D2040] mb-1">Upgrade to Premium</h2>
          <p className="text-sm text-gray-400 mb-6">Prorated charge for the remainder of your billing period.</p>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <UpgradeForm
              clientSecret={clientSecret}
              onSuccess={handleUpgradeSuccess}
              onCancel={() => { setClientSecret(null); setPendingTier(null); }}
            />
          </Elements>
        </div>
      ) : (
        <div className="max-w-2xl space-y-4">
          {message && (
            <div className="bg-green-50 text-green-700 text-sm font-medium rounded-xl px-4 py-3">{message}</div>
          )}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PLANS.map((plan) => {
              const isCurrent = plan.tier === currentTier;
              const isUpgrade = currentTier === 'standard' && plan.tier === 'premium';
              const isDowngrade = currentTier === 'premium' && plan.tier === 'standard';
              const isNew = !currentTier;

              let btnLabel = isCurrent ? 'Current Plan' : isUpgrade ? 'Upgrade' : isDowngrade ? 'Downgrade' : 'Choose Plan';
              if (actionLoading === plan.tier) btnLabel = 'Loading…';

              return (
                <div key={plan.tier} className={`bg-white rounded-2xl border-2 p-5 flex flex-col ${
                  isCurrent ? 'border-[#7B5EA7]' : 'border-gray-100'
                }`}>
                  {isCurrent && (
                    <span className="self-start text-xs font-bold text-[#7B5EA7] bg-purple-50 px-2.5 py-0.5 rounded-full mb-2">
                      Current Plan
                    </span>
                  )}
                  <h2 className="font-bold text-[#2D2040] text-lg">{plan.name}</h2>
                  <p className="text-sm text-gray-400 mb-3">{plan.price}</p>
                  <ul className="space-y-1.5 flex-1 mb-4">
                    {plan.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#7B5EA7] mt-0.5 shrink-0">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleAction(plan.tier)}
                    disabled={isCurrent || !!actionLoading}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${
                      isCurrent
                        ? 'bg-gray-100 text-gray-400 cursor-default'
                        : 'bg-[#7B5EA7] hover:bg-[#6a4f93] text-white'
                    }`}
                  >
                    {btnLabel}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </MemberLayout>
  );
}
