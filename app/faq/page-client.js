'use client';
import { useState } from 'react';
import Link from 'next/link';

const FAQ_CATEGORIES = [
  {
    name: 'Renting',
    questions: [
      {
        q: 'How does luxury bag rental work?',
        a: 'Browse our collection of authenticated luxury handbags, request the one you want, and we ship it to your door with a prepaid return label. Keep it as long as you like. When you\'re ready, return it and request your next bag. It\'s that simple.',
      },
      {
        q: 'Is renting a designer bag worth it?',
        a: 'Yes, if you love luxury bags but don\'t want to commit $2,000+ to ownership. Renting lets you wear different bags without the investment. You\'ll pay $149–$229/month for unlimited access to designer bags. The math: a Chanel Classic Flap costs $7,000+. At $229/month, you could carry 3 different luxury bags for the price of owning one. Plus, no depreciation or insurance costs.',
      },
      {
        q: 'How much does it cost to rent a designer bag?',
        a: 'The Handoffs membership is $149/month (Standard: 1 bag at a time) or $229/month (Premium: 2 bags at a time). There are no additional fees for swapping bags or keeping them as long as you want.',
      },
      {
        q: 'What brands are available?',
        a: 'We carry bags from Chanel, Hermès, Louis Vuitton, Prada, Fendi, Dior, Celine, Bottega Veneta, Gucci, Saint Laurent, and more. Every brand in our collection meets our authentication standards.',
      },
      {
        q: 'Can I request a specific bag or brand?',
        a: 'Yes! If there\'s a bag you\'d love to see in the collection, submit a suggestion through the form in your profile. We review all requests and use them to guide what we add next.',
      },
      {
        q: 'How long can I keep a bag?',
        a: 'There\'s no time limit. Keep a bag for a day, a week, a month, or longer. When you\'re ready for something different, return it and request another one. No rush, no penalties.',
      },
      {
        q: 'What if a bag gets damaged?',
        a: 'If a bag gets damaged during your rental, we\'ll assess it and file a claim. You\'re not liable for accidental damage. However, you are responsible for damage from misuse (intentional damage, neglect).',
      },
    ],
  },
  {
    name: 'For Bag Owners',
    questions: [
      {
        q: 'How do I rent out my designer bag?',
        a: 'Submit photos and details of your bag through our contribute portal. We\'ll schedule a white-glove authentication and intake. If approved, your bag joins our rental pool. We handle everything else — shipping, insurance, returns, and member communication.',
      },
      {
        q: 'How much can I earn from my luxury bag?',
        a: 'You earn $60 in credits per 30-day cycle your bag is available to rent. That\'s $720/year per bag.',
      },
      {
        q: 'Is my bag insured while being rented?',
        a: 'Yes, absolutely. Your bags are fully insured while in our pool and during rentals. We cover accidental damage from normal use. If a renter damages your bag, our insurance covers it.',
      },
      {
        q: 'Can I get my bag back anytime?',
        a: 'Yes. Recall your bag whenever you want, no questions asked. If it\'s currently being rented, we retrieve it from the renter and ship it back to you within 14 business days.',
      },
      {
        q: 'What condition does my bag need to be in?',
        a: 'Your bag should be in gently used condition. We accept minor wear (scratches, slight color fading) which is normal for luxury goods. Unacceptable conditions: major stains, tears, broken hardware, missing straps, or significant wear. The bag must be authentic and fully functional.',
      },
    ],
  },
  {
    name: 'Membership',
    questions: [
      {
        q: 'What\'s included in the membership?',
        a: 'Your membership includes: unlimited bag access from our collection, no rental time limits, free shipping and returns, full insurance coverage, and the ability to contribute your own bags for earnings. Standard members get 1 bag at a time; Premium members get 2 bags at a time.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. Cancel anytime with no penalty or hidden fees. Return any active rentals and your subscription won\'t renew on the next billing cycle.',
      },
      {
        q: 'What\'s the difference between Standard and Premium?',
        a: 'Standard ($149/month): 1 bag at a time, unlimited swaps, no rental time limit. Premium ($229/month): 2 bags at a time, unlimited swaps, no rental time limit. Premium is ideal if you like to carry different bags regularly or want backup options.',
      },
      {
        q: 'Do I need to contribute bags to have a membership?',
        a: 'No, contributing is optional. Many members only rent and never contribute. Both renters and contributors are welcome.',
      },
      {
        q: 'How do I use my earnings as credits?',
        a: 'Earnings automatically apply to your membership account. They reduce your monthly membership fee dollar-for-dollar. For example: 1 bag earns $60/month — your Standard membership drops to $89. 2 bags earn $120/month — your Premium membership drops to $109.',
      },
    ],
  },
  {
    name: 'Trust & Authentication',
    questions: [
      {
        q: 'How are bags authenticated?',
        a: 'Every bag in our collection is authenticated using industry-standard protocols by certified experts. We examine materials, stitching, hardware, holograms, date codes, and provenance. We only accept bags we\'re 100% confident are authentic.',
      },
      {
        q: 'What happens if I receive a damaged bag?',
        a: 'If you receive a bag that\'s damaged or doesn\'t match the listing, contact us immediately. We\'ll retrieve it and send you a replacement. You\'re not responsible for pre-existing damage.',
      },
      {
        q: 'How does The Handoffs vet members?',
        a: 'All members are verified during signup. We check identity and payment information. This keeps our community safe and ensures bags are in responsible hands.',
      },
      {
        q: 'What if I\'m unhappy with a bag?',
        a: 'If a bag doesn\'t meet your expectations or the condition is worse than described, return it within 3 days for a swap. No questions asked.',
      },
    ],
  },
  {
    name: 'Shipping & Returns',
    questions: [
      {
        q: 'Who pays for shipping?',
        a: 'We do. Your membership includes free insured shipping in both directions. When you request a bag, we ship it to you for free. When you return it, we include a prepaid return label.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Most bags ship within 1–2 business days. Delivery typically takes 3–5 business days depending on your location. Rush shipping is available for additional fees.',
      },
      {
        q: 'What if my bag arrives late or goes missing?',
        a: 'All shipments are tracked and insured. If a bag is lost in transit, we file a claim immediately and send you a replacement.',
      },
      {
        q: 'How do I return a bag?',
        a: 'Return the bag in the condition you received it (normal wear is fine). Pack it securely. Use the prepaid shipping label we include. Drop it at any carrier location. That\'s it.',
      },
    ],
  },
];

