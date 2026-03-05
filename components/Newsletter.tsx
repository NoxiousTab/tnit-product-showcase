'use client';

import type React from 'react';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

type Errors = {
  name?: string;
  email?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  const successParticles = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const distance = 64 + (i % 3) * 18;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const delay = 0.05 + i * 0.02;
        const size = 6 + (i % 4);
        return { dx, dy, delay, size };
      }),
    []
  );

  const fieldBaseClass = useMemo(
    () =>
      'mt-1 w-full rounded-xl border bg-bg-900/60 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-sm outline-none transition-all duration-300 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/30',
    []
  );

  function validate(): Errors {
    const next: Errors = {};

    if (!name.trim()) next.name = 'Name is required';
    else if (name.trim().length < 2) next.name = 'Name must be at least 2 characters';

    if (!email.trim()) next.email = 'Email is required';
    else if (!isValidEmail(email.trim())) next.email = 'Enter a valid email address';

    return next;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const payload = { name: name.trim(), email: email.trim() };
    console.log(payload);

    setSuccess(true);
    setName('');
    setEmail('');

    window.setTimeout(() => setSuccess(false), 3200);
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0 z-10 grid place-items-center"
          >
            <div className="absolute inset-0 rounded-2xl bg-bg-950/50 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-bg-950/80 p-6 shadow-2xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-fuchsia-500/15" />

              <div className="relative">
                <div className="relative mx-auto grid h-16 w-16 place-items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/15"
                  >
                    <motion.div
                      initial={{ scale: 0.85, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 18, delay: 0.06 }}
                    >
                      <CheckCircle2 className="h-7 w-7 text-emerald-300" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
                    className="absolute inset-0 rounded-[22px] border border-white/10"
                  />
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.2, ease: 'linear', repeat: Infinity }}
                    className="absolute inset-[-10px] rounded-[28px] border border-indigo-500/20"
                  />

                  {successParticles.map((p, i) => (
                    <motion.span
                      key={i}
                      aria-hidden="true"
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
                      animate={{ opacity: [0, 1, 0], x: p.dx, y: p.dy, scale: [0.8, 1, 0.9] }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: p.delay }}
                      className="absolute left-1/2 top-1/2 rounded-full bg-gradient-to-r from-indigo-300 to-fuchsia-300"
                      style={{ width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 }}
                  className="mt-4 text-center"
                >
                  <p className="text-xl font-semibold tracking-tight text-white">Thanks for subscribing!</p>
                  <p className="mt-1 text-sm text-white/70">Stay tuned for updates, launches, and fresh picks.</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="rounded-2xl bg-gradient-to-r from-indigo-500/15 to-purple-500/15 p-[1px] shadow-lg">
        <div className="rounded-2xl border border-white/10 bg-bg-950/60 px-6 py-10 shadow-md backdrop-blur sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-white">Stay Updated</h3>
            <p className="mt-2 text-sm text-white/70">Subscribe to our newsletter for product updates.</p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="text-sm font-medium text-white/80">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${fieldBaseClass} ${errors.name ? 'border-red-500/70 ring-2 ring-red-500/20' : 'border-white/10'}`}
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.name ? <p className="mt-2 text-xs text-red-200">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${fieldBaseClass} ${errors.email ? 'border-red-500/70 ring-2 ring-red-500/20' : 'border-white/10'}`}
                  placeholder="john@example.com"
                  autoComplete="email"
                />
                {errors.email ? <p className="mt-2 text-xs text-red-200">{errors.email}</p> : null}
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
              >
                <span className="transition-transform duration-300 group-hover:translate-y-[-1px]">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
