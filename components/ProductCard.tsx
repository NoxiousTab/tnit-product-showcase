'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/fetchProducts';

export default function ProductCard({
  product,
  onView
}: {
  product: Product;
  onView: (product: Product) => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="group relative rounded-xl p-[1px] transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500"
    >
      <div className="relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 group-hover:shadow-xl dark:bg-bg-950">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-6"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={false}
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onView(product)}
              className="pointer-events-auto rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white/15"
            >
              View Product
            </button>
          </div>
        </div>

        <div className="space-y-2 p-4">
          <h3 className="truncate text-sm font-medium text-slate-900 dark:text-white" title={product.title}>
            {product.title}
          </h3>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
