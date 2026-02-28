import './globals.css';

export const metadata = {
  metadataBase: new URL('https://thehandoffs.com'),
  title: {
    default: 'Luxury Handbag Rental Membership | Rent Designer Bags Monthly — The Handoffs',
    template: '%s | The Handoffs',
  },
  description: 'Borrow authenticated Chanel, Hermès, Louis Vuitton & more from $149/mo. Or earn credits by contributing your bags. Members-only luxury bag rental club.',
  keywords: [
    'luxury handbag rental',
    'designer bag rental',
    'Chanel rental',
    'Hermès rental',
    'Louis Vuitton rental',
    'luxury bag membership',
    'handbag subscription',
    'fashion rental',
    'authenticated designer bags',
    'sustainable fashion',
    'luxury fashion club',
    'designer bag subscription',
    'rent designer bags',
    'luxury bag sharing',
    'fashion circular economy',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Luxury Handbag Rental Membership | Rent Designer Bags Monthly — The Handoffs',
    description: 'Borrow authenticated Chanel, Hermès, Louis Vuitton & more from $149/mo. Or earn credits by contributing your bags. Members-only luxury bag rental club.',
    url: 'https://thehandoffs.com',
    siteName: 'The Handoffs',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Handoffs - Luxury Handbag Rental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Handbag Rental Membership | Rent Designer Bags Monthly — The Handoffs',
    description: 'Borrow authenticated Chanel, Hermès, Louis Vuitton & more from $149/mo. Or earn credits by contributing your bags.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://thehandoffs.com',
  },
  other: {
    'p:domain_verify': 'ede580ab1c4925421969146a7694e754',
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Handoffs',
    url: 'https://thehandoffs.com',
    logo: 'https://thehandoffs.com/logo.png',
    description: 'Borrow authenticated luxury handbags from our members-only rental club. Wear the bag, not the price tag.',
    sameAs: [
      'https://www.instagram.com/thehandoffs',
      'https://www.facebook.com/thehandoffs',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@thehandoffs.com',
    },
    areaServed: 'US',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
