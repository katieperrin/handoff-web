export const metadata = {
  title: 'Best Luxury Bag Rental Services Compared (2026) | The Handoffs',
  description: 'Compare luxury bag rental services side-by-side. See how The Handoffs compares to Vivrelle, Rent the Runway, Switch, and others. Two-sided model where owners earn.',
  keywords: 'Vivrelle alternative, best bag rental service, designer bag rental comparison, luxury bag rental 2026',
  openGraph: {
    title: 'Luxury Bag Rental Services Compared | The Handoffs',
    description: 'The complete comparison guide. See pricing, models, bags, insurance, and more.',
    type: 'website',
  },
};

import Link from 'next/link';

const COMPARISON_DATA = [
  {
    service: 'The Handoffs',
    pricing: '$149–$229/mo',
    model: 'Two-sided (rent & earn)',
    selection: '200+ bags',
    earnBack: '✓ Yes',
    insurance: '✓ Full',
    authentication: '✓ Expert',
    flexibility: '✓ No time limit',
    bagOwners: '✓ Can contribute',
    bestFor: 'Renters who want to earn from their own bags',
  },
  {
    service: 'Vivrelle',
    pricing: '$99–$349/mo',
    model: 'Renter-only',
    selection: '1000+ bags',
    earnBack: '✗ No',
    insurance: '✓ Full',
    authentication: '✓ Expert',
    flexibility: '✓ No time limit',
    bagOwners: '✗ Cannot contribute',
    bestFor: 'Renters who want the largest designer selection',
  },
  {
    service: 'Rent the Runway',
    pricing: '$89–$189/mo',
    model: 'Renter-only',
    selection: '1000+ items',
    earnBack: '✗ No',
    insurance: '✓ Covered',
    authentication: 'Mixed quality',
    flexibility: '✓ Unlimited swaps',
    bagOwners: '✗ Cannot contribute',
    bestFor: 'Fashion renters who want variety beyond bags',
  },
  {
    service: 'Switch',
    pricing: '$99–$199/mo',
    model: 'Renter-only',
    selection: '800+ bags',
    earnBack: '✗ No',
    insurance: '✓ Full',
    authentication: '✓ Expert',
    flexibility: '⚠ Limited swaps',
    bagOwners: '✗ Cannot contribute',
    bestFor: 'Renters seeking contemporary designer bags',
  },
  {
    service: 'Bag Borrow or Steal',
    pricing: '$89–$259/mo',
    model: 'Renter-only',
    selection: '300+ bags',
    earnBack: '✗ No',
    insurance: '✓ Covered',
    authentication: 'Limited',
    flexibility: '✓ Flexible returns',
    bagOwners: '✗ Cannot contribute',
    bestFor: 'Budget-conscious renters',
  },
];

