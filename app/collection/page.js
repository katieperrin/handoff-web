import Link from 'next/link';
import { getAllBrands } from '@/lib/brands';

export const metadata = {
  title: 'Rent Designer Handbags | The Handoffs — Luxury Bag Rental Collection',
  description: 'Rent authenticated luxury designer handbags from brands like Chanel, Hermès, Louis Vuitton, and more. Explore our designer bag subscription service and access premium luxury bags without the investment.',
  keywords: 'rent designer handbag, luxury bag rental, designer bag subscription, authenticated luxury bags, rent Chanel, rent Hermès, rent Louis Vuitton'
};

export default function CollectionPage() {
  const brands = getAllBrands();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F6FB' }}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 border-b" style={{ borderColor: '#E8E4F0', backgroundColor: '#F8F6FB' }}>
        <Link href="/" className="text-2xl font-bold tracking-tight" style={{ color: '#7B5EA7' }}>
          The<span style={{ color: '#2D2040' }}>/Handoffs</span>
        </Link>
        <div className="flex gap-6">
          <Link href="/auth/signin" className="text-sm font-medium" style={{ color: '#2D2040' }}>
            Sign In
          </Link>
          <Link href="/auth/signup" className="text-sm font-semibold px-4 py-2 rounded" style={{ backgroundColor: '#7B5EA7', color: 'white' }}>
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 sm:py-24 max-w-6xl mx-auto">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: '#7B5EA7', color: 'white' }}>
          Coming Soon
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#2D2040' }}>
          Rent Authenticated Luxury Handbags
        </h1>
        <p className="text-lg" style={{ color: '#6B5D7A' }}>
          Authenticated bags from Chanel, Hermès, Louis Vuitton, and more. Browse what's coming to the collection.
        </p>
      </section>

      {/* Brands Grid */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12" style={{ color: '#2D2040' }}>
          Explore Our Designer Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/collection/${brand.slug}`}>
              <div
                className="p-6 rounded-lg text-center transition-all hover:shadow-lg cursor-pointer"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #E8E4F0',
                  hover: { transform: 'translateY(-2px)' }
                }}
              >
                <h3 className="text-lg font-semibold" style={{ color: '#2D2040' }}>
                  {brand.name}
                </h3>
                <p className="text-sm mt-3 line-clamp-2" style={{ color: '#6B5D7A' }}>
                  {brand.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center mb-16">
        <div
          className="p-12 rounded-lg"
          style={{ backgroundColor: '#7B5EA7' }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Rent Luxury?
          </h2>
          <p className="text-white text-lg mb-8 opacity-95">
            Join The Handoffs membership and gain instant access to our entire collection of authenticated designer handbags.
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-3 rounded font-semibold transition-all"
            style={{
              backgroundColor: 'white',
              color: '#7B5EA7'
            }}
          >
            Apply for Early Access
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
