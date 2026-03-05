'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { fetchProducts, type Product } from '@/lib/fetchProducts';

export default function Hero() {
  const [ads, setAds] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAds() {
      try {
        const data = await fetchProducts(controller.signal);
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setAds(shuffled.slice(0, 4));
      } catch {
        setAds([]);
      }
    }

    void loadAds();
    return () => controller.abort();
  }, []);

  const floating = useMemo(
    () =>
      [
        { top: '0%', left: '8%', rotate: -8, duration: 7.5 },
        { top: '18%', right: '10%', rotate: 10, duration: 8.5 },
        { bottom: '12%', left: '43%', rotate: 6, duration: 9.5 },
        { bottom: '8%', right: '16%', rotate: -6, duration: 10.5 }
      ] as const,
    []
  );

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-900/10 bg-gradient-to-b from-white to-slate-50 px-6 py-14 shadow-lg dark:border-white/10 dark:from-white/5 dark:to-transparent sm:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {floating.map((pos, i) => {
          const product = ads[i];
          if (!product) return null;

          return (
            <motion.div
              key={product.id}
              className="absolute w-48 rounded-2xl border border-slate-900/10 bg-white/70 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-bg-900/40"
              style={{
                top: 'top' in pos ? pos.top : undefined,
                bottom: 'bottom' in pos ? pos.bottom : undefined,
                left: 'left' in pos ? pos.left : undefined,
                right: 'right' in pos ? pos.right : undefined
              }}
              initial={{ opacity: 0, y: 8, rotate: pos.rotate }}
              animate={{ opacity: 1, y: [0, -10, 0], rotate: pos.rotate }}
              transition={{ duration: pos.duration, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-slate-900/5 dark:bg-white/5">
                  <Image src={product.image} alt={product.title} fill className="object-contain p-2" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-slate-900 dark:text-white">{product.title}</div>
                  <div className="mt-1 text-xs text-slate-700 dark:text-white/70">${product.price.toFixed(2)}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative"
      >
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Discover products with a smooth, modern storefront experience.
        </h1>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#products"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            Browse Products
          </a>
          <a
            href="#newsletter"
            className="rounded-xl border border-slate-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
          >
            Subscribe
          </a>
        </div>
      </motion.div>
    </section>
  );
}
