export default async function sitemap() {
  const baseUrl = 'https://thehandoffs.com';

  const brands = [
    'balenciaga',
    'bottega-veneta',
    'burberry',
    'celine',
    'chanel',
    'chloe',
    'christian-louboutin',
    'coach',
    'dior',
    'dolce-gabbana',
    'fendi',
    'ferragamo',
    'givenchy',
    'goyard',
    'gucci',
    'hermes',
    'loewe',
    'louis-vuitton',
    'mcm',
    'prada',
    'saint-laurent',
    'valentino',
  ];

  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/for-bag-owners`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/membership`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const brandPages = brands.map((brand) => ({
    url: `${baseUrl}/collection/${brand}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...brandPages];
}
