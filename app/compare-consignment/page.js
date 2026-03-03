export const metadata = {
  title: 'Best Place to Consign a Luxury Handbag (2026 Comparison)',
  description: 'Compare luxury handbag consignment options side-by-side. The Handoffs vs The RealReal vs Rebag vs Fashionphile. See commission rates, total payouts, and use our earnings calculator.',
  keywords: 'best place to consign luxury handbag, luxury bag consignment comparison, The RealReal vs Fashionphile, sell designer bag comparison, consignment commission rates, best consignment for Chanel',
  openGraph: {
    title: 'Luxury Handbag Consignment Comparison (2026) | The Handoffs',
    description: 'The complete side-by-side comparison of consignment options for luxury bags. Calculator included.',
    type: 'website',
  },
};

import { CompareConsignmentContent } from './page-client';

const FAQ_ITEMS = [
  {
    q: 'Why is The Handoffs commission so much lower?',
    a: 'Because we earn revenue from rental memberships, not just sales commissions. Our business model doesn\'t depend on taking a huge cut from sellers. We only charge 15% on completed sales.',
  },
  {
    q: 'Is The Handoffs really consignment?',
    a: 'It\'s better than consignment. Traditional consignment means your bag sits in a warehouse earning nothing until it sells. With The Handoffs, your bag is actively rented, earning you $50/month cash while it waits for a buyer. When it sells, you keep 85%.',
  },
  {
    q: 'How does rental income work for consigners?',
    a: 'Non-members earn $50/month cash (prorated to the day) while their bag is actively rented. Payouts are transferred to your bank via Stripe Connect after each rental completes. Members earn $60/month in credits while their bag is in the pool.',
  },
  {
    q: 'What if my bag doesn\'t sell?',
    a: 'No problem — your bag keeps earning rental income. There\'s no listing fee, no time limit, and no penalty. You can also adjust your price anytime or recall your bag whenever you want.',
  },
  {
    q: 'Can I list on The Handoffs and other platforms at the same time?',
    a: 'Your bag needs to be physically with us to be in our rental pool and listed for sale. You can\'t list the same bag on multiple platforms simultaneously. But since you\'re earning rental income while waiting, the opportunity cost is offset.',
  },
  {
    q: 'How does this compare to selling on eBay or Poshmark?',
    a: 'eBay charges ~13% in fees and Poshmark takes 20%. Neither pays you income while waiting for a buyer, and neither authenticates bags. The Handoffs charges 15%, pays rental income, and handles authentication, insurance, shipping, and returns.',
  },
];

export default function CompareConsignmentPage() {
  return (
    <>
      <CompareConsignmentContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map(item => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          }),
        }}
      />
    </>
  );
}
