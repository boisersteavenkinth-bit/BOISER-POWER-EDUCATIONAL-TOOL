---
name: brand-book
description: Brand identity reference for creating, designing, or reviewing brand-aligned work. Use when applying logo rules, colors, typography, layout, tone, assets, data visualization, UI components, motion, or design tokens.
metadata:
  version: "1.0"
  updated: "2026-08-20"
---

# Brand Book

> **Purpose:** Comprehensive brand identity reference for the brand, synthesizing official guidelines, design tokens, and brand philosophy into a single actionable document. For creators, developers, and designers building with or around the brand.
>
> **Source:** Official brand guidelines, live token extraction, and verified product documentation.
>
> **Last Updated:** 2026-08-20

## When to Use This Skill

Use this skill when you need to:

- Create or review brand-aligned UI, layouts, decks, docs, or marketing pages
- Apply the correct logo treatment, clear space, and color rules
- Implement design tokens in CSS or a component library
- Write copy in the brand voice
- Generate or evaluate visual assets, textures, photography, and data visualizations
- Check whether a deliverable follows the brand system

## How to Use This Skill

1. Start with **Brand Philosophy** to understand intent and positioning.
2. Apply **Logo**, **Color**, **Typography**, **Grid**, and **UI Components** rules exactly as specified.
3. Use the **Tone of Voice** and **Do's and Don'ts** sections to validate copy and creative direction.
4. Use the **CSS Design Tokens** section for implementation.
5. Finish with the **Quick Reference Card** for a fast compliance check.

---

## 1. Brand Philosophy

### Core Identity

**"Avant-garde begins with curiosity about the unknown; youthfulness is the relentless act of questioning."**

The brand stands at the intersection of **technological innovation** and **pioneering aesthetics**. The brand aims to blend the rigor of technology with the nuanced warmth of humanism. The brand is positioned not merely as a model, but as an enduring force built to build — an intelligent mind evolving alongside you.

### Design Origin

The Brand Visual Identity System is built upon five pillars:

| Pillar | Description |
|--------|-------------|
| **Expressive Colors** | A palette that balances functional logic with emotional resonance |
| **Rich Symbolic Language** | The Mark, geometric precision, and the "De-coding" texture |
| **Precise Typography** | A triad of Inter, Geist Mono, and Sentient |
| **Refined Tone of Voice** | Scientific curiosity grounded in humanistic values |
| **De-coding Texture** | Generative algorithmic patterns bridging natural and digital order |

### Brand Promise

> "We deliver a consistent, clear, and professional image across all global channels. Ultimately, the brand stands as the most trusted partner at the intersection of technological innovation and pioneering aesthetics."

---

## 2. Logo System

### Core Geometry

The brand logo consists of two elements:

1. **The Mark** — A rounded-square icon containing a stylized monogram with a dot (representing a cursor/insight point)
2. **The Wordmark** — "BRAND" in a custom geometric sans-serif

### Logo Construction Grid

The logo is built on a precise mathematical grid:

```
Total width: 3X
Mark width: X
Gap between mark and wordmark: 0.33X
Wordmark width: 1.67X
Total height: X
Mark padding: 0.3X (all sides)
Wordmark height: 0.55X
Vertical offset: 0.225X from top
```

### Logo Variants

| Variant | Usage |
|---------|-------|
| **Horizontal** (mark + wordmark) | Primary — headers, navbars, print |
| **Stacked** (mark above wordmark) | Square formats, app icons, social avatars |
| **Mark only** | Favicons, loading states, small UI elements |
| **Wordmark only** | When mark is already present elsewhere |

### Clear Space & Minimum Size

- **Clear space:** Minimum 0.3X on all sides of the logo
- **Minimum digital size:** 24px height
- **Minimum print size:** 8mm height
- **Never:** Distort, rotate, add effects, change colors outside approved palette, place on busy backgrounds without contrast

### Logo Color Rules

