'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { fetchProducts, type Product } from '@/lib/fetchProducts';

function ProductSkeletonCard() {
  return (
    <div className="rounded-xl bg-slate-900/5 p-4 shadow-md dark:bg-white/5">
      <div className="animate-pulse">
        <div className="aspect-[4/3] w-full rounded-xl bg-slate-900/10 dark:bg-white/10" />
        <div className="mt-4 h-4 w-3/4 rounded bg-slate-900/10 dark:bg-white/10" />
        <div className="mt-3 h-5 w-1/3 rounded bg-slate-900/10 dark:bg-white/10" />
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating-desc'>('featured');
  const [category, setCategory] = useState<string>('all');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts(controller.signal);
        setProducts(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    void load();

    return () => {
      controller.abort();
    };
  }, []);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.06
        }
      }
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 14 },
      show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
    }),
    []
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return ['all', ...Array.from(set).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products;

    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    if (q) {
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'rating-desc') sorted.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));

    return sorted;
  }, [products, query, sort, category]);

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Products</h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:w-auto sm:grid-cols-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-900/10 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-bg-950 dark:text-white"
            aria-label="Search products"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-900/10 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-bg-950 dark:text-white"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All categories' : c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="w-full rounded-xl border border-slate-900/10 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-bg-950 dark:text-white"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating</option>
          </select>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-200">
          <div className="font-semibold">Failed to load products</div>
          <div className="mt-1 opacity-90">{error}</div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 rounded-xl bg-slate-900/10 px-4 py-2 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-900/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
          >
            Retry
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filteredProducts.map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <ProductCard product={p} onView={(prod) => setActiveProduct(prod)} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {activeProduct ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProduct(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-xl dark:border-white/10 dark:bg-bg-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-900/10 px-5 py-4 dark:border-white/10">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900 dark:text-white" title={activeProduct.title}>
                    {activeProduct.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-white/70">{activeProduct.category}</div>
                </div>
                <button
                  type="button"
                  className="rounded-xl bg-slate-900/5 px-3 py-2 text-sm font-semibold text-slate-800 transition-all duration-300 hover:bg-slate-900/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                  onClick={() => setActiveProduct(null)}
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-900/10 bg-slate-900/5 dark:border-white/10 dark:bg-white/5">
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.title}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                <div className="space-y-3">
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white">
                    ${activeProduct.price.toFixed(2)}
                  </div>

                  <div className="text-sm text-slate-700 dark:text-white/80">
                    {activeProduct.description}
                  </div>

                  <div className="rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white">⭐ Rating</span>
                      <span>
                        {activeProduct.rating?.rate ?? '—'} / 5 
                        {activeProduct.rating?.count ? ` (${activeProduct.rating.count})` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
