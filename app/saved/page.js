'use client';
import { useEffect, useState } from 'react';
import MemberLayout from '@/components/MemberLayout';
import BagCard from '@/components/BagCard';
import { supabase } from '@/lib/supabase';

const CREDIT_CAP_CENTS = 2500;

export default function SavedPage() {
  const [savedBags, setSavedBags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Request modal state
  const [selectedBag, setSelectedBag] = useState(null);
  const [creditBalance, setCreditBalance] = useState(0);
  const [subscriptionTier, setSubscriptionTier] = useState(null);
  const [activeRentalCount, setActiveRentalCount] = useState(0);
  const [applyCredits, setApplyCredits] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSaved();
    fetchCredits();
  }, []);

  async function fetchSaved() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    setUserId(user.id);

    const { data } = await supabase
      .from('wishlists')
      .select('bag_id, bags(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setSavedBags((data || []).map((w) => w.bags).filter(Boolean));
    setLoading(false);
  }

  async function fetchCredits() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const [{ data }, { count }] = await Promise.all([
      supabase.from('users').select('credit_balance_cents, subscription_tier').eq('id', user.id).single(),
      supabase.from('rentals').select('*', { count: 'exact', head: true }).neq('status', 'completed').neq('status', 'cancelled'),
    ]);
    if (data) {
      setCreditBalance(data.credit_balance_cents || 0);
      setSubscriptionTier(data.subscription_tier || null);
    }
    setActiveRentalCount(count ?? 0);
  }

  async function removeFromSaved(bagId) {
    if (!userId) return;
    setSavedBags((prev) => prev.filter((b) => b.id !== bagId));
    await supabase.from('wishlists').delete().eq('user_id', userId).eq('bag_id', bagId);
  }

  async function handleRequest() {
    if (!selectedBag) return;
    setRequesting(true);
    setRequestError(null);
    const { data: { user } } = await supabase.auth.getUser();

    try {
      if (applyCredits && creditBalance > 0) {
        const { error } = await supabase.functions.invoke('apply-credits', {
          body: { bag_id: selectedBag.id, apply_credits: true },
        });
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase.rpc('rent_bag', {
          p_bag_id: selectedBag.id,
          p_renter_id: user.id,
        });
        if (error) throw new Error(error.message);
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedBag(null);
        setApplyCredits(false);
        fetchSaved();
      }, 2500);
    } catch (err) {
      setRequestError(err.message);
    } finally {
      setRequesting(false);
    }
  }

  const appliedCredit = Math.min(creditBalance, CREDIT_CAP_CENTS);
  const rentalLimit = subscriptionTier === 'premium' ? 2 : 1;
  const rentalLimitReached = !!subscriptionTier && activeRentalCount >= rentalLimit;

  return (
    <MemberLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2D2040]">Saved Bags</h1>
        <span className="text-sm text-gray-400">{savedBags.length} saved</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
        </div>
      ) : savedBags.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">♡</p>
          <p className="text-[#5A4A72] font-semibold text-lg mb-2">No saved bags yet</p>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Heart bags from the Browse page to save them here and get notified when they become available.
          </p>
          <a href="/browse" className="mt-4 inline-block text-sm font-semibold text-[#7B5EA7] hover:underline">
            Browse bags →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedBags.map((bag) => (
            <BagCard
              key={bag.id}
              bag={bag}
              onRequest={bag.status === 'available' ? setSelectedBag : undefined}
              wishlisted={true}
              onToggleWishlist={removeFromSaved}
            />
          ))}
        </div>
      )}

      {/* Rental request modal */}
      {selectedBag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            {success ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#7B5EA7] flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">✓</span>
                </div>
                <p className="text-lg font-bold text-[#2D2040]">Rental Confirmed!</p>
                <p className="text-sm text-gray-400 mt-1">We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#2D2040]">Request Bag</h3>
                  <button onClick={() => { setSelectedBag(null); setRequestError(null); }} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                </div>

                {selectedBag.photo_url && (
                  <img src={selectedBag.photo_url} alt={selectedBag.model} className="w-full h-40 object-cover rounded-xl mb-4" />
                )}
                <p className="font-semibold text-[#2D2040]">{selectedBag.brand}</p>
                <p className="text-sm text-gray-500 mb-4">{selectedBag.model}{selectedBag.color ? ` · ${selectedBag.color}` : ''}</p>

                {creditBalance > 0 && (
                  <div className="bg-purple-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-[#7B5EA7]">Apply Credits</p>
                        <p className="text-xs text-gray-400">
                          Balance: ${(creditBalance / 100).toFixed(2)} · Up to ${(CREDIT_CAP_CENTS / 100).toFixed(2)} per rental
                        </p>
                      </div>
                      <button
                        onClick={() => setApplyCredits((v) => !v)}
                        className={`w-12 h-6 rounded-full transition-colors ${applyCredits ? 'bg-[#7B5EA7]' : 'bg-gray-200'}`}
                      >
                        <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${applyCredits ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    {applyCredits && (
                      <p className="text-xs text-[#7B5EA7] font-medium">
                        ${(appliedCredit / 100).toFixed(2)} will be applied to this rental.
                      </p>
                    )}
                  </div>
                )}

                {!subscriptionTier ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-center">
                    <p className="text-sm font-semibold text-amber-800 mb-1">Subscription required</p>
                    <p className="text-xs text-amber-700 mb-3">An active membership is needed to request bags.</p>
                    <a href="/profile/subscription" className="text-sm font-semibold text-[#7B5EA7] hover:underline">
                      Reactivate subscription →
                    </a>
                  </div>
                ) : rentalLimitReached ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-center">
                    <p className="text-sm font-semibold text-amber-800 mb-1">Rental limit reached</p>
                    <p className="text-xs text-amber-700">
                      Your {subscriptionTier === 'premium' ? 'Premium' : 'Standard'} plan allows {rentalLimit} active rental{rentalLimit > 1 ? 's' : ''} at a time. Return your current bag before requesting another.
                    </p>
                  </div>
                ) : (
                  <>
                    {requestError && (
                      <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3 mb-4">{requestError}</p>
                    )}
                    <button
                      onClick={handleRequest}
                      disabled={requesting}
                      className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      {requesting ? 'Confirming…' : 'Rent Now'}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </MemberLayout>
  );
}
