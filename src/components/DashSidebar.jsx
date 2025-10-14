'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useUser, SignOutButton } from '@clerk/nextjs';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartPie,
} from 'react-icons/hi';

export default function DashSidebar() {
  const [tab, setTab] = useState('');
  const searchParams = useSearchParams();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) setTab(tabFromUrl);
  }, [searchParams]);

  if (!isSignedIn) return null;

  const links = [
    { name: 'Dashboard', icon: HiChartPie, href: '/dashboard?tab=dash', key: 'dash' },
    { name: 'Profile', icon: HiUser, href: '/dashboard?tab=profile', key: 'profile' },
    { name: 'Posts', icon: HiDocumentText, href: '/dashboard?tab=posts', key: 'posts' },
    { name: 'Users', icon: HiOutlineUserGroup, href: '/dashboard?tab=users', key: 'users' },
  ];

  return (
    <div className="w-full md:w-56 bg-white dark:bg-gray-900 h-screen shadow-md flex flex-col p-4">
      <div className="mb-4">
        <SignOutButton>
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-normal w-full">
            <HiArrowSmRight className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </SignOutButton>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
              tab === link.key || (!tab && link.key === 'dash')
                ? 'bg-gray-200 dark:bg-gray-700 font-semibold text-gray-800 dark:text-gray-200'
                : 'font-normal text-gray-800 dark:text-gray-200'
            }`}
          >
            <link.icon className="w-5 h-5" />
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
