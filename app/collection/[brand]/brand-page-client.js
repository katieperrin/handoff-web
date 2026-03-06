'use client';

import Link from 'next/link';

export default function BrandPageClient({ brand, allBrands, params }) {

  if (!brand) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F8F6FB' }}>
        <nav className="flex items-center justify-between px-6 py-6 border-b" style={{ borderColor: '#E8E4F0', backgroundColor: '#F8F6FB' }}>
          <Link href="/" className="text-2xl font-bold tracking-tight" style={{ color: '#7B5EA7' }}>
            The<span style={{ color: '#2D2040' }}>/Handoffs</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/login" className="text-sm font-medium" style={{ color: '#2D2040' }}>
              Sign In
            </Link>
            <Link href="/apply" className="text-sm font-semibold px-4 py-2 rounded" style={{ backgroundColor: '#7B5EA7', color: 'white' }}>
              Join Now
            </Link>
          </div>
        </nav>
        <div className="px-6 py-24 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#2D2040' }}>
            Brand Not Found
          </h1>
          <p className="text-lg mb-8" style={{ color: '#6B5D7A' }}>
            The brand you're looking for doesn't exist in our collection.
          </p>
          <Link href="/collection" className="inline-block px-6 py-3 rounded font-semibold" style={{ backgroundColor: '#7B5EA7', color: 'white' }}>
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F6FB' }}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 border-b" style={{ borderColor: '#E8E4F0', backgroundColor: '#F8F6FB' }}>
        <Link href="/" className="text-2xl font-bold tracking-tight" style={{ color: '#7B5EA7' }}>
          The<span style={{ color: '#2D2040' }}>/Handoffs</span>
        </Link>
        <div className="flex gap-6">
          <Link href="/login" className="text-sm font-medium" style={{ color: '#2D2040' }}>
            Sign In
          </Link>
          <Link href="/apply" className="text-sm font-semibold px-4 py-2 rounded" style={{ backgroundColor: '#7B5EA7', color: 'white' }}>
            Join Now
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="px-6 py-4 max-w-6xl mx-auto" style={{ color: '#6B5D7A' }}>
        <div className="text-sm">
          <Link href="/collection" className="hover:underline" style={{ color: '#7B5EA7' }}>
            Collection
          </Link>
          <span className="mx-2">•</span>
          <span>{brand.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-12 sm:py-16 max-w-6xl mx-auto">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: '#7B5EA7', color: 'white' }}>
          Coming Soon
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mb-8" style={{ color: '#2D2040' }}>
          Rent {brand.name} Handbags
        </h1>

        {/* Brand Description */}
        <div className="prose prose-lg max-w-3xl" style={{ color: '#4A3F5C' }}>
          <p className="text-base leading-relaxed whitespace-pre-wrap mb-6">
            {brand.longDescription}
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div
          className="p-12 rounded-lg text-center"
          style={{ backgroundColor: 'white', border: '1px solid #E8E4F0' }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D2040' }}>
            Coming Soon
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B5D7A' }}>
            We're currently curating our {brand.name} collection. Apply for early access to be the first to know when bags are available.
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-3 rounded font-semibold transition-all"
            style={{ backgroundColor: '#7B5EA7', color: 'white' }}
          >
            Apply for Early Access
          </Link>
        </div>
      </section>

      {/* Related Brands Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8" style={{ color: '#2D2040' }}>
          Explore Other Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {allBrands
            .filter((b) => b.slug !== brand.slug)
            .slice(0, 8)
            .map((otherBrand) => (
              <Link key={otherBrand.slug} href={`/collection/${otherBrand.slug}`}>
                <div
                  className="p-6 rounded-lg text-center transition-all hover:shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E8E4F0'
                  }}
                >
                  <h3 className="text-lg font-semibold" style={{ color: '#2D2040' }}>
                    {otherBrand.name}
                  </h3>
                </div>
              </Link>
            ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/collection" className="inline-block px-6 py-3 rounded font-semibold" style={{ backgroundColor: '#7B5EA7', color: 'white' }}>
            View All Brands
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center mb-16">
        <div
          className="p-12 rounded-lg"
          style={{ backgroundColor: '#7B5EA7' }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Rent {brand.name}?
          </h2>
          <p className="text-white text-lg mb-8 opacity-95">
            Join The Handoffs and gain access to our entire collection of authenticated luxury bags.
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-3 rounded font-semibold transition-all"
            style={{
              backgroundColor: 'white',
              color: '#7B5EA7'
            }}
          >
            Start your membership
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: '#E8E4F0', backgroundColor: 'white' }}>
        <div className="px-6 py-12 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#2D2040' }}>
              The Handoffs
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: '#6B5D7A' }}>
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/collection" className="hover:underline">Collection</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#2D2040' }}>
              Support
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: '#6B5D7A' }}>
              <li><Link href="/help" className="hover:underline">Help Center</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#2D2040' }}>
              Legal
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: '#6B5D7A' }}>
              <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#2D2040' }}>
              Follow
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: '#6B5D7A' }}>
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t px-6 py-6 text-center text-sm" style={{ borderColor: '#E8E4F0', color: '#6B5D7A' }}>
          <p>&copy; 2024 The Handoffs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
