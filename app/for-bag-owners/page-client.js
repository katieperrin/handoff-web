'use client';
import { useState } from 'react';
import Link from 'next/link';

const EARNING_EXAMPLES = [
  { bag: 'Chanel Classic Flap', brand: 'Chanel', earning: '$720/year', frequency: '$60 per 30-day cycle' },
  { bag: 'Louis Vuitton Neverfull', brand: 'Louis Vuitton', earning: '$720/year', frequency: '$60 per 30-day cycle' },
  { bag: 'Gucci Marmont', brand: 'Gucci', earning: '$720/year', frequency: '$60 per 30-day cycle' },
  { bag: 'Prada Saffiano Bag', brand: 'Prada', earning: '$720/year', frequency: '$60 per 30-day cycle' },
];

const BENEFITS = [
  {
    title: 'Free Authentication',
    description: 'We handle expert white-glove authentication and professional intake photos. No cost to you.',
  },
  {
    title: 'Full Insurance Coverage',
    description: 'Your contributed bags are insured while in our pool. We cover accidental damage during rentals.',
  },
  {
    title: 'We Handle Everything',
    description: 'Shipping, returns, cleaning, storage — we manage it all. You just sit back and earn.',
  },
  {
    title: 'Recall Anytime',
    description: 'Change your mind? Recall your bag whenever you want. No penalties, no questions asked.',
  },
  {
    title: 'Passive Income',
    description: 'Your bag earns credits while it sits. No active work required — just contribute and earn.',
  },
  {
    title: 'Credits Apply Directly',
    description: 'Every dollar earned goes straight to your membership as rental credits, automatically applied to offset your subscription cost.',
  },
];

const OWNER_STEPS = [
  {
    step: '01',
    title: 'Submit Your Bag',
    description: 'List your designer bag with photos and details. Tell us the brand, model, condition, and purchase year.',
  },
  {
    step: '02',
    title: 'We Authenticate',
    description: 'Our experts verify authenticity. We assess condition and take professional photos. Completely free.',
  },
  {
    step: '03',
    title: 'Bag Joins the Pool',
    description: 'Once approved, your bag becomes available to rent. Members can request it anytime.',
  },
  {
    step: '04',
    title: 'You Earn Credits',
    description: 'Earn $60 in credits per 30-day cycle your bag is available. Credited monthly.',
  },
];

const FAQ_ITEMS = [
  {
    category: 'Earnings',
    items: [
      {
        q: 'How much can I earn from my luxury bag?',
        a: 'You earn $60 in credits per 30-day cycle your bag is available to rent. That\'s $720 per year per bag.',
      },
      {
        q: 'How do earnings work?',
        a: 'You earn credits when your bag is available to be rented. Credits accumulate monthly and apply directly to your membership. You can use them to rent other bags, or they offset your membership fee. Earnings are credited within 5 business days of the rental return.',
      },
      {
        q: 'Can I earn from multiple bags?',
        a: 'Yes! You can contribute up to 2 bags at a time. Each bag earns independently, so having both bags in the pool can double your monthly earnings.',
      },
    ],
  },
  {
    category: 'For Bag Owners',
    items: [
      {
        q: 'What condition does my bag need to be in?',
        a: 'Your bag should be in gently used condition — no major flaws, tears, or staining. We accept some minor wear (scratches, slight color fading) which is normal for luxury goods. Bags must be authentic and fully functional.',
      },
      {
        q: 'Is my bag insured while being rented?',
        a: 'Yes. Every contributed bag is fully insured while in our pool and during rentals. We cover accidental damage from normal use. If a renter damages your bag, insurance covers it.',
      },
      {
        q: 'Can I get my bag back anytime?',
        a: 'Absolutely. Recall your bag at any time, no questions asked. If it\'s currently being rented, we retrieve it from the renter and ship it back to you within 14 business days.',
      },
      {
        q: 'Do I need to be a member to contribute?',
        a: 'Yes. An active membership is required to contribute bags to the pool. Members enjoy both the rental benefits and the ability to earn credits from their contributions.',
      },
      {
        q: 'How long does authentication take?',
        a: 'Authentication typically takes 1-3 business days from receipt. We\'ll notify you once your bag is verified and ready to start earning.',
      },
    ],
  },
  {
    category: 'Process & Logistics',
    items: [
      {
        q: 'How do I ship my bag to you?',
        a: 'We email you a prepaid shipping label. You pack your bag securely and ship it to our authentication facility.',
      },
      {
        q: 'What happens if my bag gets damaged during rental?',
        a: 'Normal wear over time should be expected. Our insurance covers any damage beyond that — if a renter causes damage above normal use, we document it and file a claim on your behalf. You\'re not liable.',
      },
      {
        q: 'Can I withdraw my earnings as cash?',
        a: 'Earnings are in the form of rental credits that apply to your membership. You can use them to rent bags or offset your monthly fee. We don\'t offer cash withdrawals.',
      },
    ],
  },
];

