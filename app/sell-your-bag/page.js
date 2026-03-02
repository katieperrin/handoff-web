export const metadata = {
  title: 'Sell Your Designer Bag | Earn While You Wait',
  description: 'Sell your luxury handbag and earn $50/month rental income while waiting for a buyer. Only 10% commission vs 30-50% at The RealReal. You set the price. 90% payout.',
  keywords: 'sell designer bag, consign luxury handbag, where to sell designer bags, sell Chanel bag, sell Louis Vuitton, luxury bag consignment, best place to sell designer bag',
  openGraph: {
    title: 'Sell Your Designer Bag | Earn While You Wait — The Handoffs',
    description: 'The only consignment service that pays you monthly rental income while your bag waits to sell. 90% payout. You set the price.',
    type: 'website',
  },
};

import { SellYourBagContent } from './page-client';

const FAQ_ITEMS = [
  {
    q: 'How do I list my bag for sale?',
    a: 'Submit your bag through our contributor portal with photos and details. Toggle "List for Sale" and set your asking price. We\'ll authenticate it for free, and it joins our rental pool with a visible sale price.',
  },
  {
    q: 'How does Try Before You Buy work?',
    a: 'When a member rents your bag and it\'s listed for sale, they see the price. If they love it, they can purchase it outright. You receive 90% of the sale price, we keep 10%. The renter keeps the bag — no return needed.',
  },
  {
    q: 'When do I get paid?',
    a: 'Rental income ($50/month prorated) is paid via Stripe after each rental completes. Sale payouts (90% of sale price) are transferred to your Stripe Connect account within a few business days of the purchase.',
  },
  {
    q: 'Can I change my asking price?',
    a: 'Yes, anytime. Update your sale price through the app. Our team may suggest a market value after inspection, but you always have final say.',
  },
  {
    q: 'What if my bag doesn\'t sell?',
    a: 'No problem — your bag keeps earning rental income while it\'s in the pool. There\'s no listing fee, no time limit, and no pressure. Recall it whenever you want.',
  },
  {
    q: 'Do I still earn rental income if my bag is listed for sale?',
    a: 'Yes! Your bag earns $50/month cash while it\'s actively rented, regardless of whether it\'s listed for sale. You earn from both rentals and the eventual sale.',
  },
  {
    q: 'What\'s the 10% commission?',
    a: 'When your bag sells through Try Before You Buy, we keep 10% of the sale price as commission. You receive 90%. Compare that to The RealReal\'s 30-50% or Fashionphile\'s ~35% effective cut.',
  },
  {
    q: 'Do I need to be a member to sell my bag?',
    a: 'No. Anyone can list bags for sale and earn rental income. Non-members earn $50/month cash while their bag is rented. Members earn $60/month in credits while their bag is in the pool. Both can list for sale with 90% payout.',
  },
];

export default function SellYourBagPage() {
  return (
    <>
      <SellYourBagContent />
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
