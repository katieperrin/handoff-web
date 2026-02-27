import Link from 'next/link';

export const metadata = {
  title: 'Blog | The Handoffs',
  description: 'News, updates, and stories from The Handoffs — a members-only luxury handbag rental club.',
  openGraph: {
    title: 'Blog | The Handoffs',
    description: 'News, updates, and stories from The Handoffs.',
    type: 'website',
  },
};

const POSTS = [
  {
    slug: 'founding-members-pilot',
    title: "We're Selecting 10 People to Try The Handoffs Before Anyone Else",
    date: 'February 2026',
    excerpt: "We've spent months building something we believe in. Now we need to know if it works in the real world. We're hand-selecting 10 people to be our first members.",
  },
];

export default function BlogPage() {
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

      {/* Header */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2D2040] mb-4">Blog</h1>
        <p className="text-gray-500 leading-relaxed">News, updates, and stories from The Handoffs.</p>
      </section>

      {/* Posts */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="space-y-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl border border-gray-100 p-8 hover:border-purple-200 transition-colors"
            >
              <p className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest mb-2">{post.date}</p>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D2040] mb-3">{post.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
              <span className="inline-block mt-4 text-sm font-semibold text-[#7B5EA7]">Read more &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

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
