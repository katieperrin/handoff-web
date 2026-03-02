'use client';
import { useState } from 'react';
import Link from 'next/link';

const HOW_SELLING_WORKS = [
  {
    step: '01',
    title: 'List Your Bag',
    description: 'Submit photos and details through our contributor portal. Set your own asking price. Toggle "List for Sale" to enable Try Before You Buy.',
  },
  {
    step: '02',
    title: 'We Authenticate & List',
    description: 'Free expert authentication. Professional photos. Your bag joins our rental pool and is visible to hundreds of active members.',
  },
  {
    step: '03',
    title: 'Earn While You Wait',
    description: 'While your bag waits for a buyer, it earns $50/month cash rental income (prorated to the day, paid via Stripe). No other consignment service does this.',
  },
  {
    step: '04',
    title: 'Bag Sells — You Get 90%',
    description: 'A renter falls in love with your bag and buys it through Try Before You Buy. You receive 90% of the sale price. We keep just 10%.',
  },
];

const COMPETITOR_COMPARISON = [
  {
    platform: 'The Handoffs',
    sellerGets: '90%',
    monthlyIncome: '$50/mo while rented',
    priceControl: 'You set the price',
    timeToEarn: 'Day 1 (rental income)',
    highlight: true,
  },
  {
    platform: 'The RealReal',
    sellerGets: '50–70%',
    monthlyIncome: '$0 while waiting',
    priceControl: 'They set the price',
    timeToEarn: 'When item sells (30–90+ days)',
    highlight: false,
  },
  {
    platform: 'Fashionphile',
    sellerGets: '60–70%',
    monthlyIncome: '$0',
    priceControl: 'They set buyout price',
    timeToEarn: 'Immediate (lower payout)',
    highlight: false,
  },
  {
    platform: 'Rebag',
    sellerGets: '60–65%',
    monthlyIncome: '$0',
    priceControl: 'They set Clair value',
    timeToEarn: 'Immediate (lower payout)',
    highlight: false,
  },
];

const SCENARIO_EXAMPLES = [
  {
    bag: 'Chanel Classic Flap',
    salePrice: 7000,
    daysToSell: 60,
    handoffs: { rentalIncome: 100, salePayout: 6300, total: 6400 },
    realreal: { rentalIncome: 0, salePayout: 4200, total: 4200 },
    fashionphile: { rentalIncome: 0, salePayout: 4550, total: 4550 },
  },
  {
    bag: 'Louis Vuitton Neverfull MM',
    salePrice: 1800,
    daysToSell: 60,
    handoffs: { rentalIncome: 100, salePayout: 1620, total: 1720 },
    realreal: { rentalIncome: 0, salePayout: 1080, total: 1080 },
    fashionphile: { rentalIncome: 0, salePayout: 1170, total: 1170 },
  },
];

