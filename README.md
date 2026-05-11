# Maison Étoile — Premium Dark Luxury Restaurant Ecommerce

Maison Étoile is a high-end restaurant ecommerce website built with Next.js, integrating seamlessly with the Shopify Storefront API. This version is inspired by a modern, Dribbble-style luxury food landing page, featuring a deep charcoal background, glassmorphism cards, bright gold accents, and large cinematic circular food imagery.

## Tech Stack

- **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **API:** [Shopify Storefront GraphQL API](https://shopify.dev/docs/api/storefront)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Key Design Features

- **Dribbble-Inspired Luxury:** Dark background (`#080706`) with a subtle noise texture overlay.
- **Glassmorphism:** Product cards use semi-transparent white backgrounds with backdrop blur and bright gold CTA buttons.
- **Cinematic Hero:** Large serif headlines paired with oversized, animated floating food imagery.
- **Shopify Integration:** Dynamic product fetching, cart management, and seamless redirect to secure checkout.
- **Premium Animations:** Smooth Framer Motion transitions (scroll reveals, hover lifts, cart drawer slides).

## Getting Started

### 1. Prerequisites

- A Shopify store with the **Storefront API** enabled.
- Products (with featured images) and collections created in your Shopify admin.

### 2. Environment Variables

Create a `.env.local` file in the root directory and add your Shopify credentials:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-access-token
SHOPIFY_API_VERSION=2026-01
```

*(See the prompt above for detailed instructions on obtaining your Shopify Storefront Access Token.)*

### 3. Installation

```bash
npm install
```

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Ensure you add the environment variables mentioned above in your Vercel project settings before deploying.

---

Designed with elegance by Maison Étoile.