const DETAILED_COMPARISON = [
  {
    aspect: 'Pricing',
    details: [
      {
        name: 'The Handoffs',
        info: '$149/month (Standard: 1 bag) or $229/month (Premium: 2 bags). No additional fees.',
      },
      {
        name: 'Vivrelle',
        info: 'Tiered pricing $99–$349 depending on tier. Higher tiers offer more luxury brands.',
      },
      {
        name: 'Rent the Runway',
        info: '$89–$189/month depending on closet size and swap frequency.',
      },
    ],
  },
  {
    aspect: 'Business Model',
    details: [
      {
        name: 'The Handoffs',
        info: 'Two-sided marketplace where renters borrow and owners contribute bags. Owners earn credits from rentals.',
      },
      {
        name: 'Vivrelle & Others',
        info: 'One-sided rental model. Company sources all bags. Members only rent, cannot earn.',
      },
    ],
  },
  {
    aspect: 'For Bag Owners',
    details: [
      {
        name: 'The Handoffs',
        info: 'Can contribute your own bags for free authentication and earn $60 per 30-day cycle. Full insurance and full control.',
      },
      {
        name: 'Vivrelle & Others',
        info: 'No contributor program. Cannot monetize bags you already own.',
      },
    ],
  },
  {
    aspect: 'Authentication',
    details: [
      {
        name: 'The Handoffs',
        info: 'Expert white-glove authentication for every bag. Industry-standard protocols.',
      },
      {
        name: 'Vivrelle',
        info: 'Expert authentication. Known for rigorous authenticity standards.',
      },
      {
        name: 'Rent the Runway',
        info: 'Mixed authentication. Focuses on newer designer releases; vintage authentication less rigorous.',
      },
    ],
  },
  {
    aspect: 'Bag Selection',
    details: [
      {
        name: 'The Handoffs',
        info: 'Curated collection of 200+ authenticated luxury handbags from premium brands.',
      },
      {
        name: 'Vivrelle',
        info: '1000+ designer bags from the most prestigious luxury houses.',
      },
      {
        name: 'Rent the Runway',
        info: '1000+ items across fashion, shoes, and accessories — not bags-specific.',
      },
    ],
  },
  {
    aspect: 'Insurance & Protection',
    details: [
      {
        name: 'The Handoffs',
        info: 'Full insurance coverage. You\'re protected against loss and damage from normal use.',
      },
      {
        name: 'Vivrelle',
        info: 'Full coverage for accidental damage. Optional protection plan available.',
      },
      {
        name: 'Rent the Runway',
        info: 'Damage fee up to $295. Limited coverage for losses.',
      },
    ],
  },
];

const TESTIMONIAL_COMPARISON = [
  {
    aspect: 'As a Renter',
    handoffs: 'Access luxury bags at a fraction of the ownership cost. Plus, earn credits by contributing your own bags.',
    competitors: 'Rent luxury items from a large selection. No way to offset costs through your own inventory.',
  },
  {
    aspect: 'As a Bag Owner',
    handoffs: 'Monetize your luxury bag collection. Contribute bags, get them authenticated, and earn passive income.',
    competitors: 'Cannot contribute or earn. Your bags stay inactive in your closet.',
  },
  {
    aspect: 'Value Proposition',
    handoffs: 'The only two-sided model that rewards both renters and contributors.',
    competitors: 'One-way rental model. Great for access, but no earning potential.',
  },
];

