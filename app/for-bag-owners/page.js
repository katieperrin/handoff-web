export const metadata = {
  title: 'Earn Money From Your Designer Bags | Rent, Sell, or Both — The Handoffs',
  description: 'Three ways to earn from your luxury bags: $60/month credits (members), $50/month cash (consigners), or sell with 90% payout via Try Before You Buy. Free authentication, full insurance.',
  keywords: 'earn money from designer bags, rent out luxury handbag, sell designer bag, luxury bag consignment, passive income designer bags, bag rental for owners, Try Before You Buy luxury bag',
  openGraph: {
    title: 'Earn Money From Your Designer Bags | The Handoffs',
    description: 'Turn your closet into income. Earn monthly rental income, sell with 90% payout, or both. Free authentication & full insurance.',
    type: 'website',
  },
};

import { BagOwnersPageContent } from './page-client';

const FAQ_ITEMS = [
  {
    q: 'How much can I earn from my luxury bag?',
    a: 'It depends on your track. Active members earn $60/month in credits while their bag is in the pool ($720/year if available all year). Non-members (consigners) earn $50/month cash while their bag is actively rented, prorated and paid directly to your bank account via Stripe. You can also list your bag for sale — if a renter buys it, you receive 90% of the sale price.',
  },
  {
    q: 'How do earnings work?',
    a: 'For members, credits accumulate monthly and apply directly to your membership fee. For consigners, cash payouts are transferred to your connected bank account after each rental completes. If your bag sells through Try Before You Buy, the payout (90% of sale price) is deposited within a few business days.',
  },
  {
    q: 'Can I earn from multiple bags?',
    a: 'Yes! Each bag earns independently. Members with multiple bags can stack credits. Consigners earn cash per rental on each bag.',
  },
  {
    q: 'What condition does my bag need to be in?',
    a: 'Your bag should be in gently used condition — no major flaws, tears, or staining. We accept some minor wear (scratches, slight color fading) which is normal for luxury goods. Bags must be authentic and fully functional.',
  },
  {
    q: 'Is my bag insured while being rented?',
    a: 'Yes. Every contributed bag is fully insured while in our pool and during rentals. We cover accidental damage from normal use. If a renter damages your bag, insurance covers it.',
  },
  {
    q: 'Can I get my bag back anytime?',
    a: 'Absolutely. Recall your bag at any time, no questions asked. If it\'s currently being rented, we retrieve it from the renter and ship it back to you within 14 business days.',
  },
  {
    q: 'Do I need to be a member to contribute?',
    a: 'No! Anyone can contribute bags. Members earn $60/month in credits while their bag is in the pool. Non-members earn $50/month cash while their bag is actively rented — you just need to connect a bank account via Stripe for payouts.',
  },
  {
    q: 'Can I list my bag for sale?',
    a: 'Yes. When you submit your bag, you can toggle "List for Sale" and set your asking price. Our team may also suggest a market value after inspection. Renters see the sale price and can purchase the bag during their rental.',
  },
  {
    q: 'How does Try Before You Buy work?',
    a: 'When a renter has your for-sale bag, they can choose to buy it instead of returning it. They pay the listed price, you receive 90%, and we keep a 10% commission. No return needed — the bag is theirs.',
  },
  {
    q: 'Can I earn rental income AND list for sale at the same time?',
    a: 'Absolutely. Your bag earns rental income (credits or cash) while it\'s in the pool. If a renter decides to buy it, the sale completes and you receive your 90% payout. You earn from both rentals and the eventual sale.',
  },
  {
    q: 'How does this compare to The RealReal or Fashionphile?',
    a: 'The RealReal takes 30-50% commission and you earn nothing while your bag waits to sell. Fashionphile offers ~60-70% buyout with no waiting income. The Handoffs charges only 10% commission, pays you rental income while waiting, and lets you set your own price. You keep 90% when it sells.',
  },
  {
    q: 'How do I ship my bag to you?',
    a: 'We email you a prepaid shipping label. You pack your bag securely and ship it to our authentication facility.',
  },
];

export default function BagOwnersPage() {
  return (
    <>
      <BagOwnersPageContent />
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
