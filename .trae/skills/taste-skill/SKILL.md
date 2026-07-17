---
name: "taste-skill"
description: "Premium frontend design constraints for AI agents. Prevents generic AI slop patterns. Invoke when generating or reviewing web pages to ensure high-end design quality."
---

# Taste Skill · Anti-Slop Frontend Framework

Premium design constraints for AI-generated frontends. Eliminates the "AI slop" aesthetic — Inter fonts, purple gradients, white cards with shadows.

## The Three Dials

Adjust these values (1–10) to control design output:

```javascript
DESIGN_VARIANCE: 5     // 1=Symmetry/Clean, 10=Chaos/Asymmetric
MOTION_INTENSITY: 5    // 1=Static, 10=Cinematic animations
VISUAL_DENSITY: 5      // 1=Gallery/Spacious, 10=Cockpit/Dense
```

### DESIGN_VARIANCE Guidelines
| Range | Style |
|-------|-------|
| 1-3 | Clean, centered, symmetrical |
| 4-6 | Balanced modern layout |
| 7-10 | Asymmetric, experimental, bold |

### MOTION_INTENSITY Guidelines
| Range | Animation Level |
|-------|----------------|
| 1-3 | Simple hover states only |
| 4-6 | Scroll reveals, subtle transitions |
| 7-10 | Magnetic scroll, parallax, cinematic |

### VISUAL_DENSITY Guidelines
| Range | Content Density |
|-------|----------------|
| 1-3 | Spacious luxury, gallery feel |
| 4-6 | Balanced information density |
| 7-10 | Dense dashboard, cockpit feel |

---

## Anti-Slop Ban System

### ❌ VISUAL & CSS - NEVER USE
- No neon glows
- No pure black (#000000)
- No gradient text
- No custom cursors
- No purple/blue gradients on backgrounds

### ❌ TYPOGRAPHY - NEVER USE
- No Inter font (banned: Inter, Roboto, Arial, Space Grotesk)
- No oversized H1 titles (max recommended: 4rem)
- No serif fonts on dashboards/data interfaces
- No ALL CAPS for body text

### ❌ LAYOUT - NEVER USE
- No 3-column equal-width icon grids
- No pixel-perfect alignment obsession
- No uniform card sizes everywhere
- No centered everything

### ❌ CONTENT - NEVER USE
- No "John Doe" placeholder names
- No generic avatar images
- No fake numbers/stats
- No startup-y names like "Acme Corp"

### ❌ EXTERNAL ASSETS - NEVER USE
- No generic Unsplash placeholders
- No shadcn defaults without customization
- No placeholder images in production

---

## Premium Design Principles

### Typography
- Use distinctive font pairings (not default system fonts)
- Emphasize hierarchy through size and weight, not color alone
- Line-height: 1.4-1.6 for body text
- Letter-spacing: subtle, -0.02em to 0.05em

### Color
- Avoid uniform color palettes
- Use accent colors strategically (max 2-3 accents)
- Prefer muted, sophisticated tones over bright primaries
- Dark backgrounds: #0e1011 or similar (not pure black)

### Spatial Composition
- Embrace asymmetry and intentional negative space
- Break grids occasionally for visual interest
- Layer elements with depth (shadows, overlaps)
- Use whitespace as a design element

### Motion
- Meaningful animations only (not decoration)
- Scroll-triggered reveals add intrigue
- Spring physics for natural feel
- Respect reduced-motion preferences

### Cards & Components
- Vary card sizes for visual hierarchy
- Avoid identical border-radius everywhere
- Subtle shadows, not heavy drop shadows
- Glass morphism: use sparingly, tastefully

---

## When to Invoke

**Use Taste Skill when:**
- Generating new frontend code
- Reviewing AI-generated layouts
- Creating design systems
- Building landing pages or marketing sites
- Any web UI that needs to look premium

**Skip when:**
- Data-heavy dashboards (use minimalism instead)
- Admin panels where function > form
- Rapid prototypes where speed matters more

---

## Quick Reference

**Most Common AI Slop Patterns to Avoid:**
1. Inter font + purple gradient + white card
2. Centered hero with massive H1
3. 3-column feature grid with identical cards
4. Generic stock photo backgrounds
5. Uniform everything (spacing, radius, shadows)

**Premium Alternatives:**
1. Charter/SFhink/serif + single accent color
2. Asymmetric hero with offset text
3. 2-column or masonry layout
4. Custom illustrations or solid color blocks
5. Intentional variety in spacing and component sizes

---

*Part of the Anti-Slop movement. Less slop, more pop.*