export const metadata = {
  title: 'Luxury Handbag Rental Membership Plans | The Handoffs',
  description: 'Choose your membership plan. Standard ($149/mo) or Premium ($229/mo). Unlimited bag swaps, no time limits, free shipping, full insurance. Cancel anytime.',
  keywords: 'luxury bag rental membership, designer bag rental cost, bag rental plans, membership pricing',
  openGraph: {
    title: 'Luxury Handbag Rental Membership Plans | The Handoffs',
    description: 'Two flexible membership plans. Standard or Premium. Choose what works for you.',
    type: 'website',
  },
};

import Link from 'next/link';

const PLANS = [
  {
    name: 'Standard',
    price: '$149',
    period: '/month',
    description: 'Perfect for trying luxury bag rental or casual swappers',
    bagCount: '1 bag at a time',
    highlight: false,
    features: [
      '1 designer bag at a time',
      'Unlimited bag swaps',
      'No rental time limit',
      'Full catalog access',
      'Free insured shipping both ways',
      'Full damage insurance included',
      'Cancel anytime',
      'Member community access',
    ],
    ctaText: 'Start with Standard',
  },
  {
    name: 'Premium',
    price: '$229',
    period: '/month',
    description: 'For style lovers who want more options',
    bagCount: '2 bags at a time',
    highlight: true,
    features: [
      '2 designer bags at a time',
      'Unlimited bag swaps',
      'No rental time limit',
      'Full catalog access',
      'Free insured shipping both ways',
      'Full damage insurance included',
      'Cancel anytime',
      'Member community access',
      'Priority support',
    ],
    ctaText: 'Go Premium',
  },
];

const COMPARISON = [
  { feature: 'Designer Bags', standard: '1 at a time', premium: '2 at a time' },
  { feature: 'Unlimited Swaps', standard: 'Yes', premium: 'Yes' },
  { feature: 'No Time Limits', standard: 'Yes', premium: 'Yes' },
  { feature: 'Full Catalog Access', standard: 'Yes', premium: 'Yes' },
  { feature: 'Free Shipping (Both Ways)', standard: 'Yes', premium: 'Yes' },
  { feature: 'Full Insurance Coverage', standard: 'Yes', premium: 'Yes' },
  { feature: 'Contribute & Earn', standard: 'Yes', premium: 'Yes' },
  { feature: 'Priority Support', standard: 'No', premium: 'Yes' },
];

const EVERY_PLAN_INCLUDES = [
  {
    title: 'Authenticated Luxury Bags',
    description: 'Every bag in our collection is verified by experts. All authentic, all premium brands.',
  },
  {
    title: 'Free Shipping & Returns',
    description: 'Insured shipping both ways. No additional fees ever.',
  },
  {
    title: 'Full Damage Insurance',
    description: 'Accidental damage from normal wear is covered. You\'re protected.',
  },
  {
    title: 'Unlimited Swaps',
    description: 'Keep a bag for a day or a month. Swap whenever you\'re ready.',
  },
  {
    title: 'No Time Limits',
    description: 'Your rental periods are open-ended. No "days per year" restrictions.',
  },
  {
    title: 'Contribute & Earn',
    description: 'Contribute your own bags and earn passive income. Optional, but powerful.',
  },
  {
    title: 'Flexible Cancellation',
    description: 'Cancel anytime. No long-term contracts or hidden penalties.',
  },
  {
    title: 'Member Community',
    description: 'Connect with other luxury bag enthusiasts. Share reviews and recommendations.',
  },
];

const EARNING_EXPLAINED = [
  {
    title: 'How Contributing Works',
    description: 'Submit your luxury bags for free authentication. Once verified, they join our pool and available to rent. You earn credits.',
  },
  {
    title: 'Earning Potential',
    description: 'Earn $60 in credits per 30-day cycle your bag is available. That\'s $720/year per bag.',
  },
  {
    title: 'Credits Apply Directly',
    description: 'Earnings offset your membership fee directly. 1 bag earns $60/month — Standard drops to $89. 2 bags earn $120/month — Premium drops to $109.',
  },
  {
    title: 'No Fees or Penalties',
    description: 'There\'s no cost to contribute. No fees when your bag is rented. No hidden charges.',
  },
  {
    title: 'Recall Anytime',
    description: 'Change your mind? Recall your bag whenever you want. No questions asked, no penalties.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes! You can change your plan at any time. If you upgrade mid-month, you\'ll be prorated. If you downgrade, the change takes effect on your next billing date.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel anytime with no penalty or hidden fees. Return any active rentals and your subscription won\'t renew on the next billing cycle.',
  },
  {
    q: 'What happens if I need to pause my membership?',
    a: 'You can pause for up to 3 months. Your membership stays active, but rentals are frozen. Restart anytime within the pause period.',
  },
  {
    q: 'Do I have to contribute bags to use The Handoffs?',
    a: 'No! Contributing is completely optional. Many members just rent and never contribute.',
  },
  {
    q: 'How do I start contributing bags?',
    a: 'Upload the required details and our team will assess fit. Once accepted, you\'ll be provided a shipping label to send your bag in for authentication and entrance into the collection.',
  },
  {
    q: 'What if my earnings exceed my membership cost?',
    a: 'Great question! Your credits apply monthly. If you earn more than your membership fee, the extra credits roll into the next month or can offset future membership periods.',
  },
  {
    q: 'What if I want more than the included bags?',
    a: 'Upgrade to Premium for access to 2 bags at a time.',
  },
];

