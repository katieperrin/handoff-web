'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const NAV_LINKS = [
  { href: '/browse', label: 'Browse' },
  { href: '/saved', label: 'Saved' },
  { href: '/rental', label: 'My Rental' },
  { href: '/contribute', label: 'Contribute' },
  { href: '/profile', label: 'Profile' },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xs font-semibold text-[#7B5EA7] uppercase tracking-widest">The</span>
          <span className="text-lg font-bold text-[#2D2040]">Handoffs</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(href)
                  ? 'bg-purple-50 text-[#7B5EA7]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="ml-3 text-sm text-gray-400 hover:text-red-500 transition-colors px-2 py-2"
          >
            Log out
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1">
            <span className="block w-5 h-0.5 bg-current" />
            <span className="block w-5 h-0.5 bg-current" />
            <span className="block w-5 h-0.5 bg-current" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-2 space-y-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                pathname.startsWith(href)
                  ? 'bg-purple-50 text-[#7B5EA7]'
                  : 'text-gray-600'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-red-500"
          >
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}
