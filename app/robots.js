export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/browse',
          '/saved',
          '/rental',
          '/contribute',
          '/profile',
          '/login',
          '/signup',
          '/subscribe',
          '/api',
          '/*.json',
          '/*?*sort=',
          '/*?*filter=',
        ],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: 'https://thehandoffs.com/sitemap.xml',
  };
}
