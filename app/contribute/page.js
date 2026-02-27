'use client';
import { useEffect, useState } from 'react';
import MemberLayout from '@/components/MemberLayout';
import { supabase } from '@/lib/supabase';

const CONDITIONS = ['excellent', 'good', 'fair'];

const STATUS_STYLES = {
  pending:    { label: 'Under Review',  cls: 'bg-purple-50 text-[#7B5EA7]' },
  label_sent: { label: 'Ship Your Bag', cls: 'bg-orange-50 text-orange-600' },
  in_transit: { label: 'In Transit',    cls: 'bg-blue-50 text-blue-600' },
  approved:   { label: 'Accepted ✓',    cls: 'bg-green-50 text-green-700' },
  rejected:   { label: 'Not Accepted',  cls: 'bg-red-50 text-red-600' },
};

function calcCreditPreview(cycleStartAt) {
  if (!cycleStartAt) return 0;
  const days = Math.floor((Date.now() - new Date(cycleStartAt).getTime()) / (1000 * 60 * 60 * 24));
  if (days < 7) return 0;
  return Math.min(Math.floor(days / 30 * 6000) / 100, 60);
}

export default function ContributePage() {
  const [tab, setTab] = useState('submit');
  const [submissions, setSubmissions] = useState([]);
  const [pendingDecisions, setPendingDecisions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [decisionLoading, setDecisionLoading] = useState(null);

  // Form state
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [condition, setCondition] = useState('excellent');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fromName, setFromName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (tab === 'submissions') fetchSubmissions();
  }, [tab]);

  async function fetchSubmissions() {
    setLoadingSubs(true);
    const { data: { user } } = await supabase.auth.getUser();
    const [{ data: subs }, { data: decisions }] = await Promise.all([
      supabase
        .from('contributions')
        .select('id, status, label_url, tracking_code, submitted_at, bags(id, brand, model, color, status, cycle_start_at)')
        .eq('member_id', user.id)
        .order('submitted_at', { ascending: false }),
      supabase
        .from('rentals')
        .select('id, returned_at, bags!inner(id, brand, model, cycle_start_at, owner_id)')
        .eq('bags.owner_id', user.id)
        .not('returned_at', 'is', null)
        .is('owner_response', null),
    ]);
    setSubmissions(subs || []);
    setPendingDecisions(decisions || []);
    setLoadingSubs(false);
  }

  async function handleResubmit(rentalId) {
    setDecisionLoading(rentalId);
    const { error } = await supabase.rpc('handle_owner_resubmit', { p_rental_id: rentalId });
    setDecisionLoading(null);
    if (error) { alert(error.message); return; }
    fetchSubmissions();
  }

  async function handlePayout(rentalId, cycleStartAt) {
    const credit = calcCreditPreview(cycleStartAt);
    const msg = credit > 0
      ? `You'll receive $${credit.toFixed(2)} in credits. Your bag will be returned to you.`
      : 'Your bag has not been in the pool long enough to earn credits this cycle. Your bag will be returned to you.';
    if (!window.confirm(`Accept Payout & Return?\n\n${msg}`)) return;
    setDecisionLoading(rentalId);
    const { error } = await supabase.rpc('handle_owner_payout', { p_rental_id: rentalId });
    setDecisionLoading(null);
    if (error) { alert(error.message); return; }
    fetchSubmissions();
  }

  async function handleRecall(bagId, cycleStartAt, bagStatus) {
    let confirmMsg;
    if (bagStatus === 'rented') {
      confirmMsg = "Request recall for your bag?\n\nSince it's currently with a renter, our team will coordinate the return. You'll receive a prorated credit once the bag is back.";
    } else {
      const credit = calcCreditPreview(cycleStartAt);
      const days = cycleStartAt
        ? Math.floor((Date.now() - new Date(cycleStartAt).getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      confirmMsg = credit > 0
        ? `Recall your bag?\n\nYou'll receive $${credit.toFixed(2)} in credits for ${days} days in the pool.\n\nWe'll ship it back to you once the recall is processed.`
        : "Recall your bag?\n\nYour bag has not met the 7-day minimum — $0.00 will be awarded for this cycle.\n\nWe'll ship it back to you once the recall is processed.";
    }
    if (!window.confirm(confirmMsg)) return;
    setDecisionLoading(bagId);
    const { error } = await supabase.rpc('handle_owner_recall', { p_bag_id: bagId });
    setDecisionLoading(null);
    if (error) { alert(error.message); return; }
    fetchSubmissions();
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function uploadPhoto(file, bagId) {
    const path = `bags/${bagId}/cover.jpg`;
    const { error } = await supabase.storage
      .from('bag-photos')
      .upload(path, file, { contentType: file.type || 'image/jpeg', upsert: true });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from('bag-photos').getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!photoFile) {
      setSubmitError('Please add a photo of your bag.');
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data: bag, error: bagErr } = await supabase
        .from('bags')
        .insert({
          name: `${brand.trim()} ${model.trim()}`,
          brand: brand.trim(),
          model: model.trim(),
          color: color.trim(),
          condition,
          ownership_type: 'member',
          owner_id: user.id,
          status: 'under_review',
        })
        .select()
        .single();
      if (bagErr) throw new Error(bagErr.message);

      const photoUrl = await uploadPhoto(photoFile, bag.id);
      await supabase.from('bags').update({ photo_url: photoUrl }).eq('id', bag.id);

      const { error: contribErr } = await supabase.from('contributions').insert({
        member_id: user.id,
        bag_id: bag.id,
        status: 'pending',
        from_name: fromName.trim(),
        from_street1: street.trim(),
        from_city: city.trim(),
        from_state: state.trim().toUpperCase(),
        from_zip: zip.trim(),
      });
      if (contribErr) throw new Error(contribErr.message);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setBrand(''); setModel(''); setColor(''); setCondition('excellent');
        setPhotoFile(null); setPhotoPreview(null);
        setFromName(''); setStreet(''); setCity(''); setState(''); setZip('');
        setTab('submissions');
        fetchSubmissions();
      }, 2200);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <MemberLayout>
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-16 h-16 rounded-full bg-[#7B5EA7] flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">✓</span>
          </div>
          <p className="text-xl font-bold text-[#2D2040]">Bag Submitted!</p>
          <p className="text-sm text-gray-400 mt-1">We&apos;ll review it and send a prepaid shipping label.</p>
        </div>
      </MemberLayout>
    );
  }

  return (
    <MemberLayout>
      <h1 className="text-2xl font-bold text-[#2D2040] mb-6">Contribute a Bag</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {[['submit', 'Submit a Bag'], ['submissions', 'My Submissions']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === key ? 'border-[#7B5EA7] text-[#7B5EA7]' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'submit' ? (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
          <p className="text-sm text-[#7B5EA7] bg-purple-50 rounded-xl px-4 py-3">
            Earn $60 in credits for every 30 days your bag is in the rental pool.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Brand *</label>
              <input required value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Chanel"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Model *</label>
              <input required value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. Classic Flap"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Color *</label>
            <input required value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g. Black"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Condition *</label>
            <div className="flex gap-2">
              {CONDITIONS.map((c) => (
                <button type="button" key={c} onClick={() => setCondition(c)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors capitalize ${
                    condition === c ? 'border-[#7B5EA7] bg-[#7B5EA7] text-white' : 'border-gray-200 text-gray-500 hover:border-purple-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Photo *</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange}
              className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:font-semibold file:bg-purple-50 file:text-[#7B5EA7] hover:file:bg-purple-100" />
            {photoPreview && (
              <img src={photoPreview} alt="preview" className="mt-3 w-full h-40 object-cover rounded-xl border border-gray-100" />
            )}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-bold text-[#2D2040] mb-1">Shipping Address</p>
            <p className="text-xs text-gray-400 mb-4">We&apos;ll send a prepaid label here once approved.</p>
            <div className="space-y-3">
              <input required value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="Full Name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
              <input required value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street Address"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
              <div className="grid grid-cols-3 gap-3">
                <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"
                  className="col-span-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
                <input required value={state} onChange={(e) => setState(e.target.value.toUpperCase())} placeholder="ST" maxLength={2}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 uppercase" />
                <input required value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP" maxLength={5}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
              </div>
            </div>
          </div>

          {submitError && (
            <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{submitError}</p>
          )}

          <button type="submit" disabled={submitting}
            className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors">
            {submitting ? 'Submitting…' : 'Submit Bag'}
          </button>
        </form>
      ) : (
        <div className="space-y-4 max-w-lg">
          {loadingSubs ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
            </div>
          ) : (
            <>
              {/* Pending post-rental decisions */}
              {pendingDecisions.map((d) => {
                const bag = d.bags;
                const credit = calcCreditPreview(bag?.cycle_start_at);
                const days = bag?.cycle_start_at
                  ? Math.floor((Date.now() - new Date(bag.cycle_start_at).getTime()) / (1000 * 60 * 60 * 24))
                  : 0;
                const isLoading = decisionLoading === d.id;
                return (
                  <div key={d.id} className="bg-orange-50 rounded-2xl border border-orange-200 p-5">
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">Action Required</p>
                    <p className="font-bold text-[#2D2040] text-base">Your bag was returned!</p>
                    <p className="text-sm text-gray-600 mt-0.5">{bag?.brand} {bag?.model}</p>
                    <p className="text-xs text-gray-500 mt-1 mb-4">
                      {days} days in pool this cycle ·{' '}
                      {credit > 0 ? `$${credit.toFixed(2)} credit available` : 'Min. 7 days not met — $0.00 this cycle'}
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleResubmit(d.id)}
                        disabled={!!decisionLoading}
                        className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                      >
                        {isLoading ? 'Processing…' : 'Resubmit to Pool'}
                      </button>
                      <button
                        onClick={() => handlePayout(d.id, bag?.cycle_start_at)}
                        disabled={!!decisionLoading}
                        className="w-full bg-white border border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 disabled:opacity-60 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                      >
                        Accept Payout & Return
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Contribution submissions */}
              {submissions.length === 0 && pendingDecisions.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                  <p className="text-gray-400 text-sm">No submissions yet.</p>
                  <button onClick={() => setTab('submit')} className="mt-2 text-[#7B5EA7] text-sm font-semibold hover:underline">
                    Submit your first bag →
                  </button>
                </div>
              ) : (
                submissions.map((s) => {
                  const st = STATUS_STYLES[s.status] ?? STATUS_STYLES.pending;
                  const bagStatus = s.bags?.status;
                  const isRecallPending = bagStatus === 'recall_pending';
                  const canRecall = s.status === 'approved' && (bagStatus === 'available' || bagStatus === 'rented');
                  const isRecalling = decisionLoading === s.bags?.id;
                  return (
                    <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-semibold text-[#2D2040]">{s.bags?.brand}</p>
                          <p className="text-sm text-gray-500">{s.bags?.model}{s.bags?.color ? ` · ${s.bags.color}` : ''}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${st.cls}`}>{st.label}</span>
                          {isRecallPending && (
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-600">
                              Recall Pending
                            </span>
                          )}
                        </div>
                      </div>
                      {s.label_url && (
                        <a href={s.label_url} target="_blank" rel="noreferrer"
                          className="block text-center bg-purple-50 text-[#7B5EA7] text-sm font-semibold py-2 rounded-xl hover:bg-purple-100 transition-colors mb-2">
                          Open Shipping Label →
                        </a>
                      )}
                      {s.tracking_code && (
                        <p className="text-xs text-gray-400 mb-1">Tracking: {s.tracking_code}</p>
                      )}
                      <p className="text-xs text-gray-300">
                        Submitted {new Date(s.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      {isRecallPending && (
                        <p className="text-xs text-red-500 bg-red-50 rounded-xl px-3 py-2 mt-3">
                          Recall in progress — our team is coordinating the return with the renter.
                        </p>
                      )}
                      {canRecall && !isRecallPending && (
                        <button
                          onClick={() => handleRecall(s.bags.id, s.bags.cycle_start_at, bagStatus)}
                          disabled={!!decisionLoading}
                          className="mt-3 w-full border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-60 text-sm font-semibold py-2 rounded-xl transition-colors"
                        >
                          {isRecalling ? 'Processing…' : bagStatus === 'rented' ? 'Request Recall' : 'Recall My Bag'}
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>
      )}
    </MemberLayout>
  );
}
