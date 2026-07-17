# ZOTEQ — Design Analysis & Specification

## 1. Site Definition

### Overview
ZOTEQ is a B2B enterprise website for a Flavor & Fragrance (F&F) ingredients specialist company. It serves as a digital flagship showcasing the company's dual manufacturing bases, 200+ product portfolio, R&D capabilities, and global distribution network. The site must convey scientific credibility, manufacturing scale, and a blend of "nature meets science" brand philosophy — sophisticated yet approachable, technical yet elegant.

### Pages

1. **Homepage** (`/`) — Brand introduction, mission, new product launches, capabilities overview (F&F Hub carousel), partner logos, Explore ZOTEQ grid.
2. **Ingredients Library** (`/products`) — Light-themed searchable product catalog with 50 F&F ingredients, filterable by category (Biobased/Synthetic/EU Natural/US Natural). Product detail page on click.
3. **Product Detail** (`/products/:id`) — Detailed product page with essential information, technical specifications, related products, and CTAs.
4. **Our Facilities** (`/facilities`) — Manufacturing bases, R&D labs, distribution network table, partner logos.
5. **Contact** (`/contact`) — Office locations (5 APAC offices), direct contact info, gallery of offices.

### Content Structure

| Page | Sections |
|------|----------|
| Homepage | Hero, Mission, New Launches (4 cards), Explore ZOTEQ Marquee, Explore Grid (4 cards), F&F Hub Carousel (4 slides), Partners Logo Bar |
| Products | Page Header, Search Bar, Product Table (50 items with pagination/infinite scroll), Category Color Legend |
| Product Detail | Breadcrumb, Product Header, Essential Info (3 cards), Technical Specs, Related Products (4), CTA Section |
| Facilities | Hero, Dual Production Bases (2), R&D Laboratories (4), Distribution Network Table, Partners |
| Contact | Hero with Carousel, Office Gallery (3), Our Offices (5 locations + sidebar), Direct Contact, Response Promise |

### Shared Components
- Navigation Bar (fixed, with logo, links, search, CTA)
- Footer (logo, quick links, contact, copyright)

---

## 2. Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Accent | `#e07a5f` | Primary CTA, interactive highlights, active states |
| Accent Light | `#f2a285` | Hover states, secondary highlights |
| Accent Dark | `#c4604a` | Pressed states, emphasis |
| Ocean | `#3d8b8b` | Secondary accent, links, info elements |
| Ocean Light | `#5aadad` | Hover states for ocean elements |
| Sand | `#d4a574` | Warm neutrals, decorative backgrounds, category tags |
| Bg Primary | `#fafafa` | Main page background (light pages) |
| Bg Dark | `#1a1a1a` | Dark theme background (ProductSearch) |
| Text Primary | `#1a1a1a` | Headings, primary body text |
| Text Secondary | `#6b6b6b` | Captions, secondary text |
| Text Light | `#fafafa` | Text on dark backgrounds |
| Category Biobased | `#3d8b8b` | Green tint for biobased products |
| Category Synthetic | `#4a7bbd` | Blue tint for synthetic products |
| Category EU Natural | `#d4a574` | Amber tint for EU natural |
| Category US Natural | `#8b6fa8` | Purple tint for US natural |

### Typography

| Token | Font | Role |
|-------|------|------|
| Display | Playfair Display, serif | Hero headlines, section titles, brand display — elegant, editorial |
| Body | Inter, sans-serif | Body copy, UI elements, nav, labels — clean, modern, legible |
| Accent Italic | Cormorant Garamond, serif | Hero taglines, decorative italic quotes — refined, literary |

**Type Scale:**
- H1 (Hero): 64px, weight 500, letter-spacing -1.5px
- H2 (Section): 40px, weight 500, letter-spacing -0.5px
- H3 (Card): 24px, weight 500
- Body: 16px, weight 400, line-height 1.6
- Caption/Label: 13px, weight 500, uppercase, letter-spacing 0.8px
- Nav: 15px, weight 500

