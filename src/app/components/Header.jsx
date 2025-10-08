'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';

const Header = () => {
  const path = usePathname();
  const { theme, setTheme } = useTheme(); // ✅ fixed here
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 md:py-4 gap-4">

        <div className="flex items-center gap-6 w-full md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg text-white shadow-md">
                Sahand&apos;s
              </span>{' '}
              Blog
            </span>
          </Link>

          <form
            onSubmit={handleSubmit}
            className="hidden md:flex items-center relative w-64 lg:w-80"
          >
            <AiOutlineSearch className="absolute left-3 text-gray-400 text-lg" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 bg-gray-100 dark:bg-gray-800 rounded-lg focus-visible:ring-1 focus-visible:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-6 flex-1">
          {[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
            { name: 'Projects', href: '/projects' },
            { name: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium tracking-wide transition-all ${
                path === link.href
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500'
              }`}
            >
              {link.name}
              {path === link.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">

          <Button variant="ghost" size="icon" className="md:hidden">
            <AiOutlineSearch className="text-lg" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </Button>

          <Button
            size="sm"
            className="relative overflow-hidden px-5 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <span className="relative z-10">Sign in</span>
            <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-md transition-opacity duration-500"></span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
