export const metadata = {
  title: 'Luxury Bag Rental FAQ | The Handoffs',
  description: 'Answers to frequently asked questions about luxury bag rental, membership, authentication, insurance, and earning from your designer bags.',
  keywords: 'luxury bag rental FAQ, how does bag rental work, is renting designer bags worth it, bag rental cost, damaged bag rental',
  openGraph: {
    title: 'Luxury Bag Rental FAQ | The Handoffs',
    description: 'Get answers to your questions about luxury bag rental, membership, and earnings.',
    type: 'website',
  },
};

import { FAQPageContent } from './page-client';

const FAQ_CATEGORIES = [
  {
    name: 'Renting',
    questions: [
      {
        q: 'How does luxury bag rental work?',
        a: 'Browse our collection of authenticated luxury handbags, request the one you want, and we ship it to your door with a prepaid return label. Keep it as long as you like. When you\'re ready, return it and request your next bag. It\'s that simple.',
      },
      {
        q: 'Is renting a designer bag worth it?',
        a: 'Yes, if you love luxury bags but don\'t want to commit $2,000+ to ownership. Renting lets you wear different bags without the investment. You\'ll pay $149–$229/month for unlimited access to designer bags. The math: a Chanel Classic Flap costs $7,000+. At $229/month, you could carry 3 different luxury bags for the price of owning one. Plus, no depreciation or insurance costs.',
      },
      {
        q: 'How much does it cost to rent a designer bag?',
        a: 'The Handoffs membership is $149/month (Standard: 1 bag at a time) or $229/month (Premium: 2 bags at a time). There are no additional fees for swapping bags or keeping them as long as you want.',
      },
      {
        q: 'What brands are available?',
        a: 'We carry bags from Chanel, Hermès, Louis Vuitton, Prada, Fendi, Dior, Celine, Bottega Veneta, Gucci, Saint Laurent, and more. Every brand in our collection meets our authentication standards.',
      },
      {
        q: 'Can I request a specific bag or brand?',
        a: 'Yes! If there\'s a bag you\'d love to see in the collection, submit a suggestion through the form in your profile. We review all requests and use them to guide what we add next.',
      },
      {
        q: 'How long can I keep a bag?',
        a: 'There\'s no time limit. Keep a bag for a day, a week, a month, or longer. When you\'re ready for something different, return it and request another one. No rush, no penalties.',
      },
      {
        q: 'What if a bag gets damaged?',
        a: 'If a bag gets damaged during your rental, we\'ll assess it and file a claim. You\'re not liable for accidental damage. However, you are responsible for damage from misuse (intentional damage, neglect).',
      },
    ],
  },
  {
    name: 'For Bag Owners',
    questions: [
      {
        q: 'How do I rent out my designer bag?',
        a: 'Submit photos and details of your bag through our contribute portal. We\'ll schedule a white-glove authentication and intake. If approved, your bag joins our rental pool. We handle everything else — shipping, insurance, returns, and member communication.',
      },
      {
        q: 'How much can I earn from my luxury bag?',
        a: 'You earn $60 in credits per 30-day cycle your bag is available to rent. That\'s $720/year per bag.',
      },
      {
        q: 'Is my bag insured while being rented?',
        a: 'Yes, absolutely. Your bags are fully insured while in our pool and during rentals. We cover accidental damage from normal use. If a renter damages your bag, our insurance covers it.',
      },
      {
        q: 'Can I get my bag back anytime?',
        a: 'Yes. Recall your bag whenever you want, no questions asked. If it\'s currently being rented, we retrieve it from the renter and ship it back to you within 14 business days.',
      },
      {
        q: 'What condition does my bag need to be in?',
        a: 'Your bag should be in gently used condition. We accept minor wear (scratches, slight color fading) which is normal for luxury goods. Unacceptable conditions: major stains, tears, broken hardware, missing straps, or significant wear. The bag must be authentic and fully functional.',
      },
    ],
  },
  {
    name: 'Membership',
    questions: [
      {
        q: 'What\'s included in the membership?',
        a: 'Your membership includes: unlimited bag access from our collection, no rental time limits, free shipping and returns, full insurance coverage, and the ability to contribute your own bags for earnings. Standard members get 1 bag at a time; Premium members get 2 bags at a time.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. Cancel anytime with no penalty or hidden fees. Return any active rentals and your subscription won\'t renew on the next billing cycle.',
      },
      {
        q: 'What\'s the difference between Standard and Premium?',
        a: 'Standard ($149/month): 1 bag at a time, unlimited swaps, no rental time limit. Premium ($229/month): 2 bags at a time, unlimited swaps, no rental time limit. Premium is ideal if you like to carry different bags regularly or want backup options.',
      },
      {
        q: 'Do I need to contribute bags to have a membership?',
        a: 'No, contributing is optional. Many members only rent and never contribute. Both renters and contributors are welcome.',
      },
      {
        q: 'How do I use my earnings as credits?',
        a: 'Earnings automatically apply to your membership account. They reduce your monthly membership fee dollar-for-dollar. For example: 1 bag earns $60/month — your Standard membership drops to $89. 2 bags earn $120/month — your Premium membership drops to $109.',
      },
    ],
  },
  {
    name: 'Trust & Authentication',
    questions: [
      {
        q: 'How are bags authenticated?',
        a: 'Every bag in our collection is authenticated using industry-standard protocols by certified experts. We examine materials, stitching, hardware, holograms, date codes, and provenance. We only accept bags we\'re 100% confident are authentic.',
      },
      {
        q: 'What happens if I receive a damaged bag?',
        a: 'If you receive a bag that\'s damaged or doesn\'t match the listing, contact us immediately. We\'ll retrieve it and send you a replacement. You\'re not responsible for pre-existing damage.',
      },
      {
        q: 'How does The Handoffs vet members?',
        a: 'All members are verified during signup. We check identity and payment information. This keeps our community safe and ensures bags are in responsible hands.',
      },
      {
        q: 'What if I\'m unhappy with a bag?',
        a: 'If a bag doesn\'t meet your expectations or the condition is worse than described, return it within 3 days for a swap. No questions asked.',
      },
    ],
  },
  {
    name: 'Shipping & Returns',
    questions: [
      {
        q: 'Who pays for shipping?',
        a: 'We do. Your membership includes free insured shipping in both directions. When you request a bag, we ship it to you for free. When you return it, we include a prepaid return label.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Most bags ship within 1–2 business days. Delivery typically takes 3–5 business days depending on your location. Rush shipping is available for additional fees.',
      },
      {
        q: 'What if my bag arrives late or goes missing?',
        a: 'All shipments are tracked and insured. If a bag is lost in transit, we file a claim immediately and send you a replacement.',
      },
      {
        q: 'How do I return a bag?',
        a: 'Return the bag in the condition you received it (normal wear is fine). Pack it securely. Use the prepaid shipping label we include. Drop it at any carrier location. That\'s it.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQPageContent />
      {/* JSON-LD FAQ Schema for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_CATEGORIES.flatMap(category =>
              category.questions.map(item => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              }))
            ),
          }),
        }}
      />
    </>
  );
}
