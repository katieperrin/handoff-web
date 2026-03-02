'use client';
import { useState } from 'react';
import Link from 'next/link';

const THREE_WAYS_TO_EARN = [
  {
    track: 'Member Credits',
    amount: '$60/month',
    detail: 'in credits while your bag is in the pool',
    annual: '$720/year per bag',
    color: 'purple',
    description: 'Active members earn credits that reduce your membership fee dollar-for-dollar. Your bag earns whether it\'s rented or waiting — as long as it\'s in the pool.',
    best: 'Best for members who want to offset their subscription cost.',
  },
  {
    track: 'Consigner Cash',
    amount: '$50/month',
    detail: 'cash while your bag is actively rented',
    annual: 'Prorated to the day, paid via Stripe',
    color: 'green',
    description: 'Non-members earn cash deposited directly to your bank account after each rental completes. No membership required — just connect Stripe.',
    best: 'Best for non-members who want passive cash income.',
  },
  {
    track: 'Sell via Try Before You Buy',
    amount: '90%',
    detail: 'payout when your bag sells',
    annual: 'Only 10% commission',
    color: 'amber',
    description: 'List your bag for sale at a price you set. Renters try it first and can buy it outright. You earn rental income while waiting, then 90% when it sells.',
    best: 'Best for owners ready to part with their bag at a great return.',
  },
];

const SELL_HIGHLIGHTS = [
  { stat: '90%', label: 'Payout on sales', sub: 'vs 50-70% elsewhere' },
  { stat: '$50/mo', label: 'While you wait', sub: 'No other platform pays this' },
  { stat: 'You', label: 'Set the price', sub: 'Full control, change anytime' },
];

const EARNING_EXAMPLES = [
  { bag: 'Chanel Classic Flap', brand: 'Chanel', memberEarning: '$720/year in credits', consignerEarning: '$50/month cash while rented', frequency: 'Members: $60/mo credits (in pool) · Consigners: $50/mo cash (while rented)' },
  { bag: 'Louis Vuitton Neverfull', brand: 'Louis Vuitton', memberEarning: '$720/year in credits', consignerEarning: '$50/month cash while rented', frequency: 'Members: $60/mo credits (in pool) · Consigners: $50/mo cash (while rented)' },
  { bag: 'Gucci Marmont', brand: 'Gucci', memberEarning: '$720/year in credits', consignerEarning: '$50/month cash while rented', frequency: 'Members: $60/mo credits (in pool) · Consigners: $50/mo cash (while rented)' },
  { bag: 'Prada Saffiano Bag', brand: 'Prada', memberEarning: '$720/year in credits', consignerEarning: '$50/month cash while rented', frequency: 'Members: $60/mo credits (in pool) · Consigners: $50/mo cash (while rented)' },
];

const BENEFITS = [
  {
    title: 'Try Before You Buy',
    description: 'List your bag for sale with a transparent price. Renters can try it first and purchase it outright. You receive 90% of the sale price — only 10% commission.',
  },
  {
    title: 'Two Ways to Earn',
    description: 'Members earn $60/month in credits while their bag is in the pool. Not a member? Earn $50/month cash while your bag is actively rented — paid directly to your bank via Stripe.',
  },
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
];

const OWNER_STEPS = [
  {
    step: '01',
    title: 'Submit Your Bag',
    description: 'List your designer bag with photos and details. Tell us the brand, model, condition, and purchase year. Optionally set a sale price for Try Before You Buy.',
  },
  {
    step: '02',
    title: 'We Authenticate',
    description: 'Our experts verify authenticity. We assess condition, take professional photos, and may suggest a market value. Completely free.',
  },
  {
    step: '03',
    title: 'Bag Joins the Pool',
    description: 'Once approved, your bag becomes available to rent. If listed for sale, renters see the price and can buy it during their rental.',
  },
  {
    step: '04',
    title: 'You Earn',
    description: 'Members earn $60/month in credits while their bag is in the pool. Non-members earn $50/month cash while their bag is actively rented via Stripe. If a renter buys your bag, you receive 90% of the sale price.',
  },
];

