'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose your membership',
    body: 'Standard or Premium — access the full catalog of authenticated luxury bags from day one.',
  },
  {
    step: '02',
    title: 'Request a bag',
    body: 'Browse the collection and request any available bag. We ship it directly to your door with a prepaid return label.',
  },
  {
    step: '03',
    title: 'Wear it, swap it',
    body: "Keep it as long as you like. When you're ready for something new, drop it back and request your next one.",
  },
];

const VALUES = [
  {
    label: 'Access',
    headline: 'Designer bags. Not a designer salary.',
    body: "Luxury fashion has always been gatekept by price. We think the experience of carrying a Chanel or Hermès shouldn't require owning one. A flat monthly membership gets you in — regardless of what's in your investment portfolio.",
  },
  {
    label: 'Earn',
    headline: 'Your closet is an untapped asset.',
    body: "The average luxury bag sits unused for most of its life. If you own one, The Handoffs puts it to work. Contribute it to the pool and earn $60 in credits for every 30 days it's available to rent. Recall it whenever you want it back.",
  },
  {
    label: 'Sustain',
    headline: 'Circulation over consumption.',
    body: "Every bag rented is a bag not bought. We believe the fashion industry moves too fast and produces too much. The Handoffs is built on the idea that the bags already in the world are enough — they just need to keep moving.",
  },
];

const BRANDS = [
  { name: 'Balenciaga', slug: 'balenciaga' },
  { name: 'Bottega Veneta', slug: 'bottega-veneta' },
  { name: 'Burberry', slug: 'burberry' },
  { name: 'Celine', slug: 'celine' },
  { name: 'Chanel', slug: 'chanel' },
  { name: 'Chloe', slug: 'chloe' },
  { name: 'Christian Louboutin', slug: 'christian-louboutin' },
  { name: 'Coach', slug: 'coach' },
  { name: 'Dior', slug: 'dior' },
  { name: 'Dolce & Gabbana', slug: 'dolce-gabbana' },
  { name: 'Fendi', slug: 'fendi' },
  { name: 'Ferragamo', slug: 'ferragamo' },
  { name: 'Givenchy', slug: 'givenchy' },
  { name: 'Goyard', slug: 'goyard' },
  { name: 'Gucci', slug: 'gucci' },
  { name: 'Hermès', slug: 'hermes' },
  { name: 'Loewe', slug: 'loewe' },
  { name: 'Louis Vuitton', slug: 'louis-vuitton' },
  { name: 'MCM', slug: 'mcm' },
  { name: 'Prada', slug: 'prada' },
  { name: 'Saint Laurent', slug: 'saint-laurent' },
  { name: 'Valentino', slug: 'valentino' },
];

