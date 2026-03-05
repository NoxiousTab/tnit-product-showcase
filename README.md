# TNIT Product Showcase

A modern product showcase storefront built with **Next.js (App Router)**, **TypeScript**, **TailwindCSS**, and **Framer Motion**.

It fetches products from the **FakeStore API**, displays them in a responsive animated grid, supports **search/sort/category filtering**, includes a **dark mode toggle** (persisted), and has a newsletter form with validation + a polished success animation.

Built as an assignment for TNIT26.

## Features

- Responsive product grid
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- Product cards with hover animations
- Search, sort, and category filter
- Product details modal (animated)
- Skeleton loading + graceful error handling
- Landing hero with animated floating product “ads”
- Newsletter signup with validation + animated success overlay
- Light/dark theme toggle with persistence

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- TailwindCSS
- Framer Motion
- Sonner (toast library is installed; success toast for newsletter is disabled in favor of the success overlay)
- Lucide React (icons)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the dev server

```bash
npm run dev
```

Open:

- http://localhost:3000

## Notes

- Products are loaded from: https://fakestoreapi.com/products
- Theme is persisted via `localStorage`.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - run lint
