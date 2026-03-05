'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const shouldBeDark = stored ? stored === 'dark' : false;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  function toggleTheme() {
    setIsDark((prev: boolean) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-bg-900/80">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
          Product Showcase
        </a>
        <nav className="flex items-center gap-3">
          <a
            href="#products"
            className="rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:text-slate-900 dark:text-white/80 dark:hover:text-white"
          >
            Products
          </a>
          <a
            href="#newsletter"
            className="rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:text-slate-900 dark:text-white/80 dark:hover:text-white"
          >
            Newsletter
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-800 shadow-sm transition-all duration-300 hover:bg-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
