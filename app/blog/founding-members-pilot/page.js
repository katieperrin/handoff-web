import Link from 'next/link';

export const metadata = {
  title: "We're Selecting 10 People to Try The Handoffs Before Anyone Else | The Handoffs",
  description: "We're hand-selecting 10 Founding Members for our pilot program. Get permanently discounted pricing, first access to the collection, and a direct line to our team.",
  openGraph: {
    title: "We're Selecting 10 People to Try The Handoffs Before Anyone Else",
    description: "We're hand-selecting 10 Founding Members for our pilot program.",
    type: 'article',
  },
};

export default function FoundingMembersPilotPost() {
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
            We&apos;re Selecting 10 People to Try The Handoffs Before Anyone Else
          </h1>
          <p className="text-sm text-gray-400">The Handoffs Team &middot; February 2026</p>
        </header>

        {/* Body */}
        <div className="prose-handoffs space-y-6 text-gray-600 leading-relaxed">
          <p>
            We&apos;ve spent months building something we believe in — a new way to experience luxury handbags
            without buying them, and a new way for bag owners to earn from what&apos;s already in their closet.
          </p>
          <p>Now we need to know if it works in the real world.</p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">Introducing the Founding Members Pilot</h2>
          <p>
            Before we open The Handoffs to everyone, we&apos;re hand-selecting 10 people to be our first members.
            This isn&apos;t a beta test with a survey at the end. This is the real thing — real bags, real membership,
            real experience — with a small group of people who care about getting it right as much as we do.
          </p>
          <p>We&apos;re calling them our <strong>Founding Members</strong>.</p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">What Founding Members Get</h2>
          <p>As part of this first cohort, you&apos;ll receive:</p>

          <p>
            <strong className="text-[#2D2040]">Permanently discounted membership pricing.</strong>{' '}
            Founding Members lock in exclusive pricing that will never be available again. When we open to the
            public, these rates go away. Your rate stays — for as long as you&apos;re a member.
          </p>
          <p>
            <strong className="text-[#2D2040]">First access to the collection.</strong>{' '}
            Before anyone else browses, you browse. Before anyone else requests a bag, you request. The full
            catalog of authenticated luxury bags is yours to explore from day one.
          </p>
          <p>
            <strong className="text-[#2D2040]">A direct line to us.</strong>{' '}
            This isn&apos;t a support ticket. Founding Members get direct access to our team. Tell us what&apos;s
            working, what isn&apos;t, and what you wish existed. Your feedback will shape how The Handoffs works
            for everyone who comes after you.
          </p>
          <p>
            <strong className="text-[#2D2040]">The &ldquo;I was here first&rdquo; badge.</strong>{' '}
            We&apos;ll always know who believed in this before it was proven. Founding Members will be recognized
            in ways we&apos;ll share more about down the road.
          </p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">Who We&apos;re Looking For</h2>
          <p>
            We&apos;re not selecting at random. We&apos;re looking for 10 people who fit one (or both) of these profiles:
          </p>
          <p>
            <strong className="text-[#2D2040]">The Renter</strong> — You&apos;ve always wanted to carry a Chanel
            or Hermès but buying one doesn&apos;t make sense right now. You love fashion, you love variety, and
            you&apos;d rather rotate than collect. You believe access beats ownership.
          </p>
          <p>
            <strong className="text-[#2D2040]">The Contributor</strong> — You own one or more designer bags that
            spend most of their life in a dust bag. You&apos;ve thought about selling but can&apos;t pull the trigger.
            You like the idea of your bag working for you — earning credits while you&apos;re not using it — without
            ever giving it up permanently.
          </p>
          <p>
            If you read that and thought <em>that&apos;s me</em>, we want to hear from you.
          </p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">Why Only 10?</h2>
          <p>Because we want to be obsessive about this first experience.</p>
          <p>
            Every bag authenticated. Every shipment tracked. Every question answered personally. We&apos;d rather
            serve 10 people exceptionally than 1,000 people adequately. The things we learn from this cohort will
            define how we scale — and we refuse to rush that.
          </p>

          <h2 className="text-2xl font-bold text-[#2D2040] pt-4">How to Apply</h2>
          <p>
            We&apos;ve put together a short application. It takes about 2 minutes. We&apos;ll ask you a bit about
            yourself, your relationship with luxury fashion, and whether you&apos;re interested in renting,
            contributing a bag, or both.
          </p>
          <p>
            Applications are open now. We&apos;ll be reviewing them on a rolling basis and closing once we&apos;ve
            selected our 10.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/apply"
            className="inline-block bg-[#7B5EA7] hover:bg-[#6a4f93] text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-lg"
          >
            Apply to Be a Founding Member &rarr;
          </Link>
        </div>

        {/* Tagline */}
        <p className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-400 text-center italic">
          The Handoffs is a members-only rental club for authenticated luxury handbags. Wear the bag. Not the price tag.
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