function FAQAccordion({ category }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-[#2D2040] mb-8 pb-4 border-b-2 border-[#7B5EA7]">
        {category.name}
      </h2>
      <div className="space-y-4">
        {category.questions.map((item, idx) => (
          <details
            key={idx}
            className="bg-white rounded-lg border border-gray-100 p-6 group"
            open={expandedIndex === idx}
            onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
          >
            <summary className="cursor-pointer font-semibold text-[#2D2040] flex items-center justify-between">
              {item.q}
              <span className={`ml-3 transform group-open:rotate-180 transition-transform`}>
                ▼
              </span>
            </summary>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function FAQPageContent() {
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
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2D2040] leading-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about renting luxury bags, membership, authentication, insurance, and earning from your own bags.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-4 font-semibold">Quick Navigation:</p>
          <div className="flex flex-wrap gap-3">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href={`#${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-[#F8F6FB] text-[#7B5EA7] rounded-lg text-sm font-semibold hover:bg-[#EDE8F7] transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        {FAQ_CATEGORIES.map((category) => (
          <div key={category.name} id={category.name.toLowerCase().replace(/\s+/g, '-')}>
            <FAQAccordion category={category} />
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Can't Find Your Answer?
          </h2>
          <p className="text-[#B0A8C8] mb-10 text-lg">
            Our team is here to help. Reach out anytime.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl transition-colors"
          >
            Join & Ask Us Anything
          </Link>
        </div>
      </section>

      {/* Related Pages */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-500 mb-6 font-semibold">Learn more:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/how-it-works" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              How It Works →
            </Link>
            <Link href="/for-bag-owners" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              For Bag Owners →
            </Link>
            <Link href="/membership" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Membership Plans →
            </Link>
            <Link href="/compare" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Compare Services →
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
