import Link from 'next/link';

export const metadata = {
  title: 'Before You Consign That Bag, Consider This | The Handoffs',
  description: 'Your luxury handbag is worth more than a one-time payout. Here\'s why renting it out earns you more — with less risk — than selling it on consignment.',
  keywords: 'consign designer bag, sell luxury handbag, luxury bag consignment alternative, rent out designer bag, earn money from luxury bag, The RealReal alternative',
  openGraph: {
    title: 'Before You Consign That Bag, Consider This',
    description: 'Your luxury handbag is worth more than a one-time payout. Here\'s why renting it out earns you more — with less risk — than selling it on consignment.',
    type: 'article',
  },
};

export default function BeforeYouConsignPost() {
  return (
    <div className="min-h-screen bg-[#F8F6FB] text-[#2D2040]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-none hover:opacity-70 transition-opacity">
            <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
            <span className="text-lg font-bold text-[#2D2040]">Handoffs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-500 hover:text-[#2D2040] transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/apply"
              className="text-sm font-semibold bg-[#7B5EA7] hover:bg-[#6a4f93] text-white px-4 py-2 rounded-xl transition-colors"
            >
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link href="/blog" className="text-sm text-[#7B5EA7] font-semibold hover:underline">
          &larr; Back to Blog
        </Link>

        {/* Header */}
        <header className="mt-8 mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2D2040] leading-tight mb-4">
            Before You Consign That Bag, Consider This
          </h1>
          <p className="text-lg text-gray-500 mb-4">
            Your luxury handbag is worth more than a one-time payout. Here&apos;s why renting it out earns you more — with less risk — than selling it on consignment.
          </p>
          <p className="text-sm text-gray-400">The Handoffs Team &middot; March 2026</p>
        </header>

        {/* Body */}
        <div className="prose-handoffs space-y-6 text-gray-600 leading-relaxed">
          <p>
            You&apos;ve been thinking about it for a while now. That Chanel Classic Flap, the Louis Vuitton Neverfull,
            the Gucci Marmont — it&apos;s been sitting in your closet for months, maybe years. You&apos;ve Googled
            &ldquo;sell designer bag online,&rdquo; and The RealReal keeps coming up. Maybe Vestiaire Collective.
            Maybe Rebag. The pitch is familiar: send us your bag, we&apos;ll authenticate it, photograph it, list it,
            and send you a check when it sells.
          </p>
          <p>
            Simple enough. But here&apos;s what they don&apos;t tell you upfront: consignment is a waiting game,
            and the house always takes its cut.
          </p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">The consignment reality check</h2>
          <p>
            Let&apos;s talk about what actually happens when you consign a luxury handbag.
          </p>
          <p>
            You ship your bag to a platform like The RealReal. They receive it, and then you wait — sometimes
            weeks — before it&apos;s even listed. Once it&apos;s live, the platform controls the price. Not you.
            They&apos;ll mark it down if it doesn&apos;t move fast enough, sometimes aggressively. And when it
            finally sells, the commission structure means you&apos;re walking away with a fraction of what you expected.
          </p>
          <p>
            Depending on your seller tier, consignment platforms can take anywhere from 20% to over 60% of the sale
            price. On a bag that sells for $2,000, that could mean you pocket as little as $800. And you waited
            months for it.
          </p>
          <p>
            Then there&apos;s the less common but very real risk: items getting lost, damaged, or returned by buyers
            in worse condition than they were sent. Once your bag leaves your hands, you lose control.
          </p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">What if your bag could pay you every month instead?</h2>
          <p>
            This is the idea behind The Handoffs&apos; non-member bag owner program. Instead of selling your bag for
            a one-time payout — and losing it forever — you contribute it to our rental pool and earn{' '}
            <strong className="text-[#2D2040]">$50 per month in cash</strong> while it&apos;s actively rented.
            Paid via Stripe. No membership required.
          </p>
          <p>
            Here&apos;s what that looks like in practice. Say you have a bag you think is worth about $1,500 on the
            resale market. After consignment fees, you might net $900 to $1,100 — once, after weeks or months of
            waiting. With The Handoffs, that same bag earns you $50/month. In 18 months, you&apos;ve made $900 —
            and you still own the bag. In 24 months, you&apos;ve out-earned what consignment would have paid you.
            And you can recall your bag at any time.
          </p>
          <p>Your bag isn&apos;t gone. It&apos;s working.</p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">You can still sell it — on your terms</h2>
          <p>
            Here&apos;s where it gets interesting. The Handoffs isn&apos;t asking you to choose between renting and
            selling. You can do both.
          </p>
          <p>
            List your bag for sale through our <strong className="text-[#2D2040]">Try Before You Buy</strong> program,
            and renters can experience the bag firsthand before purchasing it outright. You set a transparent price.
            If a renter falls in love with it — and they often do — they buy it directly, and you earn{' '}
            <strong className="text-[#2D2040]">85% of the sale price</strong>. That&apos;s a higher payout than
            most consignment platforms offer, especially for sellers who aren&apos;t in the top loyalty tier.
          </p>
          <p>
            In the meantime, while your bag is listed for sale, it&apos;s also earning you rental income every month.
            No dead time. No waiting for a buyer to stumble across your listing in a sea of thousands.
          </p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">We handle everything</h2>
          <p>
            One thing consignment platforms do well is remove the hassle of selling. We do the same — but better,
            because your bag stays productive the entire time.
          </p>
          <p>
            When you contribute a bag to The Handoffs, we provide{' '}
            <strong className="text-[#2D2040]">free white-glove authentication and intake</strong>. We handle all
            shipping, insurance, and returns. You don&apos;t photograph anything, write a listing, or deal with buyer
            questions. And unlike consignment, you&apos;re not handing over your bag and hoping for the best. You
            have full visibility and can recall your bag whenever you want.
          </p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">The math that consignment doesn&apos;t want you to do</h2>
          <p>
            Let&apos;s compare the two paths side by side for a bag with a resale value of $2,000:
          </p>
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
            <div>
              <p className="text-sm font-bold text-[#2D2040] mb-2">The consignment path:</p>
              <p className="text-sm text-gray-600">
                You ship your bag. You wait 4&ndash;8 weeks (sometimes longer) for it to sell. The platform takes
                30&ndash;55% in commission. You receive a one-time payout of roughly $900&ndash;$1,400. The bag is gone forever.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-[#7B5EA7] mb-2">The Handoffs path:</p>
              <p className="text-sm text-gray-600">
                You ship your bag. It enters the rental pool immediately. You earn $50/month in cash while
                it&apos;s rented. After 12 months, you&apos;ve earned $600 — and you still have the bag. If someone
                wants to buy it, you earn 85% of the sale price. Total potential earnings over 18 months: $900 in
                rental income + $1,700 from a sale = <strong className="text-[#2D2040]">$2,600</strong>.
              </p>
            </div>
          </div>
          <p>
            That&apos;s nearly double what consignment would have netted you — and you had income flowing the entire time.
          </p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">Who this is for</h2>
          <p>
            This isn&apos;t for everyone, and we&apos;re upfront about that. If you need cash tomorrow and want to
            be done with the bag entirely, consignment might be your fastest path (though &ldquo;fast&rdquo; is
            relative in that world).
          </p>
          <p>But if any of these sound like you, The Handoffs is worth a serious look:</p>
          <p>
            You&apos;re not in a rush to sell, but you&apos;re tired of your bag collecting dust. You like the idea
            of passive income from something you already own. You want to sell eventually, but you&apos;d rather earn
            money while you wait for the right buyer. You&apos;re uncomfortable with consignment platforms controlling
            your price and timeline. Or you simply don&apos;t want to let go of a bag permanently — you just want it
            to stop being a $3,000 shelf decoration.
          </p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">Your closet is an untapped asset</h2>
          <p>
            The average luxury handbag sits unused for the vast majority of its life. That&apos;s not a bag
            problem — it&apos;s a circulation problem. The bags already in the world are enough. They just need
            to keep moving.
          </p>
          <p>
            The Handoffs was built on that belief. And our non-member bag owner program is designed specifically
            for people like you: someone who owns something beautiful and wants it to work as hard as they do.
          </p>
          <p>
            No membership fee. No listing hassle. No loss of ownership. Just monthly income from a bag that was doing nothing.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg font-bold text-[#2D2040] mb-4">Ready to put your bag to work?</p>
          <Link
            href="/apply"
            className="inline-block bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-lg"
          >
            Apply to become a bag contributor &rarr;
          </Link>
        </div>

        {/* Tagline */}
        <p className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-400 text-center italic">
          The Handoffs is a members-only luxury handbag rental club. We authenticate every bag, handle all logistics,
          and believe in circulation over consumption. Learn more at{' '}
          <Link href="/" className="text-[#7B5EA7] hover:underline">thehandoffs.com</Link>.
        </p>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start leading-none">
            <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
            <span className="text-base font-bold text-[#2D2040]">Handoffs</span>
            <span className="text-xs text-gray-400 mt-0.5">Luxury. Simplified.</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-[#7B5EA7] transition-colors">Privacy Policy</Link>
            <Link href="/login" className="hover:text-[#7B5EA7] transition-colors">Sign In</Link>
            <Link href="/apply" className="hover:text-[#7B5EA7] transition-colors">Join</Link>
          </div>
          <p className="text-xs text-gray-300">&copy; {new Date().getFullYear()} The Handoffs</p>
        </div>
      </footer>
    </div>
  );
}