const FAQ_ITEMS = [
  {
    category: 'Earnings',
    items: [
      {
        q: 'How much can I earn from my luxury bag?',
        a: 'It depends on your track. Active members earn $60/month in credits while their bag is in the pool ($720/year if available all year). Non-members (consigners) earn $50/month cash while their bag is actively rented, prorated and paid directly to your bank account via Stripe. You can also list your bag for sale — if a renter buys it, you receive 90% of the sale price.',
      },
      {
        q: 'How do earnings work?',
        a: 'For members, credits accumulate monthly and apply directly to your membership fee. For consigners, cash payouts are transferred to your connected bank account after each rental completes. If your bag sells through Try Before You Buy, the payout (90% of sale price) is deposited within a few business days.',
      },
      {
        q: 'Can I earn from multiple bags?',
        a: 'Yes! Each bag earns independently. Members with multiple bags can stack credits. Consigners earn cash per rental on each bag.',
      },
    ],
  },
  {
    category: 'Selling & Try Before You Buy',
    items: [
      {
        q: 'Can I list my bag for sale?',
        a: 'Yes. When you submit your bag, you can toggle "List for Sale" and set your asking price. Our team may also suggest a market value after inspection. Renters see the sale price and can purchase the bag during their rental.',
      },
      {
        q: 'How does Try Before You Buy work?',
        a: 'When a renter has your for-sale bag, they can choose to buy it instead of returning it. They pay the listed price, you receive 90%, and we keep a 10% commission. No return needed — the bag is theirs.',
      },
      {
        q: 'Can I earn rental income AND list for sale at the same time?',
        a: 'Absolutely. Your bag earns rental income (credits or cash) while it\'s in the pool. If a renter decides to buy it, the sale completes and you receive your 90% payout. You earn from both rentals and the eventual sale.',
      },
      {
        q: 'How does this compare to The RealReal or Fashionphile?',
        a: 'The RealReal takes 30-50% commission and you earn nothing while your bag waits to sell. Fashionphile offers ~60-70% buyout with no waiting income. The Handoffs charges only 10% commission, pays you rental income while waiting, and lets you set your own price. You keep 90% when it sells.',
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
        a: 'No! Anyone can contribute bags. Members earn $60/month in credits while their bag is in the pool. Non-members earn $50/month cash while their bag is actively rented — you just need to connect a bank account via Stripe for payouts.',
      },
      {
        q: 'How long does authentication take?',
        a: 'Authentication typically takes 1-3 business days from receipt. We\'ll notify you once your bag is verified and ready to start earning.',
      },
      {
        q: 'How do I ship my bag to you?',
        a: 'We email you a prepaid shipping label. You pack your bag securely and ship it to our authentication facility.',
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
            Earn monthly rental income, sell with a 90% payout, or both. The Handoffs gives bag owners three ways to earn — with free authentication, full insurance, and complete control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              Start earning with your bag →
            </Link>
            <Link
              href="/sell-your-bag"
              className="w-full sm:w-auto border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              Sell your bag →
            </Link>
          </div>
        </div>
      </section>

      {/* Three Ways to Earn */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
              Three Ways to Earn
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Choose the track that works for you — or combine rental income with a sale.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {THREE_WAYS_TO_EARN.map(({ track, amount, detail, annual, color, description, best }) => (
              <div
                key={track}
                className={`rounded-2xl p-8 border-2 ${
                  color === 'purple'
                    ? 'border-[#7B5EA7] bg-[#F8F6FB]'
                    : color === 'green'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-amber-500 bg-amber-50'
                }`}
              >
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                  color === 'purple'
                    ? 'text-[#7B5EA7]'
                    : color === 'green'
                    ? 'text-emerald-600'
                    : 'text-amber-600'
                }`}>
                  {track}
                </p>
                <p className={`text-4xl font-bold mb-1 ${
                  color === 'purple'
                    ? 'text-[#7B5EA7]'
                    : color === 'green'
                    ? 'text-emerald-600'
                    : 'text-amber-600'
                }`}>
                  {amount}
                </p>
                <p className="text-sm text-gray-600 mb-2">{detail}</p>
                <p className={`text-xs font-semibold mb-4 ${
                  color === 'purple'
                    ? 'text-[#7B5EA7]'
                    : color === 'green'
                    ? 'text-emerald-600'
                    : 'text-amber-600'
                }`}>
                  {annual}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
                <p className="text-xs text-gray-500 italic">{best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works for Owners */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
            How Contributing Works
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            From submitting your bag to earning your first income, here's the simple process.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {OWNER_STEPS.map(({ step, title, description }) => (
            <div key={step} className="relative">
              <div className="bg-white rounded-2xl p-7 h-full border border-gray-100">
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
      </section>

      {/* Sell Your Bag Section */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C4B5E8] uppercase tracking-widest mb-4">
              Sell Your Bag
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              The Smarter Way to Sell
            </h2>
            <p className="text-[#B0A8C8] max-w-lg mx-auto">
              Why settle for 50-70% at a consignment shop when you can keep 90% — and earn rental income while you wait?
            </p>
          </div>

          {/* Sell Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {SELL_HIGHLIGHTS.map(({ stat, label, sub }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-4xl font-bold text-[#7B5EA7] mb-2">{stat}</p>
                <p className="text-white font-semibold mb-1">{label}</p>
                <p className="text-sm text-[#B0A8C8]">{sub}</p>
              </div>
            ))}
          </div>

          {/* Mini Comparison */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-6 text-center">Quick Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-[#B0A8C8] py-3 pr-4">Platform</th>
                    <th className="text-center text-[#B0A8C8] py-3 px-4">Your Payout</th>
                    <th className="text-center text-[#B0A8C8] py-3 px-4">Monthly Income</th>
                    <th className="text-center text-[#B0A8C8] py-3 pl-4">You Set Price?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5 bg-[#7B5EA7]/20">
                    <td className="py-4 pr-4 font-bold text-white">The Handoffs</td>
                    <td className="py-4 px-4 text-center text-[#7B5EA7] font-bold">90%</td>
                    <td className="py-4 px-4 text-center text-green-400 font-bold">$50/mo</td>
                    <td className="py-4 pl-4 text-center text-green-400 font-bold">Yes</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 pr-4 text-[#B0A8C8]">The RealReal</td>
                    <td className="py-4 px-4 text-center text-[#B0A8C8]">50-70%</td>
                    <td className="py-4 px-4 text-center text-red-400">$0</td>
                    <td className="py-4 pl-4 text-center text-red-400">No</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 pr-4 text-[#B0A8C8]">Fashionphile</td>
                    <td className="py-4 px-4 text-center text-[#B0A8C8]">60-70%</td>
                    <td className="py-4 px-4 text-center text-red-400">$0</td>
                    <td className="py-4 pl-4 text-center text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 text-[#B0A8C8]">Rebag</td>
                    <td className="py-4 px-4 text-center text-[#B0A8C8]">60-65%</td>
                    <td className="py-4 px-4 text-center text-red-400">$0</td>
                    <td className="py-4 pl-4 text-center text-red-400">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sell-your-bag"
                className="text-sm font-semibold text-[#7B5EA7] hover:text-white transition-colors"
              >
                Learn more about selling →
              </Link>
              <Link
                href="/compare-consignment"
                className="text-sm font-semibold text-[#B0A8C8] hover:text-white transition-colors"
              >
                See full comparison →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
            See What Your Bags Could Earn
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            These examples show the earning potential of premium luxury bags in our collection.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {EARNING_EXAMPLES.map(({ bag, brand, memberEarning, consignerEarning }) => (
            <div key={bag} className="bg-white rounded-2xl p-8 border border-gray-100">
              <p className="text-xs font-bold text-[#7B5EA7] uppercase tracking-widest mb-2">{brand}</p>
              <h3 className="text-xl font-bold text-[#2D2040] mb-3">{bag}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">As a Member</p>
                  <p className="text-2xl font-bold text-[#7B5EA7]">{memberEarning}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">As a Consigner</p>
                  <p className="text-xl font-bold text-emerald-600">{consignerEarning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
            <p className="text-gray-500 text-sm mb-3">Members with 2 bags</p>
            <p className="text-2xl font-bold text-[#2D2040]">
              <span className="text-[#7B5EA7]">$1,440/year</span> in credits
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
            <p className="text-gray-500 text-sm mb-3">List for sale?</p>
            <p className="text-2xl font-bold text-[#2D2040]">
              <span className="text-emerald-600">90% payout</span> on purchases
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
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
              <div key={title} className="bg-[#F8F6FB] rounded-2xl p-8">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 border border-gray-100">
                  <span className="text-[#7B5EA7] font-bold text-xl">✓</span>
                </div>
                <h3 className="text-lg font-bold text-[#2D2040] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
            Your Bag Is in Safe Hands
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Every step is designed for security, authenticity, and your peace of mind.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-2xl p-8 border border-gray-100">
            <div className="w-16 h-16 bg-[#EDE8F7] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-bold text-[#2D2040] mb-2">Expert Authentication</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our authentication experts verify every bag using industry-standard protocols. Only authentic luxury bags join our pool.
            </p>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 border border-gray-100">
            <div className="w-16 h-16 bg-[#EDE8F7] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-lg font-bold text-[#2D2040] mb-2">Full Insurance</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your bags are insured while in our pool and during rentals. We cover accidental damage from normal use.
            </p>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 border border-gray-100">
            <div className="w-16 h-16 bg-[#EDE8F7] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-bold text-[#2D2040] mb-2">Vetted Members</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Only verified members can rent. Our community is built on trust and respect for luxury items.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
              Questions From Bag Owners
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              We've answered the questions we hear most from contributors and sellers.
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Earn or Sell?
          </h2>
          <p className="text-[#B0A8C8] mb-10 text-lg">
            Whether you want monthly rental income, a 90% sale payout, or both — getting started takes just a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl transition-colors"
            >
              Start Earning
            </Link>
            <Link
              href="/sell-your-bag"
              className="w-full sm:w-auto border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50/10 font-semibold px-8 py-4 rounded-2xl transition-colors"
            >
              Sell Your Bag
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-500 mb-6 font-semibold">Learn more:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sell-your-bag" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Sell Your Bag →
            </Link>
            <Link href="/compare-consignment" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Compare Consignment →
            </Link>
            <Link href="/how-it-works" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              How It Works →
            </Link>
            <Link href="/compare" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Compare Services →
            </Link>
            <Link href="/faq" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              FAQ →
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
