export const metadata = {
  title: 'Rent. Earn. Buy. All in One Place. | The Handoffs',
  description: 'The only luxury bag platform that combines rental, earning, and buying. Rent it, earn from it, or sell it — no other platform does all four.',
  keywords: 'luxury bag rental, designer bag rental, rent and earn bags, try before you buy luxury bags',
  openGraph: {
    title: 'Rent. Earn. Buy. All in One Place. | The Handoffs',
    description: 'Every other service is one-way: you rent from them. The Handoffs lets you rent, earn, sell, and buy.',
    type: 'website',
  },
};

import Link from 'next/link';

const TESTIMONIAL_COMPARISON = [
  {
    aspect: 'As a Renter',
    handoffs: 'Access luxury bags at a fraction of the ownership cost. Fall in love with one? Buy it through Try Before You Buy. Plus, earn credits by contributing your own bags.',
    competitors: 'Rent luxury items from a large selection. No way to try before buying or offset costs through your own inventory.',
  },
  {
    aspect: 'As a Bag Owner',
    handoffs: 'Monetize your luxury bag collection with credits or cash. List for sale and earn 90% when a renter purchases. No membership required to consign.',
    competitors: 'Cannot contribute or earn. Your bags stay inactive in your closet. Must go to a separate consignment site to sell.',
  },
  {
    aspect: 'Value Proposition',
    handoffs: 'The only platform that combines rental, earning, and buying. Rent it, earn from it, or sell it — all in one place.',
    competitors: 'One-way rental model. Great for access, but no earning or selling potential.',
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#2D2040] text-[#2D2040]">
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

      {/* Rent. Earn. Buy. */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Rent. Earn. Buy. All in One Place.
            </h1>
            <p className="text-[#B0A8C8] max-w-2xl mx-auto">
              Every other service is one-way: you rent from them. The Handoffs lets you rent, earn, sell, and buy — no other platform does all four.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TESTIMONIAL_COMPARISON.map(({ aspect, handoffs, competitors }) => (
              <div key={aspect} className="space-y-4">
                <h2 className="text-lg font-bold text-white text-center">{aspect}</h2>
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

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white">
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
