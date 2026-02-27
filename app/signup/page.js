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

function formatPhone(input) {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits[0] === '1') return `+${digits}`;
  return null;
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState('signup'); // 'signup' | 'verify'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneForVerify, setPhoneForVerify] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tosAccepted, setTosAccepted] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (!tosAccepted) { setError('Please accept the Terms of Service to continue.'); return; }
    const formatted = formatPhone(phone);
    if (!formatted) { setError('Please enter a valid 10-digit US phone number.'); return; }

    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password, phone: formatted });
    if (error) {
      setError(friendlyError(error.message));
      setLoading(false);
    } else {
      setPhoneForVerify(formatted);
      setLoading(false);
      setStep('verify');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.trim().length < 6) { setError('Please enter the 6-digit code.'); return; }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({ phone: phoneForVerify, token: otp.trim(), type: 'sms' });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/subscribe');
    }
  };

  const handleResend = async () => {
    setError(null);
    const { error } = await supabase.auth.resend({ type: 'sms', phone: phoneForVerify });
    if (error) setError(error.message);
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
          {step === 'signup' ? (
            <>
              <h2 className="text-lg font-bold text-[#2D2040] mb-2">Create your account</h2>
              <p className="text-sm text-gray-400 mb-6">You&apos;ll choose a membership plan next.</p>
              <form onSubmit={handleSignup} className="space-y-4">
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
                    placeholder="Min. 6 characters"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2D2040] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2D2040] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7B5EA7] uppercase tracking-wide mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2D2040] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <p className="text-xs text-gray-400 mt-1">US number required. Used to verify your identity.</p>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="tos"
                    checked={tosAccepted}
                    onChange={(e) => setTosAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#7B5EA7] cursor-pointer shrink-0"
                  />
                  <label htmlFor="tos" className="text-sm text-gray-500 cursor-pointer leading-snug">
                    I agree to the{' '}
                    <Link href="/terms" className="text-[#7B5EA7] font-semibold hover:underline">
                      Terms of Service
                    </Link>
                  </label>
                </div>
                {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
                <button
                  type="submit"
                  disabled={loading || !tosAccepted}
                  className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? 'Creating account…' : 'Continue'}
                </button>
              </form>
              <p className="text-center text-sm text-gray-400 mt-6">
                Already a member?{' '}
                <Link href="/login" className="text-[#7B5EA7] font-semibold hover:underline">Sign in</Link>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-[#2D2040] mb-2">Verify your phone</h2>
              <div className="bg-[#EDE8F7] rounded-xl px-4 py-3 mb-5">
                <p className="text-sm text-[#5A4A72]">
                  We sent a 6-digit code to <span className="font-semibold">{phoneForVerify}</span>. Enter it below.
                </p>
                <p className="text-xs text-[#9B8CB0] mt-1.5">
                  A confirmation link was also sent to {email} — please check your inbox.
                </p>
              </div>
              <form onSubmit={handleVerify} className="space-y-4">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full border-2 border-[#7B5EA7] rounded-xl px-4 py-4 text-3xl font-bold text-center text-[#2D2040] tracking-[0.5em] placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? 'Verifying…' : 'Verify Phone'}
                </button>
              </form>
              <button
                onClick={handleResend}
                className="w-full text-center text-sm text-[#7B5EA7] font-semibold mt-4 hover:underline"
              >
                Resend code
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
