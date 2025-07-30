'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-16">
      <div className="max-w-[78rem] mx-auto px-6 py-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner">
        <p>© {new Date().getFullYear()} TaskBoard. Built beautifully with 💜</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-gray-200 transition">Privacy</Link>
          <Link href="/terms" className="hover:text-gray-200 transition">Terms</Link>
          <Link href="/contact" className="hover:text-gray-200 transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
