'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function VerifyIdPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationUrl, setVerificationUrl] = useState(null);
  const [status, setStatus] = useState(null); // 'pending' | 'polling' | 'verified' | 'requires_input' | 'failed'

  useEffect(() => {
    checkStatusOrCreate();
  }, []);

  async function checkStatusOrCreate() {
    // First check if user is already verified
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data: profile } = await supabase
      .from('users')
      .select('id_verification_status')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.id_verification_status === 'verified') {
      router.push('/subscribe');
      return;
    }

    if (profile?.id_verification_status === 'failed') {
      setStatus('failed');
      setError('Verification could not be completed. Please contact support.');
      setLoading(false);
      return;
    }

    // Check if returning from Stripe (URL has session_id param)
    const params = new URLSearchParams(window.location.search);
    if (params.has('session_id')) {
      setStatus('polling');
      setLoading(false);
      pollStatus(user.id);
      return;
    }

    // Create or retrieve a verification session
    const { data, error: fnErr } = await supabase.functions.invoke('create-verification-session');

    if (fnErr || data?.error) {
      setError(fnErr?.message || data?.error || 'Failed to start verification.');
      setLoading(false);
      return;
    }

    if (data.status === 'already_verified') {
      router.push('/subscribe');
      return;
    }

    setVerificationUrl(data.url);
    setStatus('pending');
    setLoading(false);
  }

  async function pollStatus(userId) {
    // Poll user's verification status every 2 seconds for up to 30 seconds
    let attempts = 0;
    const maxAttempts = 15;

    const poll = async () => {
      const { data: profile } = await supabase
        .from('users')
        .select('id_verification_status')
        .eq('id', userId)
        .maybeSingle();

      if (profile?.id_verification_status === 'verified') {
        router.push('/subscribe');
        return;
      }

      if (profile?.id_verification_status === 'failed') {
        setStatus('failed');
        setError('Verification could not be completed. Please contact support.');
        return;
      }

      if (profile?.id_verification_status === 'requires_input') {
        setStatus('requires_input');
        return;
      }

      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(poll, 2000);
      } else {
        // Still pending after 30s — show message
        setStatus('requires_input');
      }
    };

    poll();
  }

  const handleVerify = () => {
    if (verificationUrl) {
      // Add return URL parameter so Stripe redirects back
      const returnUrl = `${window.location.origin}/verify-id?session_id=done`;
      const url = new URL(verificationUrl);
      url.searchParams.set('return_url', returnUrl);
      window.location.href = url.toString();
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    const { data, error: fnErr } = await supabase.functions.invoke('create-verification-session');

    if (fnErr || data?.error) {
      setError(fnErr?.message || data?.error || 'Failed to start verification.');
      setLoading(false);
      return;
    }

    if (data.status === 'already_verified') {
      router.push('/subscribe');
      return;
    }

    setVerificationUrl(data.url);
    setStatus('pending');
    setLoading(false);
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
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
            </div>
          ) : status === 'polling' ? (
            <>
              <h2 className="text-lg font-bold text-[#2D2040] mb-2">Verifying your ID...</h2>
              <p className="text-sm text-gray-400 mb-6">
                Please wait while we confirm your identity. This usually takes just a moment.
              </p>
              <div className="flex justify-center py-4">
                <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
              </div>
            </>
          ) : status === 'failed' ? (
            <>
              <h2 className="text-lg font-bold text-[#2D2040] mb-2">Verification Failed</h2>
              <p className="text-sm text-gray-400 mb-4">{error}</p>
              <a
                href="mailto:support@thehandoffs.com"
                className="block w-full text-center bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Contact Support
              </a>
            </>
          ) : status === 'requires_input' ? (
            <>
              <h2 className="text-lg font-bold text-[#2D2040] mb-2">Verification Needs Attention</h2>
              <p className="text-sm text-gray-400 mb-6">
                We couldn&apos;t fully verify your identity. Please try again with a clear photo of your government-issued ID.
              </p>
              <button
                onClick={handleRetry}
                className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Try Again
              </button>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#EDE8F7] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#7B5EA7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-[#2D2040] mb-2">Verify Your Identity</h2>
                <p className="text-sm text-gray-400">
                  For the security of our community, we require a quick ID verification before you can start renting.
                </p>
              </div>

              <div className="bg-[#F8F6FB] rounded-xl p-4 mb-6 space-y-2">
                <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-wide">What you&apos;ll need</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#7B5EA7] mt-0.5 shrink-0">1.</span>
                    A government-issued photo ID (driver&apos;s license or passport)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#7B5EA7] mt-0.5 shrink-0">2.</span>
                    A quick selfie to confirm it&apos;s you
                  </li>
                </ul>
                <p className="text-xs text-gray-400 mt-2">Takes about 60 seconds. Powered by Stripe.</p>
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3 mb-4">{error}</p>
              )}

              <button
                onClick={handleVerify}
                className="w-full bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Verify My ID
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
