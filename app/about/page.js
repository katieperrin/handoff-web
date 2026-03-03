import Link from 'next/link';

export const metadata = {
  title: 'About The Handoffs | Luxury Bag Rental Membership',
  description: 'The Handoffs is a members-only luxury handbag rental club. Rent authenticated designer bags, earn from the ones you own, or buy through Try Before You Buy.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F6FB] text-[#2D2040]">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-none">
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
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-4">
          About Us
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2D2040] leading-tight mb-6">
          Luxury bags should be<br />experienced, not hoarded.
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          The Handoffs is a members-only rental club for authenticated luxury handbags.
          We connect people who love bags with the bags they love — without the five-figure price tag.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold text-[#7B5EA7] uppercase tracking-widest mb-3">Our mission</p>
            <h2 className="text-3xl font-bold text-[#2D2040] leading-tight mb-5">
              Make luxury accessible and sustainable.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              We started The Handoffs because we saw a disconnect: millions of luxury bags sitting unused in closets while millions of people wished they could carry one. Our answer is a two-sided marketplace where members rent from a shared pool of authenticated designer bags — and owners earn from the bags they already have.
            </p>
            <p className="text-gray-500 leading-relaxed">
              The result? More access, less waste, and a community built around the love of luxury — not the burden of ownership.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: '22+', label: 'luxury brands in our collection' },
              { stat: '$0', label: 'authentication fee for contributors' },
              { stat: '100%', label: 'authenticated, every bag' },
              { stat: '2', label: 'flexible membership plans' },
            ].map(({ stat, label }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <p className="text-3xl font-bold text-[#7B5EA7] mb-1">{stat}</p>
                <p className="text-xs text-gray-400 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#2D2040] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-[#C4B5E8] uppercase tracking-widest mb-2">What we stand for</p>
            <h2 className="text-3xl font-bold text-white">Access. Earn. Sustain.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {[
              {
                label: 'Access',
                headline: 'Designer bags. Not a designer salary.',
                body: "Luxury fashion has always been gatekept by price. We think the experience of carrying a Chanel or Hermès shouldn't require owning one. A flat monthly membership gets you in.",
              },
              {
                label: 'Earn',
                headline: 'Your closet is an untapped asset.',
                body: "The average luxury bag sits unused for most of its life. The Handoffs puts it to work. Members earn $60/month in credits while their bag is in the pool. Non-members earn $50/month cash while it's rented.",
              },
              {
                label: 'Sustain',
                headline: 'Circulation over consumption.',
                body: "Every bag rented is a bag not bought. We believe the bags already in the world are enough — they just need to keep moving.",
              },
            ].map(({ label, headline, body }) => (
              <div key={label} className="bg-[#2D2040] p-8 sm:p-10">
                <p className="text-xs font-bold text-[#C4B5E8] uppercase tracking-widest mb-4">{label}</p>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{headline}</h3>
                <p className="text-sm text-[#B0A8C8] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-2">How it works</p>
            <h2 className="text-3xl font-bold text-[#2D2040]">A club, not a store.</h2>
            <p className="text-gray-400 mt-2 text-sm max-w-lg mx-auto">
              The Handoffs is a two-sided marketplace. Members rent bags, and owners earn from them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-[#F8F6FB] rounded-2xl p-7">
              <p className="text-xs font-bold text-[#7B5EA7] uppercase tracking-widest mb-4">For renters</p>
              <ul className="space-y-3">
                {[
                  'Choose Standard ($149/mo) or Premium ($229/mo)',
                  'Browse the full catalog of authenticated bags',
                  'Request any available bag — shipped to your door',
                  'Keep it as long as you want, then swap',
                  'Love it? Buy it through Try Before You Buy',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#7B5EA7] font-bold mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#F8F6FB] rounded-2xl p-7">
              <p className="text-xs font-bold text-[#7B5EA7] uppercase tracking-widest mb-4">For bag owners</p>
              <ul className="space-y-3">
                {[
                  'Submit your bag — we authenticate for free',
                  'Members earn $60/mo in credits while it\'s pooled',
                  'Non-members earn $50/mo cash while it\'s rented',
                  'Optionally list it for sale at your price',
                  'Recall your bag anytime',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#7B5EA7] font-bold mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & authentication */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-2">Trust & quality</p>
          <h2 className="text-3xl font-bold text-[#2D2040]">Every bag, authenticated.</h2>
          <p className="text-gray-400 mt-2 text-sm max-w-lg mx-auto">
            We take authenticity and care seriously so you never have to worry.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              title: 'Expert Authentication',
              body: 'Every bag undergoes rigorous multi-point inspection before entering the pool. No exceptions.',
            },
            {
              title: 'White-Glove Care',
              body: 'We handle all shipping, returns, cleaning, and professional maintenance between rentals.',
            },
            {
              title: 'Full Protection',
              body: 'Bags are insured in transit and during rentals. Owners and renters are both covered.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 p-7">
              <h3 className="text-base font-bold text-[#2D2040] mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-[#7B5EA7] rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to join the club?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Start renting luxury bags, earn from the ones you own, or both. Membership starts at $149/month.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-white text-[#7B5EA7] font-semibold px-8 py-4 rounded-2xl text-base transition-colors hover:bg-gray-50"
            >
              Apply for membership
            </Link>
            <Link
              href="/collection"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              Browse the collection
            </Link>
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
              <p className="text-xs text-gray-400 leading-relaxed">Luxury handbag rental club. Rent authenticated designer bags, earn from the ones you own, or buy through Try Before You Buy.</p>
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
            <p className="text-xs text-gray-300">&copy; {new Date().getFullYear()} The Handoffs. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