function ExpandableQuestion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className="bg-white rounded-lg border border-gray-100 p-6"
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <summary className="cursor-pointer font-semibold text-[#2D2040] flex items-center justify-between">
        {question}
        <span className={`ml-3 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </summary>
      <p className="mt-4 text-gray-600 text-sm leading-relaxed">{answer}</p>
    </details>
  );
}

export function BagOwnersPageContent() {
  return (
    <div className="min-h-screen bg-[#F8F6FB] text-[#2D2040]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-none hover:opacity-70 transition-opacity">
            <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
            <span className="text-lg font-bold text-[#2D2040]">Handoffs</span>
          </Link>
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20">
        <div className="text-center">
          <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-4">
            For Bag Owners
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2D2040] leading-tight mb-6">
            Your Closet Is an Untapped Asset
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Designer bags you own but rarely use are just sitting there. With The Handoffs, your luxury bags work for you. Contribute them, we authenticate them, they join our rental pool, and you earn passive income — $60 per month per bag.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              Start earning with your bag →
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works for Owners */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
              How Contributing Works
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              From submitting your bag to earning your first credits, here's the simple process.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {OWNER_STEPS.map(({ step, title, description }) => (
              <div key={step} className="relative">
                <div className="bg-[#F8F6FB] rounded-2xl p-7 h-full">
                  <p className="text-4xl font-bold text-[#EDE8F7] mb-4">{step}</p>
                  <h3 className="text-base font-bold text-[#2D2040] mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
                {step !== '04' && (
                  <div className="hidden sm:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-[#7B5EA7] rounded-full text-white text-xs flex items-center justify-center font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              See What Your Bags Could Earn
            </h2>
            <p className="text-[#B0A8C8] max-w-lg mx-auto">
              These examples show the earning potential of premium luxury bags in our collection.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EARNING_EXAMPLES.map(({ bag, brand, earning, frequency }) => (
              <div key={bag} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <p className="text-xs font-bold text-[#C4B5E8] uppercase tracking-widest mb-2">{brand}</p>
                <h3 className="text-xl font-bold text-white mb-3">{bag}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-[#B0A8C8] mb-1">Annual Earnings</p>
                    <p className="text-3xl font-bold text-[#7B5EA7]">{earning}</p>
                  </div>
                  <p className="text-sm text-[#B0A8C8]">{frequency}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-[#B0A8C8] text-sm mb-3">Have multiple bags?</p>
            <p className="text-2xl font-bold text-white">
              2 bags = <span className="text-[#7B5EA7]">$1,440 annual earnings</span>
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
            Why Choose The Handoffs
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            We handle all the complexity. You just contribute and earn.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {BENEFITS.map(({ title, description }) => (
            <div key={title} className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-[#EDE8F7] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#7B5EA7] font-bold text-xl">✓</span>
              </div>
              <h3 className="text-lg font-bold text-[#2D2040] mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
              Your Bag Is in Safe Hands
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Every step is designed for security, authenticity, and your peace of mind.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-[#2D2040] mb-2">Expert Authentication</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our authentication experts verify every bag using industry-standard protocols. Only authentic luxury bags join our pool.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-lg font-bold text-[#2D2040] mb-2">Full Insurance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your bags are insured while in our pool and during rentals. We cover accidental damage from normal use.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-[#2D2040] mb-2">Vetted Members</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Only verified members can rent. Our community is built on trust and respect for luxury items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
            Questions From Bag Owners
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            We've answered the questions we hear most from contributors.
          </p>
        </div>

        {FAQ_ITEMS.map(({ category, items }) => (
          <div key={category} className="mb-12">
            <h3 className="text-lg font-bold text-[#2D2040] mb-6 text-center sm:text-left">
              {category}
            </h3>
            <div className="space-y-4">
              {items.map((item) => (
                <ExpandableQuestion
                  key={item.q}
                  question={item.q}
                  answer={item.a}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Earn From Your Bags?
          </h2>
          <p className="text-[#B0A8C8] mb-10 text-lg">
            Getting started takes just a few minutes. Submit your bags and start earning passive income today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl transition-colors"
            >
              Start Your Contribution
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 font-semibold px-8 py-4 rounded-2xl transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start leading-none">
            <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
            <span className="text-base font-bold text-[#2D2040]">Handoffs</span>
            <span className="text-xs text-gray-400 mt-0.5">Luxury. Simplified.</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-[#7B5EA7] transition-colors">Privacy Policy</Link>
            <Link href="/login" className="hover:text-[#7B5EA7] transition-colors">Sign In</Link>
            <Link href="/apply" className="hover:text-[#7B5EA7] transition-colors">Join</Link>
          </div>
          <p className="text-xs text-gray-300">© {new Date().getFullYear()} The Handoffs</p>
        </div>
      </footer>
    </div>
  );
}
