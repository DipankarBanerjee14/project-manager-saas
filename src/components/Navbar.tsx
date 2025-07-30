'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[78rem] px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg flex items-center justify-between">
      <Link href="/" className="text-white font-bold text-xl tracking-tight">
        TaskBoard
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-200">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <Link href="/#features" className="hover:text-white transition">Features</Link>
        <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
        <Link href="/login" className="hover:text-white transition">Login</Link>
        <Link href="/signup">
          <button className="ml-4 bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 rounded-md text-white text-sm shadow">
            Get Started
          </button>
        </Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-white text-xl">
        {open ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-full mt-3 left-0 w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 flex flex-col gap-4 md:hidden shadow-xl">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/#features" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
          <Link href="/signup">
            <button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 rounded-md text-white">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
