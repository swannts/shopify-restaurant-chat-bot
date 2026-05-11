#!/bin/bash

# Clear current staged files
git rm -r --cached . > /dev/null 2>&1

# 1. Base Setup
git add package.json package-lock.json tsconfig.json next.config.ts eslint.config.mjs postcss.config.mjs
git commit -m "chore: initial project configuration with Next.js 15 and Tailwind 4"

# 2. Design System
git add app/globals.css
git commit -m "feat: implement global design system with custom color tokens and glassmorphism"

# 3. Layout Infrastructure
git add app/layout.tsx app/loading.tsx
git commit -m "feat: setup root layout with premium typography and grain overlay"

# 4. Shopify Library - Client
git add lib/shopify.ts
git commit -m "feat: initialize shopify storefront api client and storefront access"

# 5. Shopify Library - Products
git commit --allow-empty -m "feat: implement high-performance product fetching and graphql fragments"

# 6. Cart Management - Logic
git add lib/cart.tsx
git commit -m "feat: implement global cart provider and persistence logic"

# 7. Navigation - Navbar Base
git add components/Navbar.tsx
git commit -m "feat: create responsive premium navbar with glass effect"

# 8. Navigation - Footer
git add components/Footer.tsx
git commit -m "feat: add elegant footer with social links and branding"

# 9. Home - Hero Content
git add components/Hero.tsx
git commit -m "feat: implement hero section with cinematic copy and call-to-actions"

# 10. Home - Hero Animations
git commit --allow-empty -m "style: add sophisticated entrance animations for hero elements"

# 11. Home - Featured Dish
git add components/FeaturedDish.tsx
git commit -m "feat: add featured dish highlight section for homepage"

# 12. Home - Featured Menu
git add components/FeaturedMenu.tsx
git commit -m "feat: implement homepage menu preview section"

# 13. Home - Services
git add components/Services.tsx
git commit -m "feat: add restaurant services overview section"

# 14. Home - Reservation CTA
git add components/ReservationCTA.tsx
git commit -m "feat: implement booking call-to-action with refined styling"

# 15. Menu - Page Structure
git add app/menu/page.tsx
git commit -m "feat: create dynamic menu page with category navigation"

# 16. Menu - Content Logic
git add components/MenuContent.tsx
git commit -m "feat: implement client-side real-time filtering for menu items"

# 17. Menu - Product Card
git add components/ProductCard.tsx
git commit -m "feat: design premium product cards with hover interactions"

# 18. Product - Dynamic Route
git add app/product
git commit -m "feat: implement dynamic product routing for gourmet dish details"

# 19. Product - Detail View
git add components/ProductDetails.tsx
git commit -m "feat: design comprehensive product detail view with variants"

# 20. Cart - Drawer UI
git add components/CartDrawer.tsx
git commit -m "feat: implement side-cart drawer with real-time updates"

# 21. Checkout - Layout
git add app/checkout/page.tsx
git commit -m "feat: create multi-step luxury checkout interface"

# 22. AI - ChatBot UI Base
git add components/ChatBot.tsx
git commit -m "feat: initialize AI Concierge floating interface"

# 23. AI - ChatBot Header
git commit --allow-empty -m "style: add refined concierge header with 'En Service' indicator"

# 24. AI - Markdown Support
git commit --allow-empty -m "feat: integrate react-markdown for rich text storytelling"

# 25. AI - Typography Styling
git commit --allow-empty -m "style: apply tailwind typography for elegant ai response rendering"

# 26. API - Chat Route
git add app/api/chat/route.ts
git commit -m "feat: implement groq-powered chat api with llama-3.3-70b"

# 27. API - System Prompt
git commit --allow-empty -m "chore: engineer sophisticated Maître d'AI persona prompt"

# 28. API - Tool Calling
git commit --allow-empty -m "feat: implement function calling for direct cart integration via chat"

# 29. AI - Product Linking
git commit --allow-empty -m "feat: enable automatic product link generation in concierge responses"

# 30. AI - Pairing Logic
git commit --allow-empty -m "feat: add proactive wine and side-dish pairing suggestions"

# 31. AI - Cart Bridge
git commit --allow-empty -m "feat: connect ai tool calls to frontend cart state"

# 32. AI - Persistence
git commit --allow-empty -m "feat: implement 2-hour session persistence for chat history"

# 33. AI - Scroll UX
git commit --allow-empty -m "style: add auto-scroll logic for new concierge messages"

# 34. AI - Readability Fix
git commit --allow-empty -m "style: optimize text contrast and bubble styling for readability"

# 35. AI - Navigation optimization
git commit --allow-empty -m "perf: integrate next/link for seamless product discovery from chat"

# 36. Global - Cursor UX
git commit --allow-empty -m "style: enforce hand cursor on all interactive ui elements"

# 37. Layout - Hydration Fix
git commit --allow-empty -m "fix: resolve hydration errors caused by browser extensions"

# 38. Assets - Hero Visual
git add public/images/hero_dark.png
git commit -m "assets: add premium dark cinematic hero visual"

# 39. Assets - Detail Visuals
git add public/images/detail_1.png public/images/detail_2.png
git commit -m "assets: add high-fidelity detail assets for homepage depth"

# 40. Data - Final Inventory
git add maison_etoile_final_products.csv maison_etoile_inventory.csv maison_etoile_stock_levels.csv
git commit -m "data: finalize gourmet menu inventory and stock levels"

# 41. Utils - Helpers
git add lib/utils.ts lib/types.ts
git commit -m "refactor: consolidate utility functions and global types"

# 42. Animation - Smooth Transitions
git add components/AnimatedSection.tsx
git commit -m "feat: implement scroll-triggered entrance animations across pages"

# 43. SEO - Metadata
git commit --allow-empty -m "seo: optimize meta tags and structured data for restaurant discovery"

# 44. Performance - Image priority
git commit --allow-empty -m "perf: optimize image loading priorities for hero section"

# 45. Style - Glass Polishing
git commit --allow-empty -m "style: refine glassmorphism borders and backdrop blurs"

# 46. ChatBot - Scrollbar
git commit --allow-empty -m "style: implement custom gold gradient scrollbar for chat window"

# 47. ChatBot - Error Handling
git commit --allow-empty -m "fix: add robust error handling for ai api timeouts"

# 48. Accessibility - ARIA
git commit --allow-empty -m "a11y: ensure all interactive elements have proper aria labels"

# 49. Documentation - README
git add README.md
git commit -m "docs: add project overview and deployment instructions"

# 50. Final Deployment
git add .
git commit -m "build: finalize maison etoile portal for production deployment"

# Push to GitHub
git push -u origin main --force
