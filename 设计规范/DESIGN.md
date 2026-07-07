# DESIGN.md

## 1. Brand Identity

### Brand Name
**Aromatic Ingredients**

### Tagline
Your Trusted Partner in Premium Flavor Solutions

### Mission
Delivering exceptional quality ingredients to empower food and fragrance creators worldwide.

### Brand Personality
- Professional
- Trustworthy
- Innovative
- Customer-centric
- Premium

---

## 2. Color System

### Primary Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--accent` | #e07a5f | Primary brand color, CTAs, highlights |
| `--accent-light` | #f2a285 | Light variation, hover states |
| `--accent-dark` | #c4604a | Dark variation, active states |

### Secondary Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--ocean` | #3d8b8b | Secondary accent, complementary color |
| `--ocean-light` | #5aadad | Light ocean |
| `--sand` | #d4a574 | Warm accent, decorative elements |

### Neutral Palette
| Variable | Value | Usage |
|----------|-------|-------|
| `--text-primary` | #2d2d2d | Main body text, headings |
| `--text-secondary` | #5a5a5a | Secondary text, descriptions |
| `--text-tertiary` | #8a8a8a | Tertiary text, placeholders |
| `--white` | #ffffff | Background, cards |
| `--bg-primary` | #fafafa | Main page background |
| `--bg-secondary` | #f5f5f5 | Secondary background |
| `--bg-dark` | #1a1a1a | Dark sections, footer |

### Semantic Roles
| Role | Color |
|------|-------|
| Success | #22c55e |
| Error | #ef4444 |
| Warning | #f59e0b |
| Info | #3b82f6 |

### Accessibility
- Minimum contrast ratio: 4.5:1 for text
- Large text (18pt+): 3:1 minimum

---

## 3. Typography

### Font Families
| Family | Weight | Usage |
|--------|--------|-------|
| 'Playfair Display', serif | 400-600 | Headings, display text |
| 'Inter', system-ui, sans-serif | 300-700 | Body text, UI elements |
| 'JetBrains Mono', monospace | 400 | Code, technical text |

### Type Scale
| Variable | Size | Line Height | Usage |
|----------|------|-------------|-------|
| `--text-xs` | 0.75rem | 1rem | Captions, small text |
| `--text-sm` | 0.875rem | 1.25rem | Secondary text |
| `--text-base` | 1rem | 1.6rem | Body text |
| `--text-lg` | 1.125rem | 1.75rem | Large body |
| `--text-xl` | 1.25rem | 1.75rem | Subheadings |
| `--text-2xl` | 1.5rem | 2rem | Section headings |
| `--text-3xl` | 2rem | 2.25rem | Page headings |
| `--text-4xl` | 2.5rem | 2.75rem | Hero headings |
| `--text-5xl` | 3rem | 3.25rem | Large hero text |

### Letter Spacing
- Body text: 0.01em
- Headings: -0.025em
- Uppercase text: 0.06em

---

## 4. Spacing System

### Base Unit
```
--space-unit: 8px;
```

### Spacing Scale
| Variable | Value | Usage |
|----------|-------|-------|
| `--space-xs` | calc(var(--space-unit) * 1) | Small gaps |
| `--space-sm` | calc(var(--space-unit) * 2) | Minor gaps |
| `--space-md` | calc(var(--space-unit) * 4) | Standard gaps |
| `--space-lg` | calc(var(--space-unit) * 6) | Major gaps |
| `--space-xl` | calc(var(--space-unit) * 8) | Section spacing |
| `--space-2xl` | calc(var(--space-unit) * 12) | Large sections |
| `--space-3xl` | calc(var(--space-unit) * 16) | Hero sections |

### Container Constraints
- Max width: 1600px
- Content padding: 24px (desktop), 16px (mobile)

---

## 5. Components

### Buttons

#### Primary Button
- Background: `var(--accent)`
- Text: `var(--white)`
- Padding: 14px 28px
- Border-radius: 100px (pill-shaped)
- Hover: Scale 1.05, shadow increase

#### Secondary Button
- Background: transparent
- Border: 2px solid `var(--accent)`
- Text: `var(--accent)`
- Padding: 14px 28px
- Border-radius: 100px (pill-shaped)
- Hover: Background `var(--accent)`, Text `var(--white)`

### Cards

#### Standard Card (16px)
- Background: `var(--white)`
- Border-radius: 16px
- Shadow: soft elevation
- Padding: 24px
- Hover: Transform +8px, shadow increase

#### Large Card (20px)
- Background: `var(--white)`
- Border-radius: 20px
- Shadow: soft elevation
- Padding: 24px
- Hover: Transform +8px, shadow increase

#### Featured Card
- Background: gradient `linear-gradient(135deg, #e6937a 0%, var(--accent) 100%)`
- Text: `var(--white)`
- Border-radius: 20px
- Hover: Transform +12px, scale 1.01, orange glow shadow

### Navigation
- Fixed at top
- Background: `var(--bg-primary)` with backdrop blur on scroll
- Link color: `var(--text-primary)`
- Active/hover: `var(--accent)`

### Data Cards
- Grid layout: responsive
- Icon size: 56px
- Number font: 'Playfair Display'
- Animation: Counter scroll reveal

---

## 6. Icons & Imagery

### Icon Style
- Line icons, consistent stroke width
- Color: `var(--text-secondary)` default, `var(--accent)` on hover
- Size: 24px (standard), 56px (card icons)
- Hover: Scale 1.1, rotate 5deg

### Image Treatment
- Border-radius: 12px
- Shadow: subtle elevation
- Hover: Scale 1.02

### Illustration Style
- Clean, modern aesthetic
- Consistent color palette
- Minimal detail

---

## 7. Motion

### Duration
- Micro-interactions: 0.2-0.3s
- Transitions: 0.4-0.6s
- Page transitions: 0.8-1s

### Easing Curves
| Variable | Value | Usage |
|----------|-------|-------|
| `--ease-out-expo` | cubic-bezier(0.16, 1, 0.3, 1) | Main transitions |
| `--ease-out-cubic` | cubic-bezier(0.4, 0, 0.2, 1) | Secondary transitions |

### Animation Types
- Fade slide up: `fadeSlideUp`
- Counter animation: `animateCounter`
- Pulse: `pulse`
- Wave: `wave`

### Reduced Motion Support
- Respect `prefers-reduced-motion` media query
- Disable non-essential animations when requested

---

## 8. Layout

### Grid System
- Default: 12 columns
- Gutters: 24px
- Margins: 24px (desktop), 16px (mobile)

### Breakpoints
| Breakpoint | Width | Name |
|------------|-------|------|
| Mobile | < 640px | sm |
| Tablet | 640px - 1024px | md |
| Desktop | 1024px - 1440px | lg |
| Large | > 1440px | xl |

### Container Max-widths
- Default: 1200px
- Hero: 1600px
- Content: 1000px

---

## 9. Accessibility

### Color Contrast
- Text on background: min 4.5:1
- Large text: min 3:1
- UI components: min 3:1

### Screen Reader Support
- ARIA labels for interactive elements
- Semantic HTML structure
- Focus states for keyboard navigation

### Keyboard Navigation
- Tab order follows visual flow
- Focus indicators visible
- Skip link for main content

### Reduced Motion
- CSS `@media (prefers-reduced-motion: reduce)`
- JavaScript check for motion preference

---

## Version
1.1.0

## Last Updated
2026-05-10

## Changelog
- 1.1.0 (2026-05-10): Updated button border-radius to 100px (pill-shaped), updated card system to use 16px/20px classification
- 1.0.0 (2026-05-02): Initial design system
