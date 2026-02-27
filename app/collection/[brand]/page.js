import { getBrandBySlug, getAllBrandSlugs, getAllBrands } from '@/lib/brands';
import BrandPageClient from './brand-page-client';

export async function generateStaticParams() {
  const slugs = getAllBrandSlugs();
  return slugs.map((slug) => ({
    brand: slug
  }));
}

export async function generateMetadata({ params }) {
  const { brand: brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);

  if (!brand) {
    return {
      title: 'Brand Not Found | The Handoffs',
      description: 'The brand you are looking for could not be found.'
    };
  }

  return {
    title: `Rent ${brand.name} Bags | The Handoffs — Luxury Bag Rental`,
    description: `${brand.shortDescription} Rent authentic ${brand.name} designer handbags as part of The Handoffs luxury bag subscription. Access iconic styles like ${brand.iconic_bags.join(', ')} and more.`,
    keywords: `rent ${brand.name.toLowerCase()} bags, ${brand.name.toLowerCase()} handbags, ${brand.name.toLowerCase()} designer bags, luxury bag rental, designer bag subscription`
  };
}

export default async function BrandPage({ params }) {
  const { brand: brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  const allBrands = getAllBrands();

  return <BrandPageClient brand={brand} allBrands={allBrands} params={{ brand: brandSlug }} />;
}
