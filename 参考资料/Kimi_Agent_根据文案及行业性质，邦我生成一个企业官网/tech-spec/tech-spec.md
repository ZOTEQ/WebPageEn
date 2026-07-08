# ZOTEQ — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM renderer |
| react-router-dom | ^7.0.0 | Multi-page routing (Home, Products, ProductDetail, Facilities, Contact) |
| gsap | ^3.12.0 | Core animation engine — ScrollTrigger, SplitText, timeline sequencing |
| lenis | ^1.2.0 | Smooth scroll with inertia |
| lucide-react | ^0.400.0 | Icon library (shadcn/ui dependency) |
| class-variance-authority | ^0.7.0 | Component variant styling (shadcn/ui) |
| clsx | ^2.1.0 | Conditional class merging (shadcn/ui) |
| tailwind-merge | ^2.5.0 | Tailwind class deduplication (shadcn/ui) |
| @radix-ui/react-dialog | ^1.1.0 | Dialog primitives (mobile nav, product detail modal) |
| @radix-ui/react-slot | ^1.1.0 | Slot primitive (shadcn/ui) |
| @radix-ui/react-tooltip | ^1.1.0 | Tooltip primitive |
| @radix-ui/react-tabs | ^1.1.0 | Tabs (product categories, facility info) |
| typescript | ^5.6.0 | Type checking |
| vite | ^6.0.0 | Build tool |
| tailwindcss | ^3.4.0 | Utility CSS |
| @vitejs/plugin-react | ^4.3.0 | React Vite plugin |
| @types/react | ^19.0.0 | React type definitions |
| @types/react-dom | ^19.0.0 | ReactDOM type definitions |

No additional shadcn components needed beyond the base project setup — all UI components are custom-built with the specified design system.

---

## Component Inventory

### Layout (shared across all pages)

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed top bar, scroll-aware background transition, search bar, CTA pill |
| Footer | Custom | 3-column dark footer |
| PageLayout | Custom | Wraps each route with Nav + Footer + Lenis scroll |

### Sections — Homepage

| Component | Notes |
|-----------|-------|
| HeroSection | Full-viewport hero with background image, text reveal animation, stats row |
| MissionSection | Two-column asymmetric (40/60), scroll-triggered entrance |
| NewLaunchesSection | 4-column product card grid, staggered entrance |
| MarqueeSection | Full-width CSS marquee band |
| ExploreGridSection | 2×2 capability card grid |
| FnfHubCarousel | Custom carousel with 4 capability slides, swipe + dot nav |
| PartnersSection | Horizontal logo/text bar, stagger entrance |

### Sections — Ingredients Library (`/products`)

| Component | Notes |
|-----------|-------|
| ProductHeader | Title + search bar with debounced filter |
| ProductTable | Sortable/filterable table with 50 rows, pagination (20/page), category color pills |

### Sections — Product Detail (`/products/:id`)

| Component | Notes |
|-----------|-------|
| ProductDetailHeader | Breadcrumb, category tags, key spec pills |
| EssentialInfoSection | 3-column info cards |
| TechSpecsSection | Two-column spec table |
| RelatedProductsSection | Horizontal scroll row of 4 product cards |
| ProductCTASection | Accent-dark CTA band |

### Sections — Facilities (`/facilities`)

| Component | Notes |
|-----------|-------|
| FacilityHero | 60vh hero with CTAs |
| ProductionBasesSection | Two-column side-by-side base cards |
| RnDLabsSection | 2×2 lab card grid |
| DistributionTableSection | Location × Function capability matrix table |
| PartnersSection | Reused from homepage |

### Sections — Contact (`/contact`)

| Component | Notes |
|-----------|-------|
| ContactHero | 50vh hero with background image carousel (4 images, crossfade) |
| OfficeGallerySection | 3-column image grid |
| OfficesSection | 5 office location cards + sidebar call-preference card |
| DirectContactSection | 3 contact method cards (phone, whatsapp, email) |
| ResponsePromiseSection | Accent-dark promise band |

### Reusable Components

