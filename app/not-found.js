'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F6FB] text-[#2D2040] flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col items-center leading-none mb-8">
            <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
            <span className="text-3xl font-bold text-[#2D2040]">Handoffs</span>
          </div>
        </div>

        {/* 404 Content */}
        <div className="mb-12">
          <p className="text-8xl font-bold text-[#7B5EA7] mb-4">404</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#2D2040] mb-4">
            Page not found
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. This bag must be in someone else's closet right now.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-3.5 rounded-2xl text-base transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/collection"
            className="inline-block border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 font-semibold px-8 py-3.5 rounded-2xl text-base transition-colors"
          >
            Browse collection
          </Link>
          <Link
            href="/faq"
            className="inline-block border-2 border-gray-200 text-gray-600 hover:text-[#7B5EA7] hover:border-[#7B5EA7] font-semibold px-8 py-3.5 rounded-2xl text-base transition-colors"
          >
            View FAQ
          </Link>
        </div>

        {/* Helpful Text */}
        <div className="mt-16 p-8 bg-white rounded-2xl border border-gray-100">
          <p className="text-sm text-gray-600 mb-4">
            Need help? Here are some useful links:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/how-it-works"
              className="text-sm text-[#7B5EA7] hover:text-[#6a4f93] font-semibold transition-colors"
            >
              → How it works
            </Link>
            <Link
              href="/for-bag-owners"
              className="text-sm text-[#7B5EA7] hover:text-[#6a4f93] font-semibold transition-colors"
            >
              → For bag owners
            </Link>
            <Link
              href="/membership"
              className="text-sm text-[#7B5EA7] hover:text-[#6a4f93] font-semibold transition-colors"
            >
              → Membership plans
            </Link>
            <a
              href="mailto:support@thehandoffs.com"
              className="text-sm text-[#7B5EA7] hover:text-[#6a4f93] font-semibold transition-colors"
            >
              → Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
