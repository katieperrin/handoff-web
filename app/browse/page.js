'use client';
import { useEffect, useState } from 'react';
import MemberLayout from '@/components/MemberLayout';
import BagCard from '@/components/BagCard';
import { supabase } from '@/lib/supabase';

const CREDIT_CAP_CENTS = 2500;

export default function BrowsePage() {
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeBrands, setActiveBrands] = useState(new Set());
  const [activeConditions, setActiveConditions] = useState(new Set());
  const [activeType, setActiveType] = useState(null); // 'member' | 'house'
  const [selectedBag, setSelectedBag] = useState(null);
  const [creditBalance, setCreditBalance] = useState(0);
  const [subscriptionTier, setSubscriptionTier] = useState(null);
  const [activeRentalCount, setActiveRentalCount] = useState(0);
  const [applyCredits, setApplyCredits] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    fetchBags();
    fetchCredits();
    fetchWishlist();
  }, []);

  async function fetchBags() {
    setLoading(true);
    const { data } = await supabase
      .from('bags')
      .select('*')
      .in('status', ['available', 'rented', 'under_review'])
      .order('created_at', { ascending: false });
    setBags(data || []);
    setLoading(false);
  }

  async function fetchWishlist() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);
    const { data } = await supabase.from('wishlists').select('bag_id').eq('user_id', user.id);
    if (data) setWishlistIds(new Set(data.map((w) => w.bag_id)));
  }

  async function toggleWishlist(bagId) {
    if (!userId) return;
    const isWishlisted = wishlistIds.has(bagId);
    setWishlistIds((prev) => {
      const next = new Set(prev);
      isWishlisted ? next.delete(bagId) : next.add(bagId);
      return next;
    });
    if (isWishlisted) {
      await supabase.from('wishlists').delete().eq('user_id', userId).eq('bag_id', bagId);
    } else {
      await supabase.from('wishlists').insert({ user_id: userId, bag_id: bagId });
    }
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
        fetchBags();
      }, 2500);
    } catch (err) {
      setRequestError(err.message);
    } finally {
      setRequesting(false);
    }
  }

  const brands = [...new Set(bags.map((b) => b.brand).filter(Boolean))].sort();
  const conditions = ['excellent', 'good', 'fair'];
  const activeFilterCount = activeBrands.size + activeConditions.size + (activeType ? 1 : 0);

  function toggleBrand(brand) {
    setActiveBrands((prev) => {
      const next = new Set(prev);
      next.has(brand) ? next.delete(brand) : next.add(brand);
      return next;
    });
  }

  function toggleCondition(condition) {
    setActiveConditions((prev) => {
      const next = new Set(prev);
      next.has(condition) ? next.delete(condition) : next.add(condition);
      return next;
    });
  }

  function clearAll() {
    setActiveBrands(new Set());
    setActiveConditions(new Set());
    setActiveType(null);
  }

  const filtered = bags.filter((b) => {
    const q = search.toLowerCase();
    if (q && !b.brand?.toLowerCase().includes(q) && !b.model?.toLowerCase().includes(q) && !b.color?.toLowerCase().includes(q)) return false;
    if (activeBrands.size > 0 && !activeBrands.has(b.brand)) return false;
    if (activeConditions.size > 0 && !activeConditions.has(b.condition)) return false;
    if (activeType === 'member' && b.ownership_type !== 'member') return false;
    if (activeType === 'house' && b.ownership_type === 'member') return false;
    return true;
  });

  const appliedCredit = Math.min(creditBalance, CREDIT_CAP_CENTS);
  const rentalLimit = subscriptionTier === 'premium' ? 2 : 1;
  const rentalLimitReached = !!subscriptionTier && activeRentalCount >= rentalLimit;

  return (
    <MemberLayout>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2D2040]">Browse Bags</h1>
        <span className="text-sm text-gray-400">{bags.filter(b => b.status === 'available').length} available</span>
      </div>

      {/* Search + filter button row */}
      <div className="flex items-center gap-3 mb-6">
        <input
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
          placeholder="Search brand, model, or color…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setFilterOpen(true)}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
            activeFilterCount > 0
              ? 'bg-[#7B5EA7] border-[#7B5EA7] text-white'
              : 'bg-white border-gray-200 text-gray-600 hover:border-[#7B5EA7] hover:text-[#7B5EA7]'
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3h13M3 7.5h9M5.5 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-white text-[#7B5EA7] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-5">
          {[...activeBrands].map((brand) => (
            <span key={brand} className="flex items-center gap-1 bg-purple-50 text-[#7B5EA7] text-xs font-semibold px-3 py-1.5 rounded-full">
              {brand}
              <button onClick={() => toggleBrand(brand)} className="ml-1 hover:text-purple-900">×</button>
            </span>
          ))}
          {[...activeConditions].map((c) => (
            <span key={c} className="flex items-center gap-1 bg-purple-50 text-[#7B5EA7] text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
              {c}
              <button onClick={() => toggleCondition(c)} className="ml-1 hover:text-purple-900">×</button>
            </span>
          ))}
          {activeType && (
            <span className="flex items-center gap-1 bg-purple-50 text-[#7B5EA7] text-xs font-semibold px-3 py-1.5 rounded-full">
              {activeType === 'member' ? "Member's Bag" : 'House Bag'}
              <button onClick={() => setActiveType(null)} className="ml-1 hover:text-purple-900">×</button>
            </span>
          )}
          <button onClick={clearAll} className="text-xs text-gray-400 hover:text-gray-600 underline">
            Clear all
          </button>
        </div>
      )}

      {/* Filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setFilterOpen(false)} />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-sm p-6 z-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-[#2D2040]">Filter</h3>
              <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
            </div>

            {brands.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Brand</p>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors ${activeBrands.has(brand) ? 'bg-[#7B5EA7] border-[#7B5EA7] text-white' : 'bg-[#F3EFF9] border-transparent text-[#9B8CB0] hover:border-[#7B5EA7]'}`}
                    >{brand}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Condition</p>
              <div className="flex flex-wrap gap-2">
                {conditions.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleCondition(c)}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors capitalize ${activeConditions.has(c) ? 'bg-[#7B5EA7] border-[#7B5EA7] text-white' : 'bg-[#F3EFF9] border-transparent text-[#9B8CB0] hover:border-[#7B5EA7]'}`}
                  >{c}</button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Type</p>
              <div className="flex flex-wrap gap-2">
                {[['member', "Member's Bag"], ['house', 'House Bag']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setActiveType(activeType === val ? null : val)}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors ${activeType === val ? 'bg-[#7B5EA7] border-[#7B5EA7] text-white' : 'bg-[#F3EFF9] border-transparent text-[#9B8CB0] hover:border-[#7B5EA7]'}`}
                  >{label}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearAll}
                className="flex-1 border border-gray-200 text-gray-500 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-1 bg-[#7B5EA7] hover:bg-[#6a4f93] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#5A4A72] font-semibold mb-1">
            {activeFilterCount > 0 ? 'No bags match your filters.' : 'No bags available right now.'}
          </p>
          {activeFilterCount > 0 ? (
            <button
              onClick={clearAll}
              className="text-sm text-[#7B5EA7] font-semibold hover:underline"
            >Clear filters</button>
          ) : (
            <p className="text-gray-400 text-sm">Check back soon.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((bag) => (
            <BagCard
              key={bag.id}
              bag={bag}
              onRequest={bag.status === 'available' ? setSelectedBag : undefined}
              wishlisted={wishlistIds.has(bag.id)}
              onToggleWishlist={toggleWishlist}
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
