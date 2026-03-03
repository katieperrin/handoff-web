'use client';
import { useState } from 'react';
import Link from 'next/link';

const CONSIGNMENT_COMPARISON = [
  {
    platform: 'The Handoffs',
    commissionRate: '15%',
    sellerPayout: '85%',
    monthlyIncome: '$50/mo while rented',
    priceControl: 'Seller sets price',
    timeToFirstDollar: 'Within first month',
    authentication: 'Free expert auth',
    insurance: 'Full coverage',
    canRecall: 'Yes, anytime',
    highlight: true,
  },
  {
    platform: 'The RealReal',
    commissionRate: '30–50%',
    sellerPayout: '50–70%',
    monthlyIncome: 'None',
    priceControl: 'Platform sets price',
    timeToFirstDollar: 'When item sells',
    authentication: 'Free (backlogs common)',
    insurance: 'Limited',
    canRecall: 'Yes, with fees',
    highlight: false,
  },
  {
    platform: 'Fashionphile',
    commissionRate: '~30–40% (buyout)',
    sellerPayout: '60–70%',
    monthlyIncome: 'None',
    priceControl: 'They set buyout price',
    timeToFirstDollar: 'Immediate',
    authentication: 'Free',
    insurance: 'N/A',
    canRecall: 'N/A (outright purchase)',
    highlight: false,
  },
  {
    platform: 'Rebag',
    commissionRate: '~35–40% (Clair)',
    sellerPayout: '60–65%',
    monthlyIncome: 'None',
    priceControl: 'They set Clair value',
    timeToFirstDollar: 'Immediate',
    authentication: 'Free',
    insurance: 'N/A',
    canRecall: 'N/A (outright purchase)',
    highlight: false,
  },
];