### Spacing

- Section vertical padding: 96–120px
- Content max-width: 1280px, centered
- Horizontal page padding: 24px (mobile) → 48px (tablet) → 80px (desktop)
- Card internal padding: 32px
- Grid gap: 24px (standard), 32px (large sections)
- Border radius: 16px (cards), 100px (pill buttons), 8px (small elements)

### Visual Identity
- **Surfaces**: Large rounded cards (16px), soft subtle shadows (`0 4px 24px rgba(0,0,0,0.06)`)
- **Transitions**: `cubic-bezier(0.16, 1, 0.3, 1)` — smooth deceleration feel
- **Overall mood**: Warm, scientific, trustworthy, premium B2B enterprise
- **Border treatments**: 1px subtle borders (`rgba(0,0,0,0.08)`) on light backgrounds; `rgba(255,255,255,0.1)` on dark
- **Scroll behavior**: Smooth scroll, lenis-like feel

---

## 3. Shared Components

### Navigation

- **Position**: Fixed top, z-index 100
- **Background**: Initially transparent, on scroll → `rgba(250,250,250,0.92)` with `backdrop-filter: blur(12px)` and bottom border
- **Height**: 72px
- **Layout**: Flex row, space-between
  - Left: ZOTEQ logo (SVG, ~120px wide)
  - Center: Links — Home | Products | Facilities | Contact (15px, weight 500, letter-spacing 0.3px)
  - Right: Search bar (pill shape, 200px wide, magnifying glass icon, placeholder "Search ingredients...") + "Get in Touch" pill CTA (Accent background, white text)
- **Link hover**: Color transitions to Accent, 300ms ease
- **CTA hover**: Background lightens to Accent Light, 300ms ease
- **Transition on scroll**: Background fades in over 200ms after scrolling past 80px

### Footer

- **Background**: `#1a1a1a` (dark)
- **Layout**: 3-column grid on desktop, stacked on mobile
  - Col 1: ZOTEQ logo (white version) + short tagline "Flavor & Fragrance Specialist"
  - Col 2: Quick links — Home, Products, Facilities, Contact
  - Col 3: Contact info — Email, Phone, Address
- **Bottom bar**: Copyright "© 2025 ZOTEQ. All rights reserved." centered, Text Secondary color
- **Padding**: 80px top, 40px bottom
- **Link color**: `#a0a0a0`, hover: `#fafafa`, transition 200ms

---

## 4. Global Interactions & Animations

### Smooth Scroll
- Library: Lenis smooth scroll, lerp 0.1
- Creates fluid, weighted scrolling experience across all pages

