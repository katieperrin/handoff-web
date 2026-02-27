'use client';
import { useEffect, useState } from 'react';
import MemberLayout from '@/components/MemberLayout';
import { supabase } from '@/lib/supabase';

const LEGS = [
  { key: 'leg1', label: 'Bag on its way to us', trackingKey: 'leg1_tracking' },
  { key: 'leg2', label: 'Bag on its way to you', trackingKey: 'leg2_tracking' },
  { key: 'leg3', label: 'Return in progress', trackingKey: 'leg3_tracking' },
];

const LEG_ORDER = { leg1: 0, leg2: 1, leg3: 2, completed: 3 };

export default function RentalPage() {
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRental(); }, []);

  async function fetchRental() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase
      .from('rentals')
      .select('*, bags(brand, model, photo_url, ownership_type)')
      .eq('renter_id', user.id)
      .not('status', 'in', '("completed","cancelled")')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    setRental(data || null);
    setLoading(false);
  }

  const currentLegIndex = rental ? (LEG_ORDER[rental.status] ?? -1) : -1;

  return (
    <MemberLayout>
      <h1 className="text-2xl font-bold text-[#2D2040] mb-6">My Rental</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
        </div>
      ) : !rental ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-2xl mb-3">👜</p>
          <p className="font-semibold text-[#2D2040] mb-1">No active rental</p>
          <p className="text-sm text-gray-400">Browse available bags to start a rental.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden max-w-lg">
          {rental.bags?.photo_url && (
            <img src={rental.bags.photo_url} alt={rental.bags.model} className="w-full h-52 object-cover" />
          )}
          <div className="p-6">
            <p className="font-bold text-[#2D2040] text-lg">{rental.bags?.brand}</p>
            <p className="text-sm text-gray-500 mb-6">{rental.bags?.model}</p>

            {/* Progress steps */}
            <div className="space-y-0">
              {LEGS.map((leg, i) => {
                const isComplete = currentLegIndex > i;
                const isActive = currentLegIndex === i;
                const isPending = currentLegIndex < i;
                return (
                  <div key={leg.key} className="flex gap-4">
                    {/* Step indicator */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        isComplete ? 'bg-[#7B5EA7] text-white' :
                        isActive ? 'border-2 border-[#7B5EA7] text-[#7B5EA7]' :
                        'border-2 border-gray-200 text-gray-300'
                      }`}>
                        {isComplete ? '✓' : i + 1}
                      </div>
                      {i < LEGS.length - 1 && (
                        <div className={`w-0.5 h-8 ${isComplete ? 'bg-[#7B5EA7]' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    {/* Step content */}
                    <div className="pb-8 pt-1">
                      <p className={`text-sm font-semibold ${isActive ? 'text-[#7B5EA7]' : isPending ? 'text-gray-300' : 'text-gray-700'}`}>
                        {leg.label}
                      </p>
                      {rental[leg.trackingKey] && (
                        <p className="text-xs text-gray-400 mt-0.5">Tracking: {rental[leg.trackingKey]}</p>
                      )}
                      {isActive && !rental[leg.trackingKey] && (
                        <p className="text-xs text-[#7B5EA7] mt-0.5">In progress…</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Buy option — house bags only, while member has it */}
            {rental.bags?.ownership_type !== 'member' && rental.status === 'leg2' && (
              <div className="mt-2 mb-4 bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#2D2040]">Loving this bag?</p>
                  <p className="text-xs text-gray-500 mt-0.5">You can buy it instead of returning it.</p>
                </div>
                <a
                  href={`mailto:support@thehandoffs.com?subject=${encodeURIComponent(`Buy Request: ${rental.bags?.brand} ${rental.bags?.model}`)}&body=${encodeURIComponent(`Hi,\n\nI'm currently renting a ${rental.bags?.brand} ${rental.bags?.model} and I'd love to purchase it rather than return it. Could you please send me a quote?\n\nThank you!`)}`}
                  className="shrink-0 text-xs font-semibold text-[#7B5EA7] border border-[#7B5EA7] rounded-lg px-3 py-2 hover:bg-[#7B5EA7] hover:text-white transition-colors whitespace-nowrap"
                >
                  Request a quote →
                </a>
              </div>
            )}

            {/* Return label — shown once the bag has shipped to member */}
            {rental.leg3_label_url && (rental.status === 'leg2' || rental.status === 'leg3') && (
              <div className="mt-2 bg-[#F0EBF8] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#2D2040] mb-1">Return label ready</p>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  A prepaid return label was included in your package. When you're ready to send the bag back, reuse the box and paste the return label over the outbound label.
                </p>
                <a
                  href={rental.leg3_label_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-semibold text-[#7B5EA7] border border-[#7B5EA7] rounded-lg px-4 py-2 hover:bg-[#7B5EA7] hover:text-white transition-colors"
                >
                  Download Return Label ↗
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </MemberLayout>
  );
}
