
# Facility Info Page Development Plan

## Project Overview
Create a full English facility introduction page `FacilityInfo.html` showcasing ZOTEQ's production capabilities, laboratories, distribution network, and equipment.

---

## Design Requirements

### Brand Consistency
- Follow **DESIGN.md** specifications
- Share navigation and footer with other pages
- Match visual style of `index.html`, `ProductSearch_UI.html`, and `ProductInfo.html`
- All content in English
- Use **awwwards/impeccable/taste** design skills

### Color System
- Primary: `#e07a5f` (accent)
- Secondary: `#3d8b8b` (ocean)
- Background: `#faf9f7` (bg-primary)
- Text: `#1a1a1a` (text-primary)

### Typography
- Headings: 'Playfair Display', serif
- Body: 'Inter', sans-serif
- Follow DESIGN.md type scale

---

## Page Structure (5 Sections)

### Section 1: Production Bases
**Chongqing Production Base**
- Founded in 2004, Longqiao Industrial Park, Fuling District
- National high-tech and specialized innovative enterprise
- 180-mu production base, 5,000 tons annual capacity
- 30+ marketed products, 100+ manufacturable varieties
- ISO, REACH, KOSHER, HALAL certifications
- **Image placeholder x 2**

**Malaysia Production Base**
- Professional F&amp;F ingredients supplier
- Based in Selangor, Malaysia
- Global food and F&amp;F industry customers
- Complete production lines and R&amp;D labs
- International quality standards, reliable global supply
- **Image placeholder x 2**

**Self-produced Products Link**
- CTA button linking to ProductSearch_UI.html

---

### Section 2: Four Laboratories
**Synthetic Fragrance Lab (Chongqing)**
- **Icon placeholder** + description
- **Image placeholder x 1**

**Biosynthesis Lab (Shanghai)**
- **Icon placeholder** + description
- **Image placeholder x 1**

**Aroma Blending Lab (Shanghai)**
- **Icon placeholder** + description
- **Image placeholder x 1**

**Plant Extraction Lab (Chongqing)**
- **Icon placeholder** + description
- **Image placeholder x 1**

---

### Section 3: Four Distribution Sites
**Beijing**
- Headquarters, Finance, Sales
- **Icon placeholder**

**Shanghai**
- Sales, Procurement, Warehousing, QC, Samples
- **Icon placeholder**

**Guangzhou**
- Sales, Warehousing
- **Icon placeholder**

**Chongqing**
- Production, Warehousing, Sales, Procurement, Data
- **Icon placeholder**

**International Brand Logos**
- Logo wall (placeholders)
- **Image placeholder x 4+**

---

### Section 4: Eight Lab Equipment (BENTO Layout)
**Full screen bento grid with square images**
1. Gas Chromatography
2. GC-MS (Gas Chromatography-Mass Spectrometry)
3. Liquid Chromatography
4. Densitometer
5. Polarimeter
6. Automatic Acid Value Tester
7. Automatic Polarimeter
8. Soft Light Box

Each with square image placeholder

---

### Section 5: Alibaba Store
**Main Section**
- Large store image placeholder
- CTA link to store

**Eight Feature Icons**
1. Premium - High quality
2. Reliable - Trusted strength
3. Professional - Deep expertise
4. Certified - International certifications
5. Diverse - Rich product categories
6. Ample - Sufficient inventory
7. Fast - Efficient shipping
8. Customizable - Custom services

---

## Technical Implementation

### File Structure
```
FacilityInfo.html (new file)
├── Include components/nav.html (shared header)
├── Include components/footer.html (shared footer)
├── Custom CSS styles
└── JavaScript for animations
```

### Key Components
1. **Hero Section** - Page title and introduction
2. **Production Bases** - Two-column card layout
3. **Laboratories** - Icon + card grid
4. **Distribution Sites** - Map/grid with icons
5. **Equipment Bento** - Full screen masonry grid
6. **Alibaba Store** - Feature icons + CTA

### Animations
- Scroll reveal animations
- Hover effects on interactive elements
- Smooth transitions
- Counter animations (if applicable)

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (1024px), lg (1440px)
- Flexible grid layouts
- Touch-friendly interactions

---

## Development Steps

1. **Set up basic structure**
   - HTML5 doctype, lang="en"
   - Include shared nav and footer
   - Link to nav.css and footer.css
   - Add basic CSS variables

2. **Create hero section**
   - Page title: "Our Facilities"
   - Breadcrumb navigation
   - Background pattern

3. **Build production bases section**
   - Two-column card layout
   - Image placeholders (use trae API)
   - Certification badges
   - Link to products

4. **Implement laboratories section**
   - Four-card grid
   - SVG icons for each lab
   - Images + descriptions

5. **Develop distribution sites section**
   - Site cards with function icons
   - International brand logo wall

6. **Create equipment bento section**
   - Full screen square grid
   - Hover effects
   - Scroll animations

7. **Build Alibaba store section**
   - Large hero image
   - Eight feature icon cards
   - CTA button

8. **Add animations and polish**
   - Scroll reveal
   - Micro-interactions
   - Responsive testing

9. **Visual audit**
   - Check against DESIGN.md
   - Cross-device testing
   - Accessibility review

---

## Image Placeholder Strategy

Use trae API for placeholder images:
```
https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt={desc}&image_size={size}
```

Image sizes:
- Landscape: landscape_16_9
- Square: square_hd
- Portrait: portrait_4_3

---

## Dependencies & Considerations

### External Resources
- Google Fonts: Playfair Display, Inter
- SVG icons (inline or from system icons)
- Placeholder images via trae API

### Risk Mitigation
- Keep images optimized for web
- Ensure responsive behavior
- Maintain brand consistency
- Test across browsers/devices

---

## Success Criteria

1. All five sections implemented as specified
2. Visual style matches existing pages
3. Full English content
4. Responsive and accessible
5. All links and interactions working
6. Passes visual audit
