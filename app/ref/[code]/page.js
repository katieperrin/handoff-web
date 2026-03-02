'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ReferralRedirect() {
  const router = useRouter();
  const { code } = useParams();

  useEffect(() => {
    if (code) {
      localStorage.setItem('referral_code', code);
      router.replace(`/signup?ref=${encodeURIComponent(code)}`);
    }
  }, [code, router]);

  return (
    <div className="min-h-screen bg-[#F8F6FB] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#7B5EA7] border-t-transparent animate-spin" />
    </div>
  );
}
