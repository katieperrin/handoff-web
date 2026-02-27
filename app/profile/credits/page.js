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

export default function CreditsPage() {
  const [balance, setBalance] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      const [{ data: profile }, { data: txns }] = await Promise.all([
        supabase.from('users').select('credit_balance_cents, monthly_credit_cents').eq('id', user.id).single(),
        supabase.from('credit_transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(50),
      ]);
      if (profile) { setBalance(profile.credit_balance_cents || 0); setMonthly(profile.monthly_credit_cents || 0); }
      setTransactions(txns || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <MemberLayout>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile" className="text-gray-400 hover:text-gray-600 text-sm">← Profile</Link>
        <h1 className="text-2xl font-bold text-[#2D2040]">Credits</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="max-w-sm space-y-4">
          <div className="bg-[#7B5EA7] rounded-2xl p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-75">Current Balance</p>
            <p className="text-4xl font-bold mt-1">${(balance / 100).toFixed(2)}</p>
            {monthly > 0 && (
              <p className="text-xs opacity-75 mt-2">+${(monthly / 100).toFixed(2)} each billing cycle</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-sm font-bold text-[#2D2040]">Transaction History</p>
            </div>
            {transactions.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No transactions yet.</p>
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
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
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
