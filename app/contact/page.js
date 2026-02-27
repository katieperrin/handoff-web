'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || 'Something went wrong. Please try again.');
    } else {
      setSuccess(true);
    }
  };

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2D2040] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white';
  const labelCls = 'block text-xs font-semibold text-[#7B5EA7] uppercase tracking-wide mb-1.5';

  return (
    <div className="min-h-screen bg-[#F8F6FB]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
            <span className="text-lg font-bold text-[#2D2040]">Handoffs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-gray-500 hover:text-[#2D2040] transition-colors px-3 py-2">
              Sign In
            </Link>
            <Link href="/apply" className="text-sm font-semibold bg-[#7B5EA7] hover:bg-[#6a4f93] text-white px-4 py-2 rounded-xl transition-colors">
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-2">Get in touch</p>
          <h1 className="text-4xl font-bold text-[#2D2040] mb-3">Contact Us</h1>
          <p className="text-gray-500 leading-relaxed">
            Have a question about membership, a bag, or anything else? Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        {success ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <p className="text-3xl mb-4">✉️</p>
            <h2 className="text-xl font-bold text-[#2D2040] mb-2">Message sent!</h2>
            <p className="text-gray-500 mb-6">We'll get back to you at {form.email} as soon as possible.</p>
            <Link href="/" className="text-sm font-semibold text-[#7B5EA7] hover:underline">
              Back to home
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Subject <span className="text-gray-300 normal-case font-normal">(optional)</span></label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Question about membership"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Message</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help?"
                  className={`${inputCls} resize-none`}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          You can also reach us directly at{' '}
          <a href="mailto:support@thehandoffs.com" className="text-[#7B5EA7] font-semibold hover:underline">
            support@thehandoffs.com
          </a>
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start leading-none">
            <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
            <span className="text-base font-bold text-[#2D2040]">Handoffs</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-[#7B5EA7] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#7B5EA7] transition-colors">Terms</Link>
            <Link href="/login" className="hover:text-[#7B5EA7] transition-colors">Sign In</Link>
          </div>
          <p className="text-xs text-gray-300">© {new Date().getFullYear()} The Handoffs</p>
        </div>
      </footer>
    </div>
  );
}