const COMPARISON_ASPECTS = [
  {
    aspect: 'Commission & Payout',
    details: [
      {
        name: 'The Handoffs',
        info: 'Just 15% commission when your bag sells. You keep 85% of the sale price. The lowest commission rate in luxury consignment.',
      },
      {
        name: 'The RealReal',
        info: 'Takes 30–50% commission depending on your consignment tier. New sellers start at 50%. Even top-tier sellers only keep 70%.',
      },
      {
        name: 'Fashionphile & Rebag',
        info: 'Buy outright at 60–70% of estimated market value. Fast cash, but you leave 30–40% on the table compared to what your bag is worth.',
      },
    ],
  },
  {
    aspect: 'Income While Waiting',
    details: [
      {
        name: 'The Handoffs',
        info: 'Your bag earns $50/month cash while it\'s actively rented, prorated to the day. On average, bags in our pool are rented within days of being listed. You earn from day one.',
      },
      {
        name: 'The RealReal',
        info: '$0 while your bag waits to sell. Your item sits in their warehouse earning nothing until a buyer comes along — which can take weeks or months.',
      },
      {
        name: 'Fashionphile & Rebag',
        info: 'N/A — they buy outright, so there\'s no waiting period. But you accept their price (typically 60–70% of value) with no negotiation.',
      },
    ],
  },
  {
    aspect: 'Pricing Control',
    details: [
      {
        name: 'The Handoffs',
        info: 'You set your own asking price. Our team may suggest a market value after inspection, but the final price is always your decision. Renters see the transparent price and decide to buy.',
      },
      {
        name: 'The RealReal',
        info: 'They control pricing. Their algorithms set the listing price. You can request a minimum, but they often price lower to move inventory faster.',
      },
      {
        name: 'Fashionphile & Rebag',
        info: 'They make a take-it-or-leave-it offer. Rebag\'s Clair tool gives an instant estimate via app, but the final offer can be lower after inspection.',
      },
    ],
  },
  {
    aspect: 'How Buyers Discover Your Bag',
    details: [
      {
        name: 'The Handoffs',
        info: 'Your bag is rented by active members who carry it daily. They experience the quality firsthand and can purchase through Try Before You Buy. This leads to higher conversion — buyers who\'ve already tried the bag are confident in their purchase.',
      },
      {
        name: 'The RealReal',
        info: 'Buyers browse online listings with photos. Large audience but no way to try before buying. Higher return rates because buyers can\'t feel the bag first.',
      },
      {
        name: 'Fashionphile & Rebag',
        info: 'They resell to their own buyer base. You have no visibility into the sale process or final sale price.',
      },
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: 'Why is The Handoffs commission so much lower?',
    a: 'Because we earn revenue from rental memberships, not just sales commissions. Our business model doesn\'t depend on taking a huge cut from sellers. We only charge 15% on completed sales.',
  },
  {
    q: 'Is The Handoffs really consignment?',
    a: 'It\'s better than consignment. Traditional consignment means your bag sits in a warehouse earning nothing until it sells. With The Handoffs, your bag is actively rented, earning you $50/month cash while it waits for a buyer. When it sells, you keep 85%.',
  },
  {
    q: 'How does rental income work for consigners?',
    a: 'Non-members earn $50/month cash (prorated to the day) while their bag is actively rented. Payouts are transferred to your bank via Stripe Connect after each rental completes. Members earn $60/month in credits while their bag is in the pool.',
  },
  {
    q: 'What if my bag doesn\'t sell?',
    a: 'No problem — your bag keeps earning rental income. There\'s no listing fee, no time limit, and no penalty. You can also adjust your price anytime or recall your bag whenever you want.',
  },
  {
    q: 'Can I list on The Handoffs and other platforms at the same time?',
    a: 'Your bag needs to be physically with us to be in our rental pool and listed for sale. You can\'t list the same bag on multiple platforms simultaneously. But since you\'re earning rental income while waiting, the opportunity cost is offset.',
  },
  {
    q: 'How does this compare to selling on eBay or Poshmark?',
    a: 'eBay charges ~13% in fees and Poshmark takes 20%. Neither pays you income while waiting for a buyer, and neither authenticates bags. The Handoffs charges 15%, pays rental income, and handles authentication, insurance, shipping, and returns.',
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

function EarningsCalculator() {
  const [bagValue, setBagValue] = useState(5000);
  const [daysToSell, setDaysToSell] = useState(60);

  const handoffsRental = Math.round((daysToSell / 30) * 50);
  const handoffsSale = Math.round(bagValue * 0.85);
  const handoffsTotal = handoffsRental + handoffsSale;

  const realrealTotal = Math.round(bagValue * 0.60);
  const fashionphileTotal = Math.round(bagValue * 0.65);
  const rebagTotal = Math.round(bagValue * 0.62);

  const handoffsAdvantage = handoffsTotal - Math.max(realrealTotal, fashionphileTotal, rebagTotal);

  return (
    <div>
      <div className="max-w-2xl mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#B0A8C8] mb-2">
              Your Bag's Sale Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-semibold">$</span>
              <input
                type="number"
                value={bagValue}
                onChange={(e) => setBagValue(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-8 py-3 text-white font-semibold text-lg focus:outline-none focus:border-[#7B5EA7]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#B0A8C8] mb-2">
              Days Until It Sells
            </label>
            <div className="flex gap-3">
              {[30, 60, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => setDaysToSell(days)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                    daysToSell === days
                      ? 'bg-[#7B5EA7] text-white'
                      : 'bg-white/10 text-[#B0A8C8] hover:bg-white/20'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#7B5EA7]/20 border-2 border-[#7B5EA7] rounded-2xl p-6">
          <p className="text-xs font-bold text-[#C4B5E8] uppercase tracking-widest mb-1">The Handoffs</p>
          <p className="text-3xl font-bold text-white mb-3">${handoffsTotal.toLocaleString()}</p>
          <div className="space-y-1 text-xs text-[#B0A8C8]">
            <p>${handoffsRental} rental income ({daysToSell} days)</p>
            <p>${handoffsSale.toLocaleString()} sale payout (85%)</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs font-bold text-[#B0A8C8] uppercase tracking-widest mb-1">The RealReal</p>
          <p className="text-2xl font-bold text-white mb-3">${realrealTotal.toLocaleString()}</p>
          <div className="space-y-1 text-xs text-[#B0A8C8]">
            <p>$0 rental income</p>
            <p>${realrealTotal.toLocaleString()} sale payout (~60%)</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs font-bold text-[#B0A8C8] uppercase tracking-widest mb-1">Fashionphile</p>
          <p className="text-2xl font-bold text-white mb-3">${fashionphileTotal.toLocaleString()}</p>
          <div className="space-y-1 text-xs text-[#B0A8C8]">
            <p>$0 rental income</p>
            <p>${fashionphileTotal.toLocaleString()} buyout (~65%)</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs font-bold text-[#B0A8C8] uppercase tracking-widest mb-1">Rebag</p>
          <p className="text-2xl font-bold text-white mb-3">${rebagTotal.toLocaleString()}</p>
          <div className="space-y-1 text-xs text-[#B0A8C8]">
            <p>$0 rental income</p>
            <p>${rebagTotal.toLocaleString()} Clair buyout (~62%)</p>
          </div>
        </div>
      </div>

      {handoffsAdvantage > 0 && (
        <div className="mt-8 text-center">
          <p className="text-lg font-bold text-green-400">
            You'd earn ${handoffsAdvantage.toLocaleString()} more with The Handoffs
          </p>
        </div>
      )}
    </div>
  );
}

export function CompareConsignmentContent() {
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
          <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-4">
            Consignment Comparison
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2D2040] leading-tight mb-6">
            The Best Place to Consign Your Luxury Handbag
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            A data-driven comparison of luxury handbag consignment options. See commission rates, total payouts, and use our calculator to compare what you'd earn across platforms.
          </p>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#2D2040] mb-8 text-center">Consignment Comparison at a Glance</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left p-4 font-bold text-[#2D2040]">Platform</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Commission</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Your Payout</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Monthly Income</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Price Control</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Time to First $</th>
              </tr>
            </thead>
            <tbody>
              {CONSIGNMENT_COMPARISON.map((row) => (
                <tr
                  key={row.platform}
                  className={`border-b border-gray-100 transition-colors ${
                    row.highlight ? 'bg-purple-50' : 'hover:bg-white'
                  }`}
                >
                  <td className={`p-4 font-semibold ${row.highlight ? 'text-[#7B5EA7]' : 'text-[#2D2040]'}`}>
                    {row.platform}
                  </td>
                  <td className="text-center p-4 text-sm text-gray-600">{row.commissionRate}</td>
                  <td className="text-center p-4 text-sm text-gray-600">{row.sellerPayout}</td>
                  <td className={`text-center p-4 text-sm ${row.highlight ? 'text-[#7B5EA7] font-semibold' : 'text-gray-600'}`}>
                    {row.monthlyIncome}
                  </td>
                  <td className="text-center p-4 text-sm text-gray-600">{row.priceControl}</td>
                  <td className="text-center p-4 text-sm text-gray-600">{row.timeToFirstDollar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed Breakdown */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#2D2040] mb-12 text-center">Detailed Comparison</h2>
          <div className="space-y-12">
            {COMPARISON_ASPECTS.map(({ aspect, details }) => (
              <div key={aspect}>
                <h3 className="text-2xl font-bold text-[#2D2040] mb-6">{aspect}</h3>
                <div className="space-y-4">
                  {details.map((detail) => (
                    <div key={detail.name} className="bg-[#F8F6FB] rounded-lg p-6">
                      <h4 className="font-bold text-[#2D2040] mb-2">{detail.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{detail.info}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario Calculator */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Calculate Your Total Earnings
            </h2>
            <p className="text-[#B0A8C8] max-w-lg mx-auto">
              Enter your bag's sale price and see how much you'd earn across platforms.
            </p>
          </div>
          <EarningsCalculator />
        </div>
      </section>

      {/* Why Earn While You Wait */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl border-2 border-[#7B5EA7] p-10 sm:p-14">
          <h2 className="text-3xl font-bold text-[#2D2040] mb-6">
            Why "Earn While You Wait" Changes Everything
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Traditional consignment has a fundamental problem: your bag sits in a warehouse earning nothing until someone buys it. The RealReal averages 30-90+ days to sell a luxury bag. That's 1-3 months of zero income.
            </p>
            <p>
              The Handoffs solves this. Your bag enters our rental pool immediately after authentication. Members rent it, carry it, and fall in love with it. You earn <strong>$50/month cash</strong> (prorated) while it's rented. When a renter decides to buy through Try Before You Buy, you receive <strong>85%</strong> of the sale price.
            </p>
            <p>
              Even if your bag takes 90 days to sell, you've earned $150 in rental income on top of your 85% sale payout. At The RealReal, you'd have earned $0 in those same 90 days — and then lost 30-50% of the sale price to their commission.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#2D2040] mb-12 text-center">Common Questions</h2>
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
            Get More for Your Bag
          </h2>
          <p className="text-[#B0A8C8] mb-10 text-lg">
            Earn rental income while your bag is listed and keep 85% when it sells.
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
            <Link href="/sell-your-bag" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Sell Your Bag →
            </Link>
            <Link href="/for-bag-owners" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              For Bag Owners →
            </Link>
            <Link href="/compare" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Compare Rental Services →
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