| Component | Used By | Notes |
|-----------|---------|-------|
| CategoryPill | ProductTable, ProductDetailHeader | Color-coded by category (Biobased/Synthetic/EU Natural/US Natural) |
| ProductCard | NewLaunchesSection, RelatedProductsSection | Card with category tag, name, code, description, CTA link |
| SectionLabel | Multiple sections | "— Label —" styled caption with Accent color |
| AnimatedSection | All sections | Wrapper component: scroll-triggered fade+translateY with configurable stagger |
| PillButton | Nav, multiple CTAs | 100px radius pill button with variant styles (Accent/Outline/White) |
| Carousel | FnfHubCarousel, ContactHero | Generic swipe-enabled carousel with arrows + dots |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollReveal | IntersectionObserver-based scroll-triggered animation, configurable direction/distance/stagger |
| useLenis | Lenis smooth scroll initialization and cleanup |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Smooth scroll (global) | Lenis | Initialize in PageLayout, lerp 0.1, sync with GSAP ScrollTrigger | Low |
| Scroll-triggered section reveal | GSAP + ScrollTrigger | `useScrollReveal` hook: IntersectionObserver triggers GSAP timeline (opacity 0→1, translateY 40→0, stagger 0.1s). One-shot, threshold 0.15. | Medium |
| Hero text reveal | GSAP SplitText | Split headline into words, stagger fade+translateY(30→0) at 0.08s intervals, 0.7s duration. Badge slides from top (0.5s delay). Stats and CTA fade up with sequential delays. | High |
| Marquee scroll | CSS animation | Duplicate content, `translateX(-50%)`, `animation: marquee 30s linear infinite`. Pause on hover via `animation-play-state`. | Low |
| F&F Hub carousel | Custom + GSAP | Custom carousel: GSAP for slide transitions (500ms crossfade/horizontal), touch swipe via pointer events, dot indicators. Autoplay 5s with pause on hover. | Medium |
| Contact hero carousel | Custom | CSS crossfade between 4 background images, 6s interval, auto-advancing. | Low |
| Card hover lift | CSS transitions | `translateY(-4px)` + shadow deepen, 400ms `cubic-bezier(0.16, 1, 0.3, 1)`. Pure CSS `transition` on hover. | Low |
| Nav scroll background | CSS + JS | Scroll listener at 80px threshold toggles class for `backdrop-filter: blur(12px)` + background transition. | Low |
| Product table row stagger | GSAP + ScrollTrigger | Table rows stagger in at 0.04s intervals on viewport entry. | Low |
| Partner logo stagger | GSAP + ScrollTrigger | Logos fade in sequentially from left, 0.08s stagger. | Low |
| Page transitions | CSS | Route-level fade-in, opacity 0→1 over 400ms. | Low |

---

## State & Logic Plan

### Product Search & Filter (Ingredients Library)

- **State**: `searchQuery` (string, debounced 200ms), `currentPage` (number), `sortConfig` ({ column, direction })
- **Derived**: Filtered products array computed from searchQuery matched against Name, CAS, FEMA fields. Sorted by sortConfig.
- **Storage**: In-memory only (no persistence needed)
- **Logic**: Client-side filtering of static 50-item product array. Pagination slices filtered array into pages of 20.

### Product Detail Routing

- **Route**: `/products/:id` where id is the product code (e.g., `AR-029`)
- **Data**: Static product data imported from a data file. Component looks up product by code from route param.
- **404 handling**: Redirect to `/products` if product not found.

### Carousel State (F&F Hub + Contact Hero)

- **State**: `activeIndex` (number), `isAutoPlaying` (boolean), `direction` ('prev' | 'next')
- **Logic**: Auto-advance interval (5s for F&F Hub, 6s for Contact). Pause on mouseenter, resume on mouseleave. Touch swipe via pointer down/move/up tracking deltaX.
- **Transition**: GSAP animates outgoing and incoming slides simultaneously.

### Scroll-Triggered Animation System

- **Pattern**: `useScrollReveal` hook encapsulates IntersectionObserver → GSAP trigger logic.
- **Config**: Each section passes `direction` ('up' | 'left' | 'right'), `distance` (px), `stagger` (s), `threshold` (0–1).
- **Cleanup**: GSAP timeline killed on component unmount to prevent memory leaks.

---

## Other Key Decisions

### Routing Strategy
- React Router v7 with 5 routes: `/`, `/products`, `/products/:id`, `/facilities`, `/contact`
- Product detail uses URL parameter for deep-linking
- Scroll-to-top on route change via `useEffect` in PageLayout

### Data Architecture
- All product data (50 items) stored in a static TypeScript data file (`src/data/products.ts`)
- Facility data, office data, and carousel content in separate static data files
- No API calls — all data is bundled at build time

### Font Loading
- Playfair Display, Inter, Cormorant Garamond loaded via Google Fonts `<link>` in `index.html`
- `font-display: swap` to prevent FOIT

### Image Strategy
- Hero/facility/carousel images generated via AI and placed in `public/images/`
- Office gallery images generated via AI
- All images use `loading="lazy"` except above-the-fold hero images
- F&F Hub slide illustrations generated as abstract warm-toned images

### Mobile-First Responsive
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Navigation collapses to hamburger menu below 768px
- Product table becomes horizontally scrollable on mobile
- Facility distribution table scrolls horizontally on small screens
- Card grids collapse: 4→2→1 columns, 2→1 columns

### Performance Considerations
- Route-based code splitting via `React.lazy()` + `Suspense`
- Images served as WebP with JPEG fallback
- GSAP ScrollTrigger batch for sections with many children (product table rows, partner logos) to reduce observer overhead
- Lenis RAF loop synced with GSAP ticker for smooth scroll + animation coherence
