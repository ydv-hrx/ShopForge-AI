# ShopForge AI - Architecture Guide

## Overview
ShopForge AI follows a **Clean Architecture** pattern combined with a **Feature-based Folder Structure**. This ensures that the codebase remains maintainable as it grows.

## Folder Structure

```
src/
├── app/            # Next.js App Router (Routes & Layouts)
├── components/     # Global Shared UI Components (Button, Input, etc.)
├── features/       # Domain-specific logic (Cart, Products, Auth)
│   ├── [feature]/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
├── hooks/          # Global Shared Hooks
├── lib/            # Third-party library initializations (Shopify, OpenAI)
├── graphql/        # Shared GraphQL fragments, queries, and mutations
├── providers/      # React Context Providers
├── services/       # Global Services (API, Analytics)
├── utils/          # Pure helper functions
├── types/          # Global TypeScript types
├── constants/      # App-wide constants & config
├── styles/         # Global styles & Tailwind config
├── docs/           # Detailed feature documentation
└── tests/          # Global test suites
```

## Core Principles

### 1. Separation of Concerns
Each layer has a specific responsibility. UI components should focus on presentation, while services handle data fetching and external API communication.

### 2. Feature Isolation
Code related to a specific feature (e.g., the Shopping Cart) should reside within its own folder in `features/`. This makes it easier to find, test, and potentially move code.

### 3. Type Safety
We use TypeScript strictly. Every API response and component prop must be typed to prevent runtime errors.

### 4. Headless Commerce Flow
Next.js Frontend <-> Shopify Storefront API (GraphQL) <-> Shopify Admin Backend.

### 5. Application Shell
The root layout is responsible for loading global fonts, applying theme-aware document attributes, and composing shared providers such as `ThemeProvider` before any feature UI renders.

### 6. Global Layout
The app shell is composed from reusable layout components in `src/components/layout/`: an announcement bar for top-level messaging, a sticky responsive navbar for primary navigation, and a footer for supporting links and metadata.

### 7. Homepage Hero
The homepage hero lives in `src/components/home/hero.tsx` and composes existing UI primitives to create a premium full-width landing section without introducing Shopify data fetching or feature logic.

## Data Fetching
- **Server Components:** Used for data fetching on initial page load (SEO friendly).
- **Client Components:** Used for interactive elements (Cart, Search) and state management.
- **Shopify Client:** A centralized service in `lib/shopify.ts` handles all GraphQL requests with proper error handling and caching.

## Environment Strategy
- **.env.local:** Shopify credentials are loaded from `.env.local` at the project root and validated server-side before any Storefront request runs.
- **Env Example:** `.env.example` mirrors the required keys so local setup stays explicit and repeatable.

## Styling
- **Tailwind CSS:** For rapid, consistent styling.
- **Design Tokens:** Defined in `src/styles/globals.css` and mapped into Tailwind theme variables for consistent light and dark mode surfaces.
- **Theme Provider:** A shared provider in `src/providers/` owns light/dark mode state and persists the user preference.
- **Design System Primitives:** Reusable components live in `src/components/ui/` and use `class-variance-authority` for typed variants, consistent spacing, and accessibility-first states.
- **Layout Primitives:** The global shell composes announcement, navigation, and footer pieces from `src/components/layout/` to keep page routes free of structural duplication.
- **Framer Motion:** For smooth animations.

### Shopify Foundation
- **GraphQL Utility:** `src/lib/graphql.ts` provides a reusable, typed GraphQL transport with structured success and error results.
- **Shopify Client:** `src/lib/shopify.ts` validates the Storefront configuration, builds the endpoint, and exposes a simple connection test query for the storefront.
