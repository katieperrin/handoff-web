'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MemberLayout from '@/components/MemberLayout';
import { supabase } from '@/lib/supabase';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestForm, setSuggestForm] = useState({ brand: '', model: '', color: '', url: '' });
  const [suggestSubmitting, setSuggestSubmitting] = useState(false);
  const [suggestSuccess, setSuggestSuccess] = useState(false);
  const [editingAddr, setEditingAddr] = useState(false);
  const [addr, setAddr] = useState({
    shipping_name: '', shipping_street1: '', shipping_street2: '',
    shipping_city: '', shipping_state: '', shipping_zip: '', shipping_phone: '',
  });
  const [savingAddr, setSavingAddr] = useState(false);
  const [addrError, setAddrError] = useState(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('subscription_tier, credit_balance_cents, monthly_credit_cents, shipping_name, shipping_street1, shipping_street2, shipping_city, shipping_state, shipping_zip, shipping_phone')
          .eq('id', user.id)
          .single();
        setProfile(data);
        if (data) {
          setAddr({
            shipping_name:    data.shipping_name    ?? '',
            shipping_street1: data.shipping_street1 ?? '',
            shipping_street2: data.shipping_street2 ?? '',
            shipping_city:    data.shipping_city    ?? '',
            shipping_state:   data.shipping_state   ?? '',
            shipping_zip:     data.shipping_zip     ?? '',
            shipping_phone:   data.shipping_phone   ?? '',
          });
        }
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSuggest = async (e) => {
    e.preventDefault();
    if (!suggestForm.brand.trim() || !suggestForm.model.trim()) return;
    setSuggestSubmitting(true);
    await supabase.from('bag_suggestions').insert({
      user_id: user?.id,
      brand: suggestForm.brand.trim(),
      model: suggestForm.model.trim(),
      color: suggestForm.color.trim() || null,
      url: suggestForm.url.trim() || null,
    });
    setSuggestSubmitting(false);
    setSuggestSuccess(true);
    setTimeout(() => {
      setSuggestSuccess(false);
      setSuggestOpen(false);
      setSuggestForm({ brand: '', model: '', color: '', url: '' });
    }, 2500);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleSaveAddr = async (e) => {
    e.preventDefault();
    if (!addr.shipping_name || !addr.shipping_street1 || !addr.shipping_city ||
        !addr.shipping_state || !addr.shipping_zip) {
      setAddrError('Please fill in all required fields.');
      return;
    }
    setSavingAddr(true);
    setAddrError(null);
    const { error } = await supabase.from('users').update({
      shipping_name:    addr.shipping_name,
      shipping_street1: addr.shipping_street1,
      shipping_street2: addr.shipping_street2 || null,
      shipping_city:    addr.shipping_city,
      shipping_state:   addr.shipping_state,
      shipping_zip:     addr.shipping_zip,
      shipping_phone:   addr.shipping_phone || null,
    }).eq('id', user.id);
    setSavingAddr(false);
    if (error) { setAddrError('Failed to save. Please try again.'); return; }
    setProfile((p) => ({ ...p, ...addr }));
    setEditingAddr(false);
  };

  const initial = user?.email?.[0]?.toUpperCase() ?? '?';
  const tier = profile?.subscription_tier;
  const balance = profile?.credit_balance_cents ?? 0;
  const hasAddress = profile?.shipping_street1;

  const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300';
  const labelCls = 'block text-xs font-medium text-gray-500 mb-1';

  return (
    <MemberLayout>
      <h1 className="text-2xl font-bold text-[#2D2040] mb-6">Profile</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="max-w-sm space-y-4">
          {/* Avatar + identity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#7B5EA7] flex items-center justify-center text-white text-xl font-bold shrink-0">
              {initial}
            </div>
            <div>
              <p className="font-semibold text-[#2D2040] text-sm">{user?.email}</p>
              <p className="text-xs text-gray-400 mt-0.5">The Handoffs Member</p>
              {tier && (
                <span className={`inline-block mt-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  tier === 'premium' ? 'bg-[#7B5EA7] text-white' : 'bg-purple-50 text-[#7B5EA7]'
                }`}>
                  {tier === 'premium' ? '✦ Premium' : 'Standard'}
                </span>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-[#2D2040]">Shipping Address</p>
              {!editingAddr && (
                <button onClick={() => setEditingAddr(true)}
                  className="text-xs text-[#7B5EA7] hover:underline font-medium">
                  {hasAddress ? 'Edit' : 'Add'}
                </button>
              )}
            </div>

            {!editingAddr ? (
              hasAddress ? (
                <div className="text-sm text-gray-500 space-y-0.5">
                  <p>{profile.shipping_name}</p>
                  <p>{profile.shipping_street1}{profile.shipping_street2 ? `, ${profile.shipping_street2}` : ''}</p>
                  <p>{profile.shipping_city}, {profile.shipping_state} {profile.shipping_zip}</p>
                  {profile.shipping_phone && <p className="text-xs text-gray-400">{profile.shipping_phone}</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No address saved yet.</p>
              )
            ) : (
              <form onSubmit={handleSaveAddr} className="space-y-3">
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
                  <label className={labelCls}>Apt / Suite</label>
                  <input className={inputCls} placeholder="Apt 4B" value={addr.shipping_street2}
                    onChange={(e) => setAddr({ ...addr, shipping_street2: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-2">
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
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelCls}>ZIP *</label>
                    <input className={inputCls} placeholder="10001" value={addr.shipping_zip}
                      onChange={(e) => setAddr({ ...addr, shipping_zip: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input className={inputCls} placeholder="212-555-0100" value={addr.shipping_phone}
                      onChange={(e) => setAddr({ ...addr, shipping_phone: e.target.value })} />
                  </div>
                </div>
                {addrError && <p className="text-xs text-red-500">{addrError}</p>}
                <div className="flex gap-2">
                  <button type="submit" disabled={savingAddr}
                    className="flex-1 bg-[#7B5EA7] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#6a4f93] disabled:opacity-60 transition-colors">
                    {savingAddr ? 'Saving…' : 'Save'}
                  </button>
                  <button type="button" onClick={() => { setEditingAddr(false); setAddrError(null); }}
                    className="flex-1 border border-gray-200 text-gray-500 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Credits */}
          <Link href="/profile/credits"
            className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-purple-200 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Credit Balance</p>
                <p className="text-2xl font-bold text-[#2D2040] mt-0.5">${(balance / 100).toFixed(2)}</p>
              </div>
              <span className="text-gray-300 text-lg">›</span>
            </div>
          </Link>

          {/* Transaction History */}
          <Link href="/profile/transactions"
            className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-purple-200 transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#2D2040]">Transaction History</p>
              <span className="text-gray-300 text-lg">›</span>
            </div>
          </Link>

          {/* Manage membership */}
          <Link href="/profile/subscription"
            className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-purple-200 transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#2D2040]">Manage Membership</p>
              <span className="text-gray-300 text-lg">›</span>
            </div>
          </Link>

          {/* Request a bag */}
          <button
            onClick={() => setSuggestOpen(true)}
            className="w-full bg-purple-50 rounded-2xl border border-purple-100 p-5 text-left hover:border-[#7B5EA7] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#7B5EA7]">Have your eye on a bag?</p>
                <p className="text-xs text-gray-400 mt-0.5">Let us know and we&apos;ll try to source it.</p>
              </div>
              <span className="text-[#7B5EA7] text-lg">›</span>
            </div>
          </button>

          {/* Log out */}
          <button onClick={handleLogout}
            className="w-full bg-white rounded-2xl border border-gray-100 p-5 text-left text-sm font-semibold text-red-400 hover:text-red-600 hover:border-red-100 transition-colors">
            Log Out
          </button>
        </div>
      )}

      {/* Bag request modal */}
      {suggestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            {suggestSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#7B5EA7] flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">✓</span>
                </div>
                <p className="text-lg font-bold text-[#2D2040]">Request Sent!</p>
                <p className="text-sm text-gray-400 mt-1">We&apos;ll do our best to source it.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-[#2D2040]">Request a Bag</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Tell us what you&apos;re looking for.</p>
                  </div>
                  <button
                    onClick={() => { setSuggestOpen(false); setSuggestForm({ brand: '', model: '', color: '', url: '' }); }}
                    className="text-gray-400 hover:text-gray-600 text-xl leading-none ml-3"
                  >&times;</button>
                </div>
                <form onSubmit={handleSuggest} className="space-y-3">
                  <div>
                    <label className={labelCls}>Brand <span className="text-red-400">*</span></label>
                    <input
                      required
                      placeholder="e.g. Chanel"
                      value={suggestForm.brand}
                      onChange={(e) => setSuggestForm((f) => ({ ...f, brand: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Bag Name / Style <span className="text-red-400">*</span></label>
                    <input
                      required
                      placeholder="e.g. Classic Flap, Medium"
                      value={suggestForm.model}
                      onChange={(e) => setSuggestForm((f) => ({ ...f, model: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Color <span className="text-gray-300">(optional)</span></label>
                    <input
                      placeholder="e.g. Black, Beige"
                      value={suggestForm.color}
                      onChange={(e) => setSuggestForm((f) => ({ ...f, color: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Reference URL <span className="text-gray-300">(optional)</span></label>
                    <input
                      type="url"
                      placeholder="https://…"
                      value={suggestForm.url}
                      onChange={(e) => setSuggestForm((f) => ({ ...f, url: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={suggestSubmitting || !suggestForm.brand.trim() || !suggestForm.model.trim()}
                    className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors mt-1"
                  >
                    {suggestSubmitting ? 'Sending…' : 'Submit Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </MemberLayout>
  );
}