export default function ComparePage() {
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
            Compare Services
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2D2040] leading-tight mb-6">
            Find the Right Luxury Bag Rental Service
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            The luxury bag rental market has grown significantly. We've compared the leading services so you can make an informed choice based on your needs — whether you want to rent, earn, or both.
          </p>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#2D2040] mb-8 text-center">Service Comparison at a Glance</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left p-4 font-bold text-[#2D2040]">Service</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Pricing</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Bag Selection</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Owners Can Earn</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Authentication</th>
                <th className="text-center p-4 font-bold text-[#2D2040]">Insurance</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row) => (
                <tr key={row.service} className="border-b border-gray-100 hover:bg-white transition-colors">
                  <td className="p-4 font-semibold text-[#2D2040]">{row.service}</td>
                  <td className="text-center p-4 text-sm text-gray-600">{row.pricing}</td>
                  <td className="text-center p-4 text-sm text-gray-600">{row.selection}</td>
                  <td className="text-center p-4 text-sm">{row.earnBack}</td>
                  <td className="text-center p-4 text-sm text-gray-600">{row.authentication}</td>
                  <td className="text-center p-4 text-sm text-gray-600">{row.insurance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed Comparisons */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#2D2040] mb-12 text-center">Detailed Comparison</h2>
          <div className="space-y-12">
            {DETAILED_COMPARISON.map(({ aspect, details }) => (
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

      {/* Who Is Each Best For */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#2D2040] mb-12 text-center">Who Is Each Service Best For?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPARISON_DATA.map((service) => (
            <div key={service.service} className="bg-white rounded-2xl border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-[#2D2040] mb-3">{service.service}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.bestFor}</p>
              <div className="space-y-2 text-xs">
                <p><span className="font-bold">Best for:</span> Members seeking {service.model === 'Two-sided (rent & earn)' ? 'both rental access and earning potential' : 'pure rental access'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Handoffs Unique Angle */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The Handoffs: The Only Two-Sided Model
            </h2>
            <p className="text-[#B0A8C8] max-w-2xl mx-auto">
              Every other service is one-way: you rent from them. The Handoffs is different.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TESTIMONIAL_COMPARISON.map(({ aspect, handoffs, competitors }) => (
              <div key={aspect} className="space-y-4">
                <h3 className="text-lg font-bold text-white text-center">{aspect}</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-xs font-bold text-[#C4B5E8] uppercase tracking-wider mb-2">The Handoffs</p>
                    <p className="text-sm text-white leading-relaxed">{handoffs}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 opacity-60">
                    <p className="text-xs font-bold text-[#B0A8C8] uppercase tracking-wider mb-2">Competitors</p>
                    <p className="text-sm text-[#B0A8C8] leading-relaxed">{competitors}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Take */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl border-2 border-[#7B5EA7] p-10 sm:p-14">
          <h2 className="text-3xl font-bold text-[#2D2040] mb-6">
            Our Honest Take
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Each service has strengths. Vivrelle has the largest selection. Rent the Runway offers fashion variety beyond bags. Switch focuses on contemporary designers. Bag Borrow or Steal has competitive pricing.
            </p>
            <p>
              But if you want to <strong>rent luxury bags AND monetize your own collection</strong>, The Handoffs is the only option. Our two-sided model means your bag collection can actively offset your membership costs while you enjoy unlimited access to ours.
            </p>
            <p>
              We're not trying to be the biggest or have the most bags. We're trying to be the smartest for people who own designer bags and want them to work harder.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-[#2D2040] mb-12 text-center">Common Questions</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-lg border border-gray-100 p-6 group">
            <summary className="cursor-pointer font-semibold text-[#2D2040] flex items-center justify-between">
              Why isn't The Handoffs the same price as competitors?
              <span className="ml-3 transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Our pricing ($149–$229) is competitive with market leaders. The difference is that your contributed bags generate earnings that offset your membership cost. So while the monthly price is in the middle of the market, your actual net cost can be significantly lower.
            </p>
          </details>

          <details className="bg-white rounded-lg border border-gray-100 p-6 group">
            <summary className="cursor-pointer font-semibold text-[#2D2040] flex items-center justify-between">
              Can I use The Handoffs if I don't have bags to contribute?
              <span className="ml-3 transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Absolutely. Many members only rent and never contribute. The Handoffs works great as a pure rental service. Contributing is optional and designed for those who already own luxury bags.
            </p>
          </details>

          <details className="bg-white rounded-lg border border-gray-100 p-6 group">
            <summary className="cursor-pointer font-semibold text-[#2D2040] flex items-center justify-between">
              Is The Handoffs selection large enough?
              <span className="ml-3 transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Our curated collection of 200+ bags covers the major luxury brands and most popular styles. Our model grows the selection as more owners contribute. If you want maximum selection upfront, Vivrelle may be better. If you value authentication rigor and the ability to earn, The Handoffs is ideal.
            </p>
          </details>

          <details className="bg-white rounded-lg border border-gray-100 p-6 group">
            <summary className="cursor-pointer font-semibold text-[#2D2040] flex items-center justify-between">
              How do I switch from another service to The Handoffs?
              <span className="ml-3 transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Sign up for The Handoffs. If you'd like, you can contribute bags you already own to earn credits and offset your membership immediately. It's seamless to run both services while you test us out.
            </p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Experience The Difference?
          </h2>
          <p className="text-[#B0A8C8] mb-10 text-lg">
            Join The Handoffs and discover the first luxury bag rental service designed for both renters and owners.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl transition-colors"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Internal Links */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-500 mb-6">Learn more about The Handoffs:</p>
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
            <Link href="/collection" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Our Collection →
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