const KEY_BENEFITS = [
  {
    title: 'You Set Your Price',
    description: 'No algorithms, no lowball offers. You decide what your bag is worth. Our team may suggest a market value after inspection, but the final price is always yours.',
  },
  {
    title: 'Earn While You Wait',
    description: 'Your bag earns $50/month cash while it\'s actively rented. Traditional consignment pays $0 until the item sells. We pay you from day one.',
  },
  {
    title: '90% Payout on Sale',
    description: 'When your bag sells, you keep 90%. The RealReal takes 30-50%. Fashionphile and Rebag pay 60-70% of market value. We take just 10%.',
  },
  {
    title: 'Full Insurance Coverage',
    description: 'Your bag is fully insured while in our pool and during every rental. Accidental damage from normal use is covered.',
  },
  {
    title: 'Free Authentication',
    description: 'Expert white-glove authentication at no cost. We verify materials, stitching, hardware, serial numbers, and provenance.',
  },
  {
    title: 'Recall Anytime',
    description: 'Changed your mind? Recall your bag whenever you want. No penalties, no questions asked. Usually returned within 14 business days.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How do I list my bag for sale?',
    a: 'Submit your bag through our contributor portal with photos and details. Toggle "List for Sale" and set your asking price. We\'ll authenticate it for free, and it joins our rental pool with a visible sale price.',
  },
  {
    q: 'How does Try Before You Buy work?',
    a: 'When a member rents your bag and it\'s listed for sale, they see the price. If they love it, they can purchase it outright. You receive 90% of the sale price, we keep 10%. The renter keeps the bag — no return needed.',
  },
  {
    q: 'When do I get paid?',
    a: 'Rental income ($50/month prorated) is paid via Stripe after each rental completes. Sale payouts (90% of sale price) are transferred to your Stripe Connect account within a few business days of the purchase.',
  },
  {
    q: 'Can I change my asking price?',
    a: 'Yes, anytime. Update your sale price through the app. Our team may suggest a market value after inspection, but you always have final say.',
  },
  {
    q: 'What if my bag doesn\'t sell?',
    a: 'No problem — your bag keeps earning rental income while it\'s in the pool. There\'s no listing fee, no time limit, and no pressure. Recall it whenever you want.',
  },
  {
    q: 'Do I still earn rental income if my bag is listed for sale?',
    a: 'Yes! Your bag earns $50/month cash while it\'s actively rented, regardless of whether it\'s listed for sale. You earn from both rentals and the eventual sale.',
  },
  {
    q: 'What\'s the 10% commission?',
    a: 'When your bag sells through Try Before You Buy, we keep 10% of the sale price as commission. You receive 90%. Compare that to The RealReal\'s 30-50% or Fashionphile\'s ~35% effective cut.',
  },
  {
    q: 'Do I need to be a member to sell my bag?',
    a: 'No. Anyone can list bags for sale and earn rental income. Non-members earn $50/month cash while their bag is rented. Members earn $60/month in credits while their bag is in the pool. Both can list for sale with 90% payout.',
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

export function SellYourBagContent() {
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
            Sell Your Designer Bag
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2D2040] leading-tight mb-6">
            Earn $50/Month While Your Bag Waits to Sell
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The only consignment service that pays you monthly rental income while your bag is listed for sale. Set your own price, keep 90% when it sells, and earn cash every month it's rented. No other platform does all three.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              List Your Bag for Sale
            </Link>
            <a
              href="#comparison"
              className="w-full sm:w-auto border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              See How We Compare
            </a>
          </div>
        </div>
      </section>

      {/* How Selling Works */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
              How Selling Works
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              From listing to payout — a smarter way to sell your luxury bag.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {HOW_SELLING_WORKS.map(({ step, title, description }) => (
              <div key={step} className="relative">
                <div className="bg-[#F8F6FB] rounded-2xl p-7 h-full">
                  <p className="text-4xl font-bold text-[#EDE8F7] mb-4">{step}</p>
                  <h3 className="text-base font-bold text-[#2D2040] mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Handoffs Advantage */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
            The Handoffs Advantage
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Three reasons sellers choose us over traditional consignment.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { stat: '90%', label: 'Payout on Sale', detail: 'vs 50–70% at The RealReal, Fashionphile, or Rebag' },
            { stat: '$50/mo', label: 'Rental Income', detail: 'Earn cash while your bag waits for a buyer. No one else does this.' },
            { stat: 'You', label: 'Set the Price', detail: 'Not an algorithm. Not a buyer. You decide what your bag is worth.' },
          ].map(({ stat, label, detail }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <p className="text-4xl font-bold text-[#7B5EA7] mb-2">{stat}</p>
              <p className="text-lg font-bold text-[#2D2040] mb-3">{label}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
              How The Handoffs Compares
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Side-by-side with the most popular places to sell luxury bags.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-bold text-[#2D2040]">Platform</th>
                  <th className="text-center p-4 font-bold text-[#2D2040]">Your Payout</th>
                  <th className="text-center p-4 font-bold text-[#2D2040]">Monthly Income</th>
                  <th className="text-center p-4 font-bold text-[#2D2040]">Price Control</th>
                  <th className="text-center p-4 font-bold text-[#2D2040]">Time to First $</th>
                </tr>
              </thead>
              <tbody>
                {COMPETITOR_COMPARISON.map((row) => (
                  <tr
                    key={row.platform}
                    className={`border-b border-gray-100 transition-colors ${
                      row.highlight ? 'bg-purple-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className={`p-4 font-semibold ${row.highlight ? 'text-[#7B5EA7]' : 'text-[#2D2040]'}`}>
                      {row.platform}
                    </td>
                    <td className="text-center p-4 text-sm text-gray-600">{row.sellerGets}</td>
                    <td className={`text-center p-4 text-sm ${row.highlight ? 'text-[#7B5EA7] font-semibold' : 'text-gray-600'}`}>
                      {row.monthlyIncome}
                    </td>
                    <td className="text-center p-4 text-sm text-gray-600">{row.priceControl}</td>
                    <td className="text-center p-4 text-sm text-gray-600">{row.timeToEarn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/compare-consignment"
              className="text-[#7B5EA7] hover:underline font-semibold text-sm"
            >
              See the full consignment comparison with earnings calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* Earnings Scenario */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              See the Math
            </h2>
            <p className="text-[#B0A8C8] max-w-lg mx-auto">
              Total earnings over 60 days for two popular bags. The Handoffs includes rental income + sale payout.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {SCENARIO_EXAMPLES.map(({ bag, salePrice, handoffs, realreal, fashionphile }) => (
              <div key={bag} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <p className="text-xs font-bold text-[#C4B5E8] uppercase tracking-widest mb-2">
                  Sale price: ${salePrice.toLocaleString()}
                </p>
                <h3 className="text-xl font-bold text-white mb-6">{bag}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-semibold">The Handoffs</span>
                    <span className="text-lg font-bold text-[#7B5EA7]">${handoffs.total.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div className="bg-[#7B5EA7] h-3 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <p className="text-xs text-[#B0A8C8]">
                    ${handoffs.rentalIncome} rental income + ${handoffs.salePayout.toLocaleString()} sale payout
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-[#B0A8C8]">The RealReal</span>
                    <span className="text-sm text-[#B0A8C8]">${realreal.total.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div className="bg-white/30 h-3 rounded-full" style={{ width: `${(realreal.total / handoffs.total * 100).toFixed(0)}%` }} />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-[#B0A8C8]">Fashionphile</span>
                    <span className="text-sm text-[#B0A8C8]">${fashionphile.total.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div className="bg-white/30 h-3 rounded-full" style={{ width: `${(fashionphile.total / handoffs.total * 100).toFixed(0)}%` }} />
                  </div>

                  <p className="text-sm text-green-400 font-semibold mt-4">
                    You earn ${(handoffs.total - realreal.total).toLocaleString()} more than The RealReal
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
            Why Sell With The Handoffs
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            We built the selling experience around what bag owners actually want.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {KEY_BENEFITS.map(({ title, description }) => (
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

      {/* FAQ */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">
              Selling FAQ
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Common questions from bag owners looking to sell.
            </p>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <ExpandableQuestion key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Sell Your Bag the Smarter Way?
          </h2>
          <p className="text-[#B0A8C8] mb-10 text-lg">
            List your bag, earn monthly income, and keep 90% when it sells.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl transition-colors"
          >
            List Your Bag for Sale
          </Link>
        </div>
      </section>

      {/* Related Pages */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-500 mb-6 font-semibold">Learn more:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/compare-consignment" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Full Consignment Comparison →
            </Link>
            <Link href="/for-bag-owners" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              For Bag Owners →
            </Link>
            <Link href="/how-it-works" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              How It Works →
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
