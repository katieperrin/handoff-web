export const metadata = {
  title: 'How Luxury Bag Rental Works | The Handoffs',
  description: 'Detailed step-by-step guide to how The Handoffs works for renters and bag owners. From browsing to earning, learn the complete process.',
  keywords: 'how luxury bag rental works, how designer bag rental works, authenticate bags, bag rental process',
  openGraph: {
    title: 'How Luxury Bag Rental Works | The Handoffs',
    description: 'Step-by-step guide to renting luxury bags and earning from your collection.',
    type: 'website',
  },
};

import Link from 'next/link';

const RENTER_STEPS = [
  {
    step: '01',
    title: 'Choose Your Membership',
    description: 'Pick Standard ($149/mo) for 1 bag at a time, or Premium ($229/mo) for 2 bags. Access the full collection immediately.',
    details: ['Browse 200+ authenticated luxury bags', 'No hidden fees or time limits', 'Cancel anytime'],
  },
  {
    step: '02',
    title: 'Request a Bag',
    description: 'Browse the collection and request any available bag. See high-res photos, condition details, and full descriptions.',
    details: ['View condition, size, and details', 'Request in seconds', 'Real-time availability'],
  },
  {
    step: '03',
    title: 'We Ship It to You',
    description: 'We carefully pack and ship your bag to your door with tracking. Free insured shipping included in your membership.',
    details: ['Ships within 1-2 business days', 'Arrives in 3-5 days', 'Fully insured in transit'],
  },
  {
    step: '04',
    title: 'Wear, Enjoy, Keep It',
    description: 'Carry your bag as long as you want. There\'s no rental period limit. Enjoy knowing you own the insurance and depreciation risk.',
    details: ['No time limit', 'Normal wear is covered', 'Swap anytime you\'re ready'],
  },
  {
    step: '05',
    title: 'Return & Request Another',
    description: 'When you\'re ready, drop the bag at any carrier using our prepaid label. Once we receive and inspect it, you\'re clear to request your next bag.',
    details: ['Prepaid return shipping', 'Request your next bag after inspection'],
  },
];

const OWNER_STEPS = [
  {
    step: '01',
    title: 'Submit Your Bag',
    description: 'List your designer bag through our contributor portal. Include brand, model, condition, and purchase year. Upload clear photos.',
    details: [],
  },
  {
    step: '02',
    title: 'We Review Your Submission',
    description: 'Our team reviews your submission and lets you know if it\'s a fit for the pool. If accepted, we\'ll send you a prepaid shipping label to send your bag in for authentication, inspection, and preparation for the rental pool.',
    details: [],
  },
  {
    step: '03',
    title: 'We Authenticate',
    description: 'Our authentication experts examine every detail using industry protocols. Material, stitching, hardware, holograms, date codes.',
    details: ['Expert verification', 'Professional intake photos', 'Completely free service'],
  },
  {
    step: '04',
    title: 'Bag Joins the Pool',
    description: 'Once verified, your bag becomes available to rent. Members can request it anytime. You stay in full control.',
    details: ['Listed in our collection', 'Members can rent it', 'You set conditions (recall anytime)'],
  },
  {
    step: '05',
    title: 'Inspected Between Every Renter',
    description: 'Each time your bag is returned, our team conducts a detailed inspection and re-authentication before it goes to the next member. We verify condition, clean it if needed, and confirm it still meets our standards.',
    details: ['Full re-authentication', 'Condition documented with photos', 'Cleaned and prepared for next rental'],
  },
  {
    step: '06',
    title: 'Earn Credits',
    description: 'Earn $60 in credits per 30-day cycle. Credits are added monthly and apply directly to your membership.',
    details: ['$720/year per bag', 'Credited monthly'],
  },
  {
    step: '07',
    title: 'Recall Anytime',
    description: 'Change your mind? Recall your bag whenever you want. We retrieve it from the renter, re-authenticate it, and ship it back to you.',
    details: ['No penalties', 'No questions asked', 'Usually within 14 business days'],
  },
];

const MEMBERSHIP_BENEFITS = [
  { title: 'Access', description: '200+ authenticated luxury bags from premium brands' },
  { title: 'Swap Unlimited', description: 'Keep bags as long as you want, swap anytime' },
  { title: 'Free Shipping', description: 'Insured shipping both ways included' },
  { title: 'Full Insurance', description: 'Covered for accidental damage during rentals' },
  { title: 'No Time Limits', description: 'Keep a bag for a day, week, month, or longer' },
  { title: 'Contribute & Earn', description: 'Optional: contribute bags for passive income' },
];

const AUTHENTICATION_PROCESS = [
  {
    step: 'Material & Construction',
    description: 'We verify the materials are authentic and the construction matches luxury brand standards. Fake materials and poor stitching are immediate red flags.',
  },
  {
    step: 'Serial Numbers & Codes',
    description: 'Each luxury bag has unique identifiers. We verify date codes, serial numbers, and holograms match the brand\'s production records.',
  },
  {
    step: 'Hardware & Details',
    description: 'We examine zippers, clasps, logos, and embossing. Counterfeits often have slightly off hardware or poor detailing.',
  },
  {
    step: 'Provenance Check',
    description: 'For bags submitted by owners, we discuss purchase history. Bags from authorized retailers or with receipts are priority.',
  },
  {
    step: 'Professional Photography',
    description: 'Authenticated bags are photographed in studio lighting from multiple angles so renters see exactly what they\'re getting.',
  },
];

