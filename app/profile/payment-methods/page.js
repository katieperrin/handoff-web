'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import MemberLayout from '@/components/MemberLayout';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const BRAND_LABELS = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  discover: 'Discover',
  diners: 'Diners',
  jcb: 'JCB',
  unionpay: 'UnionPay',
};

function AddCardForm({ clientSecret, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: { return_url: `${window.location.origin}/profile/payment-methods` },
      redirect: 'if_required',
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {loading ? 'Adding…' : 'Add Card'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-200 text-gray-500 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [adding, setAdding] = useState(false);
  const [setupSecret, setSetupSecret] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [settingDefault, setSettingDefault] = useState(null);

  const fetchMethods = useCallback(async () => {
    setError(null);
    const { data, error: fnErr } = await supabase.functions.invoke('manage-payment-methods', {
      body: { action: 'list' },
    });
    if (fnErr || data?.error) {
      setError(fnErr?.message || data?.error || 'Failed to load payment methods.');
    } else {
      setMethods(data.methods || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchMethods(); }, [fetchMethods]);

  const handleAddCard = async () => {
    setError(null);
    const { data, error: fnErr } = await supabase.functions.invoke('manage-payment-methods', {
      body: { action: 'create_setup_intent' },
    });
    if (fnErr || data?.error) {
      setError(fnErr?.message || data?.error || 'Failed to start card setup.');
      return;
    }
    setSetupSecret(data.clientSecret);
    setAdding(true);
  };

  const handleAddSuccess = () => {
    setAdding(false);
    setSetupSecret(null);
    setMessage('Card added successfully.');
    setTimeout(() => setMessage(null), 3000);
    setLoading(true);
    fetchMethods();
  };

  const handleSetDefault = async (pmId) => {
    setSettingDefault(pmId);
    setError(null);
    const { data, error: fnErr } = await supabase.functions.invoke('manage-payment-methods', {
      body: { action: 'set_default', payment_method_id: pmId },
    });
    if (fnErr || data?.error) {
      setError(fnErr?.message || data?.error || 'Failed to update default.');
    } else {
      setMessage('Default payment method updated.');
      setTimeout(() => setMessage(null), 3000);
      await fetchMethods();
    }
    setSettingDefault(null);
  };

  const handleRemove = async (pmId) => {
    const confirmed = window.confirm('Remove this payment method?');
    if (!confirmed) return;
    setRemoving(pmId);
    setError(null);
    const { data, error: fnErr } = await supabase.functions.invoke('manage-payment-methods', {
      body: { action: 'remove', payment_method_id: pmId },
    });
    if (fnErr || data?.error) {
      setError(fnErr?.message || data?.error || 'Failed to remove card.');
    } else {
      setMessage('Payment method removed.');
      setTimeout(() => setMessage(null), 3000);
      await fetchMethods();
    }
    setRemoving(null);
  };

  return (
    <MemberLayout>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile" className="text-gray-400 hover:text-gray-600 text-sm">← Profile</Link>
        <h1 className="text-2xl font-bold text-[#2D2040]">Payment Methods</h1>
      </div>

      {message && (
        <div className="bg-green-50 text-green-700 text-sm font-medium rounded-xl px-4 py-3 mb-4 max-w-md">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 max-w-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
        </div>
      ) : adding && setupSecret ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md">
          <h2 className="text-lg font-bold text-[#2D2040] mb-1">Add Payment Method</h2>
          <p className="text-sm text-gray-400 mb-6">Enter your card details below.</p>
          <Elements stripe={stripePromise} options={{ clientSecret: setupSecret }}>
            <AddCardForm
              clientSecret={setupSecret}
              onSuccess={handleAddSuccess}
              onCancel={() => { setAdding(false); setSetupSecret(null); }}
            />
          </Elements>
        </div>
      ) : (
        <div className="max-w-md space-y-3">
          {methods.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
              <p className="text-sm text-gray-400">No payment methods on file.</p>
            </div>
          ) : (
            methods.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-500">
                        {BRAND_LABELS[m.brand] || m.brand}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2D2040]">
                        •••• {m.last4}
                        {m.isDefault && (
                          <span className="ml-2 text-xs font-bold text-[#7B5EA7] bg-purple-50 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">
                        Expires {String(m.exp_month).padStart(2, '0')}/{m.exp_year}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                  {!m.isDefault && (
                    <button
                      onClick={() => handleSetDefault(m.id)}
                      disabled={settingDefault === m.id}
                      className="text-xs font-medium text-[#7B5EA7] hover:underline disabled:opacity-50"
                    >
                      {settingDefault === m.id ? 'Setting…' : 'Set as Default'}
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(m.id)}
                    disabled={removing === m.id}
                    className="text-xs font-medium text-red-400 hover:text-red-600 hover:underline disabled:opacity-50 ml-auto"
                  >
                    {removing === m.id ? 'Removing…' : 'Remove'}
                  </button>
                </div>
              </div>
            ))
          )}

          <button
            onClick={handleAddCard}
            className="w-full bg-purple-50 rounded-2xl border border-purple-100 p-5 text-left hover:border-[#7B5EA7] transition-colors"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#7B5EA7]">+ Add Payment Method</p>
              <span className="text-[#7B5EA7] text-lg">›</span>
            </div>
          </button>
        </div>
      )}
    </MemberLayout>
  );
}
