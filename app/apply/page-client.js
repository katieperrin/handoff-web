'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ApplyPage() {
  const [form, setForm] = useState({ name: '', email: '', interest: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.interest) { setError('Please select your interest.'); return; }
    setError('');
    setSubmitting(true);
    const { error: dbError } = await supabase
      .from('pilot_applications')
      .insert({ name: form.name.trim(), email: form.email.trim().toLowerCase(), interest: form.interest, note: form.note.trim() || null });
    setSubmitting(false);
    if (dbError) {
      setError('Something went wrong. Please try again.');
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#F8F6FB] text-[#2D2040]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 flex items-center h-16">
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
            <span className="text-lg font-bold text-[#2D2040]">Handoffs</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-16">
        {submitted ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-[#2D2040] mb-3">You're on the list.</h1>
            <p className="text-gray-500 leading-relaxed mb-8">
              We'll review your application and reach out to you directly if you're selected for the pilot. Thank you for your interest in The Handoffs.
            </p>
            <Link
              href="/"
              className="text-sm text-[#7B5EA7] font-semibold hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-2">Pilot Program</p>
              <h1 className="text-4xl font-bold text-[#2D2040] mb-4">Apply for Early Access</h1>
              <p className="text-gray-500 leading-relaxed">
                We're opening The Handoffs to a small first cohort. Tell us a bit about yourself and we'll be in touch if you're a fit.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#2D2040] mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B5EA7] bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D2040] mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B5EA7] bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D2040] mb-3">I'm interested in…</label>
                <div className="space-y-2.5">
                  {[
                    { value: 'renter', label: 'Renting bags', desc: 'Access the collection and carry luxury bags monthly' },
                    { value: 'owner', label: 'Contributing my bags', desc: 'Earn credits by adding my bags to the rental pool' },
                    { value: 'both', label: 'Both', desc: 'I want to rent and contribute' },
                  ].map(({ value, label, desc }) => (
                    <label
                      key={value}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                        form.interest === value
                          ? 'border-[#7B5EA7] bg-purple-50'
                          : 'border-gray-200 bg-white hover:border-purple-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={value}
                        checked={form.interest === value}
                        onChange={() => set('interest', value)}
                        className="mt-0.5 accent-[#7B5EA7]"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#2D2040]">{label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D2040] mb-1.5">
                  Anything else you'd like us to know? <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={(e) => set('note', e.target.value)}
                  placeholder="Tell us about your style, the bags you own, or why you're excited about The Handoffs…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B5EA7] bg-white resize-none"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit Application'}
              </button>

              <p className="text-xs text-center text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-[#7B5EA7] hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
