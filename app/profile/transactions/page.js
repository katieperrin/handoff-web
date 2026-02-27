'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import MemberLayout from '@/components/MemberLayout';
import { supabase } from '@/lib/supabase';

const TYPE_LABELS = {
  subscription_grant:   'Monthly Credit',
  rental_applied:       'Rental Applied',
  contribution_reward:  'Contribution Reward',
  pool_cycle:           'Pool Cycle Payout',
  pool_payout:          'Bag Recall / Return Payout',
  manual_adjustment:    'Adjustment',
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase
        .from('credit_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      setTransactions(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <MemberLayout>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile" className="text-gray-400 hover:text-gray-600 text-sm">← Profile</Link>
        <h1 className="text-2xl font-bold text-[#2D2040]">Transaction History</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="max-w-sm">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {transactions.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-10">No transactions yet.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {transactions.map((t) => {
                  const isCredit = t.amount_cents > 0;
                  return (
                    <div key={t.id} className="flex items-center justify-between px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-[#2D2040]">
                          {t.description || TYPE_LABELS[t.type] || t.type}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-[#7B5EA7] bg-purple-50 px-2 py-0.5 rounded-full">
                            {TYPE_LABELS[t.type] || t.type}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${isCredit ? 'text-green-600' : 'text-red-500'}`}>
                        {isCredit ? '+' : '−'}${(Math.abs(t.amount_cents) / 100).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </MemberLayout>
  );
}
