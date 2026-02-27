'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

function friendlyError(msg) {
  if (!msg) return null;
  const m = msg.toLowerCase();
  if (
    m.includes('already registered') ||
    m.includes('already exists') ||
    m.includes('phone number already') ||
    m.includes('email address already') ||
    m.includes('duplicate')
  ) {
    return 'An account already exists with this email or phone number. Please sign in instead.';
  }
  return msg;
}

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState('signin'); // 'signin' | 'forgot' | 'forgot_verify' | 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(friendlyError(error.message));
      setLoading(false);
    } else {
      router.push('/browse');
    }
  };

  const handleForgotSend = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) { setError('Please enter your email address.'); return; }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email: forgotEmail.trim() });
    if (error) { setError(error.message); setLoading(false); return; }
    setLoading(false);
    setStep('forgot_verify');
  };

  const handleForgotVerify = async (e) => {
    e.preventDefault();
    if (forgotOtp.trim().length < 6) { setError('Please enter the 6-digit code.'); return; }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({ email: forgotEmail.trim(), token: forgotOtp.trim(), type: 'email' });
    if (error) { setError(error.message); setLoading(false); return; }
    setLoading(false);
    setStep('reset');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (newPassword !== confirmNewPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push('/browse');
  };

  return (
    <div className="min-h-screen bg-[#F8F6FB] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-1">The</p>
          <h1 className="text-3xl font-bold text-[#2D2040]">Handoffs</h1>
          <p className="text-sm text-gray-400 mt-1">Luxury. Simplified.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {step === 'signin' && (
            <>
              <h2 className="text-lg font-bold text-[#2D2040] mb-6">Sign in</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2D2040] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2D2040] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>
              <button
                onClick={() => { setForgotEmail(email); setError(null); setStep('forgot'); }}
                className="w-full text-center text-sm text-[#7B5EA7] font-semibold mt-4 hover:underline"
              >
                Forgot password?
              </button>
              <p className="text-center text-sm text-gray-400 mt-4">
                Don&apos;t have an account?{' '}
                <Link href="/apply" className="text-[#7B5EA7] font-semibold hover:underline">Apply for access</Link>
              </p>
            </>
          )}

          {step === 'forgot' && (
            <>
              <h2 className="text-lg font-bold text-[#2D2040] mb-2">Reset your password</h2>
              <p className="text-sm text-gray-400 mb-6">Enter your email and we&apos;ll send a 6-digit code.</p>
              <form onSubmit={handleForgotSend} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2D2040] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? 'Sending…' : 'Send Code'}
                </button>
              </form>
              <button
                onClick={() => { setError(null); setStep('signin'); }}
                className="w-full text-center text-sm text-[#7B5EA7] font-semibold mt-4 hover:underline"
              >
                Back to Sign In
              </button>
            </>
          )}

          {step === 'forgot_verify' && (
            <>
              <h2 className="text-lg font-bold text-[#2D2040] mb-2">Check your email</h2>
              <div className="bg-[#EDE8F7] rounded-xl px-4 py-3 mb-5">
                <p className="text-sm text-[#5A4A72]">
                  We sent a 6-digit code to <span className="font-semibold">{forgotEmail}</span>.
                </p>
              </div>
              <form onSubmit={handleForgotVerify} className="space-y-4">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  autoFocus
                  value={forgotOtp}
                  onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full border-2 border-[#7B5EA7] rounded-xl px-4 py-4 text-3xl font-bold text-center text-[#2D2040] tracking-[0.5em] placeholder-gray-200 focus:outline-none"
                />
                {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? 'Verifying…' : 'Verify Code'}
                </button>
              </form>
              <button
                onClick={(e) => handleForgotSend(e)}
                className="w-full text-center text-sm text-[#7B5EA7] font-semibold mt-4 hover:underline"
              >
                Resend code
              </button>
            </>
          )}

          {step === 'reset' && (
            <>
              <h2 className="text-lg font-bold text-[#2D2040] mb-2">Set a new password</h2>
              <p className="text-sm text-gray-400 mb-6">Choose a new password for your account.</p>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#7B5EA7] uppercase tracking-wide mb-1.5">New Password</label>
                  <input
                    type="password"
                    required
                    autoFocus
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2D2040] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2D2040] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? 'Saving…' : 'Set Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
