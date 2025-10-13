'use client';
import { useEffect, useState } from 'react';

export default function ThemeCom({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200 min-h-screen transition-colors duration-300">
      {children}
    </div>
  );
}