### Scroll-Triggered Reveal
- Elements animate on first viewport entry
- Default: `opacity: 0 → 1`, `translateY(40px) → 0`, duration 0.8s, easing `cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger for groups: 0.1s between siblings
- Trigger: IntersectionObserver at threshold 0.15
- One-shot (does not reverse on scroll-out)

### Text Reveal Animation (Hero Elements)
- Headlines use word-by-word or character reveal
- Effect: Each word fades in + translateY(30px→0), stagger 0.08s between words
- Duration: 0.7s per word, easing `cubic-bezier(0.16, 1, 0.3, 1)`
- Trigger: On page load, 300ms initial delay

### Marquee Animation (Explore ZOTEQ Section)
- Continuous horizontal scroll, seamless loop
- Speed: ~50px/s, direction: right-to-left
- Text: "Fragrance • Flavor • Innovation • Quality • Nature • Science • "
- Pause on hover
- Implementation: Duplicate content, CSS animation translateX(-50%), linear, 30s infinite

### Carousel Behavior (F&F Hub, Contact Hero)
- Swipe-enabled on touch devices
- Arrow navigation on desktop (left/right arrows, positioned at edges)
- Dot/pagination indicators at bottom
- Slide transition: 500ms, easing ease-in-out, crossfade or horizontal slide
- Autoplay: 5s interval, pauses on hover

### Hover Effects
- Cards: `translateY(0) → translateY(-4px)`, shadow deepens, transition 400ms
- Buttons: Background lightens, scale 1.02, 200ms
- Links: Color transition to Accent, 200ms
- Product table rows: Background subtle highlight (`rgba(224,122,95,0.06)`), 150ms

### Loading States
- Page transitions: Fade in from opacity 0, 400ms
- Product table: Skeleton loader (pulsing gray rows) while data loads

---

## 5. Page: Homepage

### Section: Hero

**Layout**: Full-viewport width, min-height 90vh, flex column, vertically centered content.

**Background**: Full-screen image with overlay gradient (`linear-gradient(to bottom, rgba(26,26,26,0.55), rgba(26,26,26,0.75))`). Image shows abstract molecular/aromatic essence — warm amber and teal tones, soft bokeh, scientific yet organic feel.

**Content** (centered, max-width 800px):
- **Tagline badge**: Pill shape, Accent background, white text, 12px — "F&F INGREDIENTS SPECIALIST" with a small animated pulse dot (ESG-inspired, soft glow)
- **Headline**: "ZOTEQ" in Display font, 72px, weight 500, white — followed by "Flavor & Fragrance" in Accent color, and "Specialist" in white
- **Tagline**: Cormorant Garamond italic, 22px, white/80% — *"Nature meets science — creating the essence of tomorrow."*
- **Meta stats**: 3 items in a horizontal row, spaced evenly
  - "SPECIALIZING IN" label (Caption style, white/60%) + "200+ Premium Ingredients" (Body, white)
  - "GLOBAL REACH" label + "5 Locations Across Asia"
  - "SINCE 2018" label + "Dual Production Bases"
- **CTA**: Pill button, Accent background, white text, 16px — "Explore our ingredients →"

**Entrance animation**: Headline text reveal (word-by-word, 0.08s stagger), badge slides down from top (0.5s delay), stats fade up (0.3s stagger after headline), CTA fades up last (1.2s delay).

---

### Section: Mission

**Layout**: Two-column asymmetric, 40/60 split. Left column has label + heading; right column has body text.

**Background**: Bg Primary (#fafafa)

**Content**:
- **Label**: "— Our Mission —" in Caption style, Accent color
- **Headline** (left, Display font): "Bridging nature and innovation"
- **Body** (right): Long mission statement in Body font, Text Secondary — *"We are a dedicated F&F ingredients supplier committed to providing high-quality aroma chemicals, natural isolates, and specialty ingredients to customers worldwide. With dual production bases in China and Malaysia, a state-of-the-art R&D network, and a robust supply chain across Asia-Pacific, we deliver consistency, compliance, and creativity in every shipment."*

**Entrance**: Left column fades in from left; right column fades in from right; 0.2s stagger.

---

### Section: New Launches

**Layout**: Section heading + 4-column card grid (2 columns on tablet, 1 on mobile).

**Background**: Bg Primary, subtle top border (1px rgba)

**Content**:
- **Section label**: "— New Launches —" Caption style, Accent
- **Section heading**: "Latest Ingredients" H2, Display font
- **4 Product Cards**:
  - Card 1: "Geranyl Acetate 60" | Code: C013 | "A premium biobased ingredient with exceptional floral-fruity profile."
  - Card 2: "Limonene" | Code: C005 | "Natural citrus terpene with versatile applications."
  - Card 3: "Geraniol" | Code: C003 | "Naturally occurring monoterpene alcohol with sweet rose scent."
  - Card 4: "Gamma-Decalactone" | Code: C004 | "Rich peach-like lactone for flavor formulations."

**Card design**:
- White background, 16px border-radius, subtle shadow
- Top: Product category tag (pill, background tinted by category)
- Middle: Product name (H3, weight 500), Code (Caption, Text Secondary), Description (Body, Text Secondary)
- Bottom: "View Details →" link in Accent color
- Hover: lift -4px, deeper shadow, 400ms ease

**Entrance**: Cards stagger in from bottom, 0.12s between each.

---

### Section: Explore ZOTEQ Marquee

**Layout**: Full-width horizontal band, single line of scrolling text.

**Background**: Accent Dark (#c4604a)

**Content**: Continuous scrolling text — "Fragrance • Flavor • Innovation • Quality • Nature • Science • " — white, Display font, 48px, weight 500.

**Animation**: CSS translateX marquee, 30s linear infinite, pause on hover.

---

### Section: Explore ZOTEQ Grid

**Layout**: 2×2 grid of large cards, each card fills half width.

**Background**: Bg Primary

**Content** (4 cards):
1. **Global Manufacturing** | "Discover our state-of-the-art production facilities across Asia — from Chongqing to Malaysia." | Icon: Factory/industrial
2. **Product Portfolio** | "Browse our comprehensive range of 200+ aroma chemicals, natural isolates, and specialty ingredients." | Icon: Beaker/flask
3. **Quality & Certifications** | "ISO, FSSC, KOSHER, HALAL, REACH — our commitment to the highest standards." | Icon: Shield/checkmark
4. **Contact Our Team** | "Reach out for samples, technical data, or custom sourcing solutions." | Icon: Chat/team

**Card design**:
- White background, 16px radius, 32px padding
- Top: Icon in Accent color, 40px size (SVG line icons)
- Title: H3, weight 500
- Description: Body, Text Secondary
- Bottom: Arrow link "Explore →" in Accent
- Hover: translateY(-4px), shadow deepens

**Entrance**: Grid items stagger from bottom-left to bottom-right, 0.15s stagger.

---

### Section: F&F Hub Carousel

**Layout**: Full-width section with heading + carousel of 4 slides.

**Background**: Subtle warm gradient from Bg Primary to a very light Sand tint (`linear-gradient(180deg, #fafafa 0%, #f5efe8 100%)`)

**Content**:
- **Section heading**: "F&F Hub" H2, Display font
- **Subtitle**: "Your one-stop partner for flavor and fragrance ingredients sourcing" in Cormorant Garamond italic, 18px, Text Secondary

**4 Carousel Slides**:
1. **Manufacturer** | "Dual production bases with 120,000 sqm site, 5,000+ tons annual capacity, and 100+ product varieties." | Tags: Chongqing Base, Malaysia Base, Gamma-Lactone, Scale Production, Quality Control, REACH Registered
2. **Trader & Distributor** | "Extensive global sourcing network with long-term partnerships across Asia, Europe, and the Americas." | Tags: Global Sourcing, Supply Chain, Multi-region, Competitive Pricing, Logistics, Market Intelligence
3. **R&D & Innovation** | "Four specialized research laboratories driving innovation in chemical synthesis, biosynthesis, and natural extraction." | Tags: Chemical Synthesis, Biosynthesis, Odor Optimization, Plant Extraction, Application Lab, Custom Development
4. **Sampling & QC** | "Fast sampling and rigorous quality control across all locations, ensuring every batch meets specification." | Tags: Rapid Sampling, QC Testing, Sensory Panel, Stability Test, Certificate of Analysis, Batch Traceability

**Slide design**:
- Large card, 70% viewport width on desktop, centered
- Left: Text content (title H3, description Body, tags as pills)
- Right: Illustration/image related to the capability (abstract, warm tones)
- Tags: Small pills with category-tinted backgrounds
- Navigation: Left/right arrow buttons at card edges, dot pagination below

**Entrance**: Carousel fades in as a unit.

---

### Section: Partners Logo Bar

**Layout**: Full-width band, logos in a single horizontal row, centered.

**Background**: White

**Content**:
- **Label**: "Trusted by Leading Brands Worldwide" — Caption style, centered
- **Logos**: 8 partner logos in a row — Bedoukian Inc, Capua S.r.l., Emerald Kalama, Evera by Citrosuco, Firmenich S.A., Givaudan S.A., Nippon Zeon, Synarome S.A.

**Design**: Grayscale logos, uniform height (32px), generous horizontal spacing (48px). On hover, logo opacity increases from 0.5 to 0.9.

**Note**: Logos will be rendered as text labels in the specified typography since brand logos are not available as image assets.

**Entrance**: Logos fade in sequentially from left, 0.08s stagger.

---

## 6. Page: Ingredients Library

### Section: Product Header

**Layout**: Full-width, background with subtle pattern/texture.

**Background**: Light warm tint, `linear-gradient(135deg, #fafafa 0%, #f0ebe5 100%)`

**Content**:
- **Title**: "Exploring Our Own In-House Products" H1, Display font
- **Subtitle**: "50+ premium ingredients across biobased, synthetic, and natural categories" Body, Text Secondary
- **Search Bar**: Large pill-shaped input, 480px wide, placeholder "Search by ingredient name, CAS, FEMA...", magnifying glass icon, subtle border, focus: Accent border glow

---

### Section: Product Table

**Layout**: Full-width table, max-width container.

**Background**: Bg Primary

**Table Columns**: Ingredient | Category | CAS | FEMA | REACH Status | Action

**Row design**:
- Alternating row backgrounds: white and #f5f5f5
- Ingredient: Name in weight 500 + Code pill (small, background tinted)
- Category: Colored pill (Biobased=Ocean green, Synthetic=blue, EU Natural=amber, US Natural=purple)
- CAS: Monospace font, 14px
- FEMA: Monospace font, 14px
- REACH: "Yes" with green check icon or "Non" with gray dash
- Action: "View →" link in Accent

**Interaction**:
- Hover: Row background highlights to `rgba(224,122,95,0.06)`, transition 150ms
- Click on row: Navigates to product detail
- Search: Real-time filter as user types (debounced 200ms)
- Sort: Click column headers to sort

**Pagination**: 20 items per page, numbered pagination at bottom.

**Entrance**: Table rows stagger in from top, 0.04s between rows.

---

## 7. Page: Product Detail

### Section: Product Header

**Layout**: Two-column, 50/50. Left: Product info; Right: Key specs.

**Background**: Warm gradient similar to Ingredients Library header.

**Content** (example for Geranyl Acetate 60):
- **Breadcrumb**: "Home / Products / Geranyl Acetate 60" — Caption style, Text Secondary
- **Category tag**: "Biobased" pill, Ocean green background
- **Code tag**: "Code: C013" pill, Sand background
- **Product name**: H1, Display font
- **Synonym**: Body, Text Secondary
- **Key specs pills**: REACH: Yes (green), EINECS, CAS, FEMA, Molecular Formula, Molecular Weight

---

### Section: Essential Information

**Layout**: 3-column card grid.

**Background**: Bg Primary

**3 Cards**:
1. **Odor & Application** | Odor Description + Application areas
2. **Packing & Storage** | Appearance, Shelf Life, Storage conditions, Package sizes
3. **Properties** | Flash Point, Boiling Point

**Card design**: White, 16px radius, 32px padding, top accent border (4px, Accent color), icon at top-left.

---

### Section: Technical Specifications

**Layout**: Full-width table.

**Content** (for Geranyl Acetate 60):
| Property | Value |
|----------|-------|
| Purity by GC | 98-100% |
| Appearance | Colorless to slightly yellow liquid |
| Solubility (25°C) | 1ml sample dissolves in 9ml of 70% ethanol |
| Specific Gravity | 0.891-0.901 @ 20/20°C |
| Refractive Index | 1.456-1.464 @ 20°C |
| Acid Value | Max 1.0 |

**Design**: Clean two-column table, left column in Caption style (uppercase, Text Secondary), right column in Body.

---

### Section: Related Products

**Layout**: Horizontal scroll row of 4 product cards.

**Content**: 4 related products (Linalool, Citronellol, Geraniol, Neryl Acetate)

**Card design**: Compact version of product cards, 280px wide, horizontal layout.

---

### Section: CTA

**Layout**: Centered content, full-width band.

**Background**: Accent Dark, white text.

**Content**:
- **Heading**: "Ready to explore more ingredients?" H2, white
- **Description**: Body, white/80%
- **Buttons**: "Browse All Products" (white bg, dark text) + "Contact Our Team" (transparent, white border)

---

## 8. Page: Our Facilities

### Section: Hero

**Layout**: Full-width, 60vh height.

**Background**: Image of manufacturing facility exterior + dark overlay.

**Content**:
- **Headline**: "Global Manufacturing & Distribution" H1, white — "Manufacturing" in Accent color
- **Description**: Body, white/80%
- **CTAs**: "View Introduction" (Accent pill) + "Products List" (transparent pill, white border)

---

### Section: Dual Production Bases

**Layout**: Two-column, side by side.

**Background**: Bg Primary

**Content**:
- **Section heading**: "Dual Production Bases" H2
- **Section subtitle**: Body, Text Secondary

**Base 1: Chongqing** (left column):
- Title + "Est. 2018" badge
- Description paragraph
- Stats: 120k sqm | 5,000 Tons/Year | 100+ Varieties | 150+ Employees
- Certification pills: ISO, REACH, FSSC, KOSHER, HALAL

**Base 2: Malaysia** (right column):
- Title + "Est. 2019" badge
- Description paragraph
- Stats: 30+ Varieties | 2,000 Tons/Year | 50+ Partners
- CTA: "Own-Products List →"

**Entrance**: Left base slides in from left, right from right, 0.3s stagger.

---

### Section: R&D Laboratories

**Layout**: 2×2 grid of lab cards.

**Background**: Warm gradient (same as F&F Hub)

**Content**: 4 lab cards
1. Chemical Synthesis Lab (Flagship) — Chongqing
2. Biosynthesis Lab (Bio-Technology) — Shanghai
3. Odor Optimization Lab (Art & Technology) — Shanghai
4. Plant Extraction Lab (Natural Excellence) — Chongqing

**Card design**:
- White bg, 16px radius
- Top: Lab type badge (Accent for flagship, Ocean for others)
- Title: H3
- Location: Caption, Text Secondary with pin icon
- Description: Body

**Entrance**: Grid items stagger, 0.15s.

---

### Section: Distribution Network

**Layout**: Full-width table.

**Content**:
- **Section heading**: "Distribution Network" H2
- **Section subtitle**: Body

**Table**: 5 locations × 8 functions
| Location | HQ | Sales | Procurement | Production | Warehouse | I.T. | Sampling | Q.C. |
| BEIJING | ✓ | ✓ | | | | | | |
| SHANGHAI | | ✓ | ✓ | | ✓ | ✓ | ✓ | ✓ |
| GUANGZHOU | | ✓ | | | ✓ | | | |
| CHONGQING | | ✓ | ✓ | ✓ | ✓ | ✓ | | ✓ |
| SELANGOR | | ✓ | | ✓ | ✓ | | | |

**Design**: Clean table with checkmarks (✓ in Ocean color) and empty cells. Header row with light background.

---

## 9. Page: Contact

### Section: Hero

**Layout**: Full-width, 50vh, with background image carousel (4 images cycling).

**Background**: Office/city images (Shanghai, Guangzhou, etc.) with dark overlay.

**Content**:
- **Label**: "Contact" Caption, Accent
- **Headline**: "Let's talk" H1, white
- **Subtitle**: Body, white/80%

**Carousel**: 4 background images, auto-advancing every 6s, crossfade transition.

---

### Section: Office Gallery

**Layout**: 3-column image grid.

**Content**: 3 office photos
1. Shanghai Office — "Our Shanghai Office in east China"
2. Chongqing Office — "West China operations center"
3. Guangzhou Hub — "South China regional office"

**Design**: Images with 16px radius, aspect ratio 4:3, caption below each.

---

### Section: Our Offices

**Layout**: Two-column — office list (left, 65%) + sidebar (right, 35%).

**Background**: Bg Primary

**Content**:
- **Section title**: "Our offices" H2 with map pin icon
- **Section description**: Body

**5 Office Locations** (stacked cards):
1. Beijing — Headquarters | Room 1602, Unit 2, No. 6, Linshijia, Lincui Road, Beijing, 100101
2. Shanghai — East China | No. 285 Yeji Road, Shanghai, 200444
3. Guangzhou — South China | Room 1501, South Block, Xindacheng Plaza, Guangzhou, 510000
4. Chongqing — West China | Group 4/5, Rong'gui Village, Chongqing, 408000
5. Malaysia — Southeast Asia | PT 16143, Jalan Telok Mengkuang, 42500 Telok Panglima Garang, Selangor, Malaysia

**Sidebar**:
- "Prefer a call?" card with office hours info

**Card design**: White, 16px radius, left accent border (4px, location-tinted), padding 24px.

---

### Section: Direct Contact

**Layout**: Centered content band.

**Background**: Warm Sand tint

**Content**:
- **Title**: "Direct contact" H2
- **Description**: Body
- **Contact items** (horizontal row, 3 items):
  - Mobile: +86 137 0188 5592 (phone icon)
  - WhatsApp: +86 137 0188 5592 (whatsapp icon)
  - Email: info@zoteq.com (email icon)

**Design**: Each contact item is a card with icon, label, and value. Cards have white bg, centered content.

---

### Section: Response Promise

**Layout**: Centered, full-width band.

**Background**: Accent Dark

**Content**:
- **Heading**: "Respond within 24 hours." H2, white
- **Text**: Body, white/80%

---

## 10. Assets

### Images

| ID | Description | Usage |
|----|-------------|-------|
| hero-bg | Abstract molecular essence visualization, warm amber and teal tones, soft bokeh, organic flowing shapes suggesting aroma molecules, scientific yet natural, premium feel | Homepage Hero |
| facility-hero | Aerial view of modern industrial manufacturing complex, clean facilities, surrounded by greenery, warm golden hour lighting, professional photography | Facilities Hero |
| carousel-1 | Shanghai skyline at dusk, modern office buildings, warm ambient lighting | Contact Carousel |
| carousel-2 | Guangzhou cityscape, Pearl River, contemporary architecture, evening atmosphere | Contact Carousel |
| carousel-3 | Chongqing mountain city view, modern infrastructure, dramatic landscape | Contact Carousel |
| carousel-4 | Kuala Lumpur/Selangor modern business district, tropical vegetation, professional setting | Contact Carousel |
| office-shanghai | Modern office interior, reception area, clean minimal design, warm wood tones, natural light | Office Gallery |
| office-chongqing | Industrial office space, modern furnishings, factory visible through windows, professional atmosphere | Office Gallery |
| office-guangzhou | Contemporary office lobby, sleek design, south China aesthetic, warm lighting | Office Gallery |
| hub-manufacturer | Modern chemical manufacturing interior, stainless steel equipment, clean organized facility, professional lighting | F&F Hub Slide 1 |
| hub-trader | Global shipping containers at port, logistics network, aerial view, warm tones | F&F Hub Slide 2 |
| hub-rnd | Modern research laboratory, glass equipment, scientists at work, clean bright environment | F&F Hub Slide 3 |
| hub-qc | Quality control testing area, analytical instruments, organized sample racks, professional | F&F Hub Slide 4 |
| lab-synthesis | Chemical synthesis laboratory, reaction vessels, molecular models, warm lighting | R&D Section |
| lab-bio | Biotechnology lab, bioreactors, green plant samples, modern equipment | R&D Section |
| lab-odor | Sensory evaluation room, perfume testing strips, elegant presentation | R&D Section |
| lab-extraction | Plant extraction facility, botanical raw materials, distillation equipment, natural elements | R&D Section |

### Videos
None required for this project.
