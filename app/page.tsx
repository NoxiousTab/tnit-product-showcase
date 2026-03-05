 'use client';

 import { motion } from 'framer-motion';
 import Hero from '@/components/Hero';
 import ProductGrid from '@/components/ProductGrid';
 import Newsletter from '@/components/Newsletter';

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8"
    >
      <Hero />
      <section id="products" className="mt-12">
        <ProductGrid />
      </section>
      <section id="newsletter" className="mt-16">
        <Newsletter />
      </section>
    </motion.main>
  );
}