export default function MembershipPage() {
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
            Choose Your Membership
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Two flexible plans designed for different styles. Both include unlimited swaps, full insurance, free shipping, and the ability to earn from your own bags. No hidden fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border-2 p-10 flex flex-col transition-all ${
                plan.highlight
                  ? 'border-[#7B5EA7] bg-white shadow-lg scale-105 lg:scale-100'
                  : 'border-gray-100 bg-white'
              }`}
            >
              {plan.highlight && (
                <span className="self-start text-xs font-bold text-[#7B5EA7] bg-purple-50 border border-[#7B5EA7] px-4 py-1.5 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h2 className="text-3xl font-bold text-[#2D2040] mb-2">{plan.name}</h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{plan.description}</p>

              <div className="mb-8">
                <p className="text-5xl font-bold text-[#2D2040]">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-400">{plan.period}</span>
                </p>
                <p className="text-sm text-[#7B5EA7] font-semibold mt-2">{plan.bagCount}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-[#7B5EA7] font-bold mt-0.5 shrink-0">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/apply"
                className={`block w-full text-center font-semibold py-4 rounded-2xl transition-colors text-base ${
                  plan.highlight
                    ? 'bg-[#7B5EA7] hover:bg-[#6a4f93] text-white'
                    : 'border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50'
                }`}
              >
                {plan.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#2D2040] mb-10 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#7B5EA7]">
                  <th className="text-left p-4 font-bold text-[#2D2040]">Feature</th>
                  <th className="text-center p-4 font-bold text-[#2D2040]">Standard</th>
                  <th className="text-center p-4 font-bold text-[#2D2040]">Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-[#F8F6FB] transition-colors">
                    <td className="p-4 font-semibold text-[#2D2040] text-sm">{row.feature}</td>
                    <td className="text-center p-4 text-sm text-gray-600">{row.standard}</td>
                    <td className="text-center p-4 text-sm text-[#7B5EA7] font-semibold">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Every Plan Includes */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#2D2040] mb-3">Every Membership Includes</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Whether you choose Standard or Premium, you get access to the same core benefits.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {EVERY_PLAN_INCLUDES.map(({ title, description }) => (
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

      {/* The Earning Side */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">The Earning Side</h2>
            <p className="text-[#B0A8C8] max-w-lg mx-auto">
              Contribute bags to offset your membership. It's optional, but powerful.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {EARNING_EXPLAINED.map(({ title, description }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-sm text-[#B0A8C8] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
            <p className="text-[#B0A8C8] text-sm mb-2">Example Scenario:</p>
            <p className="text-xl font-bold text-white">
              Contribute 2 bags → Earn <span className="text-[#7B5EA7]">$120/month</span> → Pay only <span className="text-[#7B5EA7]">$109/month</span> for Premium
            </p>
          </div>
        </div>
      </section>


      {/* Cancellation & Flexibility */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#2D2040] mb-10 text-center">
            No Hidden Terms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-bold text-[#2D2040] mb-3">Cancel Anytime</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                No long-term contracts. Cancel your membership whenever you want. No penalties or hidden fees.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛑</div>
              <h3 className="text-lg font-bold text-[#2D2040] mb-3">Pause Option</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Need a break? Pause your membership for up to 3 months. Restart anytime without losing your place.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-[#2D2040] mb-3">No Hidden Costs</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your monthly fee is all you pay. Shipping, returns, insurance — all included. No surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-[#2D2040] mb-12 text-center">Membership Questions</h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="bg-white rounded-lg border border-gray-100 p-6 group">
              <summary className="cursor-pointer font-semibold text-[#2D2040] flex items-center justify-between">
                {item.q}
                <span className="ml-3 transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Upgrade Your Wardrobe?
          </h2>
          <p className="text-[#B0A8C8] mb-10 text-lg">
            Choose your plan and join thousands of luxury bag enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl transition-colors"
            >
              Start Your Membership
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

      {/* Related Links */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-500 mb-6 font-semibold">Explore more:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/how-it-works" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              How It Works →
            </Link>
            <Link href="/for-bag-owners" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              For Bag Owners →
            </Link>
            <Link href="/faq" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              FAQ →
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