| Background | Logo Treatment |
|------------|----------------|
| Light (#FFFFFF, #FBFAF9) | Black mark + wordmark |
| Dark (#000000) | White mark + wordmark |
| Primary Blue (#1783FF) | White mark + wordmark |
| Photography/Texture | White with subtle shadow or dark overlay behind logo |

---

## 3. Color System

### Primary Palette

| Token | Hex | RGB | HSL | Usage |
|-------|-----|-----|-----|-------|
| **Primary Blue** | `#1783FF` | rgb(23, 131, 255) | hsl(212, 100%, 55%) | Primary brand color, CTAs, links, active states |
| **Text** | `#000000` | rgb(0, 0, 0) | hsl(0, 0%, 0%) | Headlines, body text on light |
| **Surface** | `#FBFAF9` | rgb(251, 250, 249) | hsl(30, 20%, 98%) | Card backgrounds, subtle containers |
| **Background** | `#FFFFFF` | rgb(255, 255, 255) | hsl(0, 0%, 100%) | Page backgrounds |
| **On-Primary** | `#FFFFFF` | rgb(255, 255, 255) | hsl(0, 0%, 100%) | Text on Primary Blue |

### Extended Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Text Muted** | `#1783FF` | Secondary text, hints (at reduced opacity) |
| **Secondary** | `#D6E9FF` | hsl(213, 100%, 93%) — Hover states, tags, badges |
| **Accent** | `#1783FF` | Same as primary — highlights, focus rings |
| **Destructive** | `#E53935` | Errors, warnings, destructive actions |
| **Border** | `#D7D7D7` | hsl(0, 0%, 84%) — Dividers, input borders |
| **Muted** | `#EEEEEE` | hsl(0, 0%, 93%) — Disabled states, placeholders |

### Dark Mode Palette

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Background** | `#161613` | hsl(60, 5%, 9%) | Page backgrounds |
| **Foreground** | `#F5F5F0` | hsl(60, 5%, 96%) | Primary text |
| **Card** | `#21211E` | hsl(60, 3%, 13%) | Elevated surfaces |
| **Primary** | `#5CA8FF` | hsl(214, 100%, 71%) | Brand color (lightened for dark) |
| **Secondary** | `#2D2D33` | hsl(210, 17%, 23%) | Subtle backgrounds |
| **Muted** | `#282825` | hsl(60, 3%, 16%) | Disabled, placeholders |
| **Border** | `#3A3A36` | hsl(60, 2%, 23%) | Dividers |
| **Accent** | `#8FC4FF` | hsl(214, 100%, 78%) | Highlights, glows |

### Color Usage Principles

1. **60-30-10 Rule:** 60% neutral (white/surface), 30% text, 10% Primary Blue for emphasis
2. **Blue as Signal:** Primary Blue is reserved for interactive elements, progress, and positive states
3. **Contrast First:** All text must meet WCAG AA (4.5:1) minimum contrast
4. **Emotional Temperature:** Warm neutrals (FBFAF9) prevent the coldness of pure white + black
5. **Dark Mode Glow:** Primary blue gains a subtle glow effect in dark mode to maintain vibrancy

---

## 4. Typography System

### Typeface Triad

The brand uses three typefaces to cover all communication needs:

| Typeface | Role | Character |
|----------|------|-----------|
| **Inter** | UI, headlines, body | Functional efficiency, geometric clarity |
| **Geist Mono** | Code, data, technical labels | Developer-grade precision, terminal aesthetic |
| **Sentient** | Editorial, long-form, brand storytelling | Literary warmth, humanistic elegance |

---

## 14. Quick Reference Card

```
PRIMARY BLUE:   #1783FF  |  hsl(212, 100%, 55%)
TEXT:           #000000  |  hsl(0, 0%, 0%)
SURFACE:        #FBFAF9  |  hsl(30, 20%, 98%)
BACKGROUND:     #FFFFFF  |  hsl(0, 0%, 100%)

FONTS:          Inter (UI), Geist Mono (code), Sentient (editorial)
GRID:           4px base, 24px gutter, 1200px max-width
RADIUS:         8px standard, 12px large, 999px pill
SHADOW:         0 1px 3px rgba(0,0,0,0.08)
EASING:         cubic-bezier(0.4, 0, 0.2, 1)

VOICE:          Scientific + Humanistic + Curious + Trustworthy
AVOID:          Hype words, fear, over-explaining, cold grays
```