const PLANS = [
  {
    name: 'Standard',
    price: '$149',
    period: '/month',
    perks: ['1 bag at a time', 'No rental time limit', 'Full catalog access'],
  },
  {
    name: 'Premium',
    price: '$229',
    period: '/month',
    highlight: true,
    perks: ['2 bags at a time', 'No rental time limit', 'Full catalog access'],
  },
];

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6FB] text-[#2D2040]">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex flex-col leading-none">
            <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
            <span className="text-lg font-bold text-[#2D2040]">Handoffs</span>
          </div>
          <div className="flex items-center gap-3">
            {loggedIn ? (
              <Link
                href="/browse"
                className="text-sm font-semibold bg-[#7B5EA7] hover:bg-[#6a4f93] text-white px-4 py-2 rounded-xl transition-colors"
              >
                Browse Bags
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-500 hover:text-[#2D2040] transition-colors px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/apply"
                  className="text-sm font-semibold bg-[#7B5EA7] hover:bg-[#6a4f93] text-white px-4 py-2 rounded-xl transition-colors"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-4">
          Luxury Bag Rental Membership
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-[#2D2040] leading-tight mb-6">
          Wear the bag.<br />Not the price tag.
        </h1>
        <h2 className="sr-only">A Members-Only Luxury Handbag Rental Club</h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          The Handoffs is a members-only rental club for authenticated luxury handbags.
          Borrow from a curated collection, earn from bags you already own,
          and keep fashion in circulation — not in a closet.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {loggedIn ? (
            <Link
              href="/browse"
              className="w-full sm:w-auto bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              Browse the collection
            </Link>
          ) : (
            <>
              <Link
                href="/apply"
                className="w-full sm:w-auto bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
              >
                Start your membership
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Values — Access, Earn, Sustain */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {VALUES.map(({ label, headline, body }) => (
              <div key={label} className="bg-[#2D2040] p-8 sm:p-10">
                <p className="text-xs font-bold text-[#C4B5E8] uppercase tracking-widest mb-4">{label}</p>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{headline}</h3>
                <p className="text-sm text-[#B0A8C8] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute — prominent standalone section */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold text-[#7B5EA7] uppercase tracking-widest mb-3">For bag owners</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] leading-tight mb-5">
              The idle bag in your closet could be paying you.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Contribute your bag to The Handoffs pool and earn <strong className="text-[#2D2040]">$60 in credits for every 30 days</strong> it's available to rent.
              You stay in control — recall it whenever you want it back, no questions asked.
            </p>
            <div className="space-y-3 mb-8">
              {[
                'Free white-glove authentication & intake',
                'We handle shipping, insurance, and returns',
                'Credits apply directly to your membership',
                'Recall your bag anytime',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-[#7B5EA7] font-bold mt-0.5 shrink-0">✓</span>
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/apply"
                className="inline-block bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-7 py-3.5 rounded-2xl text-sm transition-colors"
              >
                Start earning with your bag →
              </Link>
              <Link
                href="/for-bag-owners"
                className="inline-block border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 font-semibold px-7 py-3.5 rounded-2xl text-sm transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: '$60', label: 'credits per 30-day cycle' },
              { stat: '0', label: 'upfront cost to contribute' },
              { stat: '100%', label: 'control — recall anytime' },
              { stat: '∞', label: 'cycles as long as you want' },
            ].map(({ stat, label }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <p className="text-3xl font-bold text-[#7B5EA7] mb-1">{stat}</p>
                <p className="text-xs text-gray-400 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-2">Simple by design</p>
            <h2 className="text-3xl font-bold text-[#2D2040]">How The Handoffs works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, body }) => (
              <div key={step} className="bg-[#F8F6FB] rounded-2xl p-7">
                <p className="text-3xl font-bold text-[#EDE8F7] mb-4">{step}</p>
                <h3 className="text-base font-bold text-[#2D2040] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported brands */}
      <section className="bg-[#F8F6FB] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-2">The Collection</p>
            <h2 className="text-3xl font-bold text-[#2D2040]">Only the best houses.</h2>
            <p className="text-gray-400 mt-2 text-sm max-w-lg mx-auto">
              Every bag in The Handoffs pool is authenticated and sourced from one of these brands — nothing else makes the cut.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {BRANDS.map(({ name, slug }) => (
              <Link
                key={slug}
                href={`/collection/${slug}`}
                className="bg-white border border-gray-100 text-[#2D2040] text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:border-[#7B5EA7] hover:text-[#7B5EA7] transition-colors"
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/collection" className="text-sm font-semibold text-[#7B5EA7] hover:underline">
              View the full collection →
            </Link>
          </div>
        </div>
      </section>

      {/* Membership plans */}
      <section className="bg-[#F8F6FB] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-2">Membership</p>
            <h2 className="text-3xl font-bold text-[#2D2040]">Choose your plan</h2>
            <p className="text-gray-400 mt-2 text-sm">Cancel anytime. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border-2 p-7 flex flex-col ${
                  plan.highlight
                    ? 'border-[#7B5EA7] bg-white'
                    : 'border-gray-100 bg-white'
                }`}
              >
                {plan.highlight && (
                  <span className="self-start text-xs font-bold text-[#7B5EA7] bg-purple-50 border border-[#7B5EA7] px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#2D2040]">{plan.name}</h3>
                <p className="text-4xl font-bold text-[#2D2040] mt-2 mb-1">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-400">{plan.period}</span>
                </p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#7B5EA7] shrink-0 mt-0.5">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/apply"
                  className={`mt-7 block text-center font-semibold py-3 rounded-xl text-sm transition-colors ${
                    plan.highlight
                      ? 'bg-[#7B5EA7] hover:bg-[#6a4f93] text-white'
                      : 'border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50'
                  }`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex flex-col leading-none mb-4">
                <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
                <span className="text-base font-bold text-[#2D2040]">Handoffs</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">Members-only luxury handbag rental club. Rent authenticated designer bags or earn from the ones you own.</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#2D2040] uppercase tracking-wider mb-3">Discover</p>
              <div className="flex flex-col gap-2 text-xs text-gray-400">
                <Link href="/collection" className="hover:text-[#7B5EA7] transition-colors">Browse Collection</Link>
                <Link href="/how-it-works" className="hover:text-[#7B5EA7] transition-colors">How It Works</Link>
                <Link href="/membership" className="hover:text-[#7B5EA7] transition-colors">Membership Plans</Link>
                <Link href="/compare" className="hover:text-[#7B5EA7] transition-colors">Compare Services</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[#2D2040] uppercase tracking-wider mb-3">For Owners</p>
              <div className="flex flex-col gap-2 text-xs text-gray-400">
                <Link href="/for-bag-owners" className="hover:text-[#7B5EA7] transition-colors">Earn From Your Bags</Link>
                <Link href="/faq" className="hover:text-[#7B5EA7] transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[#2D2040] uppercase tracking-wider mb-3">Account</p>
              <div className="flex flex-col gap-2 text-xs text-gray-400">
                <Link href="/login" className="hover:text-[#7B5EA7] transition-colors">Sign In</Link>
                <Link href="/apply" className="hover:text-[#7B5EA7] transition-colors">Join Now</Link>
                <Link href="/privacy" className="hover:text-[#7B5EA7] transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 text-center">
            <p className="text-xs text-gray-300">© {new Date().getFullYear()} The Handoffs. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