const SHIPPING_DETAILS = [
  { phase: 'Before You Receive', details: 'Bags are carefully packaged in archival-quality materials. We include a branded dust bag, care card, and tracking number.' },
  { phase: 'After You Wear', details: 'Return in the condition you received it (normal wear is fine). Pack securely and drop at any carrier using our prepaid label.' },
  { phase: 'Back at Our Facility', details: 'Bags are inspected, cleaned if needed, photographed, and listed for the next member within 2-3 days.' },
];

export default function HowItWorksPage() {
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
            How The Handoffs Works
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Whether you're a renter or owner, our process is straightforward and transparent. See how luxury bag rental works from start to finish.
          </p>
        </div>
      </section>

      {/* For Renters */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">For Renters</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Start your membership and access luxury bags in five simple steps.
            </p>
          </div>
          <div className="space-y-6">
            {RENTER_STEPS.map(({ step, title, description, details }) => (
              <div key={step} className="bg-[#F8F6FB] rounded-2xl p-8 sm:p-10 border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <span className="text-5xl font-bold text-[#EDE8F7]">{step}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-[#2D2040] mb-2">{title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
                    <ul className="space-y-2">
                      {details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3 text-sm text-gray-600">
                          <span className="text-[#7B5EA7] font-bold mt-0.5 shrink-0">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Bag Owners */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">For Bag Owners</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Turn your closet into income. Contribute your bags and earn passive income.
          </p>
        </div>
        <div className="space-y-6">
          {OWNER_STEPS.map(({ step, title, description, details }) => (
            <div key={step} className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <span className="text-5xl font-bold text-[#EDE8F7]">{step}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-[#2D2040] mb-2">{title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
                  <ul className="space-y-2">
                    {details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="text-[#7B5EA7] font-bold mt-0.5 shrink-0">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included in Membership */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">What's Included</h2>
            <p className="text-[#B0A8C8] max-w-lg mx-auto">
              Every membership includes these benefits, whether you rent, contribute, or both.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEMBERSHIP_BENEFITS.map(({ title, description }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#B0A8C8] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication & Quality */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">Authentication & Quality</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Every bag in our collection is authenticated using industry-standard protocols.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          {AUTHENTICATION_PROCESS.map(({ step, description }) => (
            <div key={step} className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-[#2D2040] mb-3">{step}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#F8F6FB] rounded-2xl p-10 border border-gray-100 text-center">
          <p className="text-gray-600 mb-2">
            <strong>Our Guarantee:</strong> We only accept bags we're 100% confident are authentic. If a bag doesn't meet our standards, it doesn't join the collection.
          </p>
        </div>
      </section>

      {/* Shipping & Returns */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">Shipping & Returns</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              We handle all the logistics so you can focus on enjoying bags.
            </p>
          </div>
          <div className="space-y-6">
            {SHIPPING_DETAILS.map(({ phase, details }) => (
              <div key={phase} className="bg-[#F8F6FB] rounded-2xl p-8">
                <h3 className="text-lg font-bold text-[#2D2040] mb-3">{phase}</h3>
                <p className="text-gray-600 leading-relaxed">{details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2040] mb-3">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Two membership tiers. No hidden fees. Cancel anytime.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-[#2D2040] mb-2">Standard</h3>
            <p className="text-4xl font-bold text-[#7B5EA7] mb-6">
              $149<span className="text-sm font-normal text-gray-400">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                1 bag at a time
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                No rental time limit
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                Full catalog access
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                Free shipping & returns
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                Full insurance coverage
              </li>
            </ul>
            <Link
              href="/apply"
              className="block w-full text-center border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#7B5EA7] p-8 relative">
            <span className="absolute top-4 right-4 bg-[#7B5EA7] text-white text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </span>
            <h3 className="text-2xl font-bold text-[#2D2040] mb-2">Premium</h3>
            <p className="text-4xl font-bold text-[#7B5EA7] mb-6">
              $229<span className="text-sm font-normal text-gray-400">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                2 bags at a time
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                No rental time limit
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                Full catalog access
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                Free shipping & returns
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-[#7B5EA7] font-bold">✓</span>
                Full insurance coverage
              </li>
            </ul>
            <Link
              href="/apply"
              className="block w-full text-center bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Experience The Handoffs?
          </h2>
          <p className="text-[#B0A8C8] mb-10 text-lg">
            Join thousands of members who rent luxury bags and earn from the ones they own.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl transition-colors"
            >
              Start Your Membership
            </Link>
            <Link
              href="/faq"
              className="w-full sm:w-auto border-2 border-[#7B5EA7] text-[#7B5EA7] hover:bg-purple-50 font-semibold px-8 py-4 rounded-2xl transition-colors"
            >
              See FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-500 mb-6 font-semibold">Explore more:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/for-bag-owners" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              For Bag Owners →
            </Link>
            <Link href="/membership" className="text-[#7B5EA7] hover:underline font-semibold text-sm">
              Membership Plans →
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
