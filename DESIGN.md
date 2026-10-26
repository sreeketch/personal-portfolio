# DESIGN.md — Sreeraj 3D Artist Portfolio

> **Project:** Responsive 3D Portfolio for Sreeraj — Freelance 3D Artist, Character Designer & 3D Animator (Blender Specialist)  
> **Reference Base:** `/reference/template/` (Layout structure, curved hero container, warm rim-light atmosphere, 4-pillar competency strip, two-column section header, 3-card showcase grid)  
> **Design Framework:** Created following `ui-ux-pro-max` intelligence system  
> **Standards:** WCAG 2.2 Level AA Compliant | Fluid 8pt Spacing Scale | Zero Layout Shift (CLS = 0) | Reduced-Motion Compliant

---

## 1. Style Direction

### Exploration: Two Studio Directions

| Dimension | Option A: "Obsidian & Ember Studio" (Recommended) | Option B: "Monochrome Precision Studio" |
| :--- | :--- | :--- |
| **Visual Tone** | **Cinematic, warm atmospheric, lookdev lighting suite** | **Technical, architectural, wireframe CAD/lab** |
| **Color Philosophy** | Deep obsidian velvet (`#08080A`) bathed in warm ember rim-light (`#FF6B2B`) with soft amber highlights | Pitch black (`#050505`) with titanium grays, stark white, and electric icy cyan (`#00E5FF`) |
| **Lighting Mood** | Dramatic 3-point rim lighting, volumetric fog, warm key light reminiscent of a live film set / Blender Cycles render | Cool flat ambient lighting, stark high-contrast studio strobes, technical viewport grid |
| **Materiality** | Frosted obsidian glass (`backdrop-blur-md`), molten metallic accents, soft radial vignettes, tactile specular glints | Matte carbon fiber, 1px razor-sharp hairline borders, monospace coordinate grids, wireframe shaders |
| **Emotional Impact** | Narrative-rich, organic, expressive, character-driven; evokes movie posters and cinematic storytelling | Cerebral, ultra-precise, computational, tooling-centric; evokes game engine tools and topology analysis |
| **Reference Template Match** | **Directly honors and refines the warm rim-lit hero and cinematic mood of the reference**, elevating contrast and craft | Moves away from the reference into cold industrial brutalism |

### Recommended Direction: Option A — "Obsidian & Ember Studio"

#### Why Option A Wins for Sreeraj:
1. **Direct Resonance with 3D Character Craft:** Character design and 3D animation rely intrinsically on human emotion, anatomy, personality, and lighting. Warm amber and molten ember rim lighting (`#FF6B2B` to `#FF8547`) mirror the classic **cinematic rim-light** used in Blender Cycles/EEVEE to separate character silhouettes from dark backdrops.
2. **Elevates the Reference Template:** The reference design achieves its dramatic visual punch through a glowing warm radial backlight behind the central hero silhouette. Option A captures this exact visual energy, modernizes it with precision tokens, and solves the reference's critical contrast and accessibility shortcomings.
3. **Superior Artwork Showcase:** 3D character turntables and renders often feature complex neutral skin tones, armor metallics, and cloth textures. An obsidian canvas framed by warm ember edge-lighting provides neutral deep space that makes render thumbnails pop with dimensional depth without clashing with the artwork.

---

## 2. Color Palette & Token Architecture

### 2.1 Core Palette Tokens

```
========================================================================================
SURFACES & BACKGROUNDS
========================================================================================
[ #08080A ]  Canvas Base      Deepest obsidian background
[ #0E0E12 ]  Hero Vignette    Hero container base with curved bottom
[ #141418 ]  Surface / Card   Elevated card panels & showcase containers
[ #1C1C22 ]  Surface Hover    Interactive card hover & dropdown state
[ #22222A ]  Control Surface  Pill badges, secondary icon buttons

========================================================================================
TEXT & CONTENT (WCAG AA & AAA VERIFIED)
========================================================================================
[ #FFFFFF ]  Text Primary     Headlines, hero display text (20.01:1 on Canvas)
[ #E2E8F0 ]  Text Secondary   Body paragraphs, lead descriptions (16.23:1 on Canvas)
[ #94A3B8 ]  Text Muted       Metadata, subtitles, navigation links (7.80:1 on Canvas)
[ #768597 ]  Text Subtle      Pillar numbers, technical tags, breadcrumbs (5.31:1 on Canvas)

========================================================================================
EMBER ACCENT & WARM RIM-LIGHTING
========================================================================================
[ #FF6B2B ]  Accent Primary   Molten Ember for primary CTAs & focal highlights
[ #FF8547 ]  Accent Hover     Radiant Ember for interactive hover states
[ #E05316 ]  Accent Active    Pressed state for tactile feedback
[ #FFC247 ]  Accent Specular  Golden rim highlight for star ratings & milestone badges
[ #08080A ]  On-Accent Text   High-contrast dark obsidian text on #FF6B2B (7.04:1 AAA)
========================================================================================
```

### 2.2 CSS Custom Properties & Design Tokens

```css
:root {
  /* Surface Layers */
  --color-canvas: #08080A;
  --color-surface-hero: #0E0E12;
  --color-surface-card: #141418;
  --color-surface-card-hover: #1C1C22;
  --color-surface-pill: #22222A;
  
  /* Borders & Dividers */
  --color-border-subtle: #272730;
  --color-border-hover: rgba(255, 107, 43, 0.4);
  --color-border-active: #FF6B2B;

  /* Typography / Foreground */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #E2E8F0;
  --color-text-muted: #94A3B8;
  --color-text-subtle: #768597;

  /* Accent & Interactive */
  --color-accent: #FF6B2B;
  --color-accent-hover: #FF8547;
  --color-accent-active: #E05316;
  --color-accent-specular: #FFC247;
  --color-on-accent: #08080A; /* Critical AA/AAA contrast fix */
  
  /* Focus Ring */
  --color-focus-ring: #FF8547;

  /* Lighting & Glows */
  --glow-ember-subtle: 0 0 24px rgba(255, 107, 43, 0.20);
  --glow-ember-prominent: 0 0 48px rgba(255, 107, 43, 0.35);
  --glow-ember-intense: 0 0 80px rgba(255, 85, 0, 0.50);
  --hero-rim-gradient: radial-gradient(
    ellipse 80% 60% at 50% 30%,
    rgba(255, 107, 43, 0.38) 0%,
    rgba(224, 83, 22, 0.18) 40%,
    rgba(14, 14, 18, 0.95) 85%
  );
}
```

### 2.3 Tailwind CSS Theme Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#08080A',
        surface: {
          hero: '#0E0E12',
          card: '#141418',
          hover: '#1C1C22',
          pill: '#22222A',
        },
        border: {
          subtle: '#272730',
          hover: 'rgba(255, 107, 43, 0.4)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#E2E8F0',
          muted: '#94A3B8',
          subtle: '#768597',
        },
        ember: {
          DEFAULT: '#FF6B2B',
          hover: '#FF8547',
          active: '#E05316',
          specular: '#FFC247',
          dark: '#08080A', // Contrast text for ember buttons
        },
      },
      boxShadow: {
        'ember-sm': '0 0 16px rgba(255, 107, 43, 0.20)',
        'ember-md': '0 0 32px rgba(255, 107, 43, 0.30)',
        'ember-lg': '0 0 60px rgba(255, 107, 43, 0.45)',
      },
      borderRadius: {
        'hero-b': '36px',
        'card-3d': '24px',
        'pill-cta': '9999px',
      },
    },
  },
};
```

### 2.4 Mathematical WCAG Contrast Verification & UX Improvement

> [!IMPORTANT]
> **Critical Contrast Improvement Over Reference Template:**
> In the reference template image, the primary CTA button placed white text (`#FFFFFF`) on top of the vibrant orange button. When measured rigorously under WCAG 2.2 formulas, `#FFFFFF` on `#FF6B2B` yields a contrast ratio of only **2.84:1**, which **fails WCAG Level AA requirements** (minimum 4.5:1 for normal body text).
> 
> **Our Solution:** For solid Ember CTA buttons, we enforce high-contrast dark obsidian typography (`#08080A` on `#FF6B2B`), which yields a **7.04:1 contrast ratio**, exceeding WCAG Level AAA standards. For secondary outline buttons, we use `#FF6B2B` borders and `#FF8547` text against the dark canvas (8.29:1 contrast ratio).

| Foreground Color | Background Color | Computed Contrast | WCAG Rating | Applied Context |
| :--- | :--- | :--- | :--- | :--- |
| `#FFFFFF` (Pure White) | `#08080A` (Canvas Base) | **20.01:1** | **AAA Pass** | Hero Headlines, Section Titles, Card Headings |
| `#E2E8F0` (Slate 200) | `#08080A` (Canvas Base) | **16.23:1** | **AAA Pass** | Paragraphs, Artist Bio, Project Descriptions |
| `#94A3B8` (Slate 400) | `#08080A` (Canvas Base) | **7.80:1** | **AAA Pass** | Navigation Links, Software Tags, Timestamps |
| `#768597` (Cool Slate) | `#08080A` (Canvas Base) | **5.31:1** | **AA Pass** | Numbered Pillar Prefix (`#01`, `#02`), Polycount labels |
| `#08080A` (Dark Obsidian)| `#FF6B2B` (Ember CTA) | **7.04:1** | **AAA Pass** | **Primary Button Label & Icon (Contrast Fix)** |
| `#FF6B2B` (Ember Orange) | `#08080A` (Canvas Base) | **7.04:1** | **AAA Pass** | Kicker Tags ("Selected Works", "Behind the Renders") |
| `#FF6B2B` (Ember Orange) | `#141418` (Card Surface)| **6.47:1** | **AA Pass** | Card Category Badges, Software Tags |
| `#FF8547` (Ember Focus) | `#08080A` (Canvas Base) | **8.29:1** | **AAA Pass** | 2px Focus-Visible Indicator Ring |

---

## 3. Typography System

### 3.1 Google Fonts Pairing Selection

```
========================================================================================
PRIMARY PAIRING: THE CINEMATIC STUDIO STACK (RECOMMENDED)
========================================================================================
DISPLAY FONT:     Syne (Weights: 600 SemiBold, 700 Bold, 800 ExtraBold)
BODY FONT:        Plus Jakarta Sans (Weights: 400 Regular, 500 Medium, 600 SemiBold)
TECHNICAL / MONO: Space Grotesk (Weights: 500 Medium, 700 Bold)
========================================================================================
```

#### Why Syne + Plus Jakarta Sans + Space Grotesk?
- **Syne (Display):** An avant-garde geometric display typeface originally commissioned for the art center "Synesthésie". At bold and extrabold weights, its expansive widths, crisp architectural corners, and sculpted glyphs evoke the feel of **3D polygon modeling, clay sculpting, and physical typography**. It breaks away from generic tech portfolios and establishes Sreeraj as an artist with an elevated creative eye.
- **Plus Jakarta Sans (Body):** A refined geometric grotesque crafted with clean curves and wide counters. Unlike dense fonts that muddy on dark backgrounds, Plus Jakarta Sans provides pristine legibility on dark OLED surfaces, preventing reader eye fatigue.
- **Space Grotesk (Technical Callouts & Numbers):** Used for the 4 pillar indicators (`#01 Character Design`, `#02 3D Modeling`), polycounts, and pipeline details (`Blender 4.2 LTS`, `Cycles X`, `Substance 3D`). Its distinctive technical ink traps reinforce technical Blender craftsmanship.

### 3.2 Alternative Pairing (Option 2)
- **Display:** Archivo (Weights: 700, 800) — Bold, punchy industrial grotesque.
- **Body:** Inter (Weights: 400, 500) — Neutral, utilitarian, highly structured.
- *Trade-off:* While clean and robust, Archivo + Inter feels more like a SaaS software dashboard rather than an expressive 3D character design studio.

### 3.3 Google Fonts Import Code

#### HTML `<link>` Tag (Optimal for Header Preload)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
```

#### CSS `@import` Directive
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@600;700;800&display=swap');
```

#### Tailwind Font Family Setup
```javascript
fontFamily: {
  display: ['Syne', 'sans-serif'],
  body: ['Plus Jakarta Sans', 'sans-serif'],
  mono: ['Space Grotesk', 'monospace'],
}
```

### 3.4 Type Scale & Typographic Hierarchy

| Token | Size (Desktop / Mobile) | Line Height | Letter Spacing | Font Family & Weight | Application / Element |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-display` | `72px (4.5rem)` / `44px (2.75rem)` | `1.02` (tight) | `-0.035em` | Syne 800 ExtraBold | Hero Main Title: *"Character Designer & 3D Animator"* |
| `text-h1` | `52px (3.25rem)` / `36px (2.25rem)` | `1.1` | `-0.025em` | Syne 700 Bold | Primary Section Headings |
| `text-h2` | `38px (2.375rem)` / `28px (1.75rem)` | `1.18` | `-0.02em` | Syne 700 Bold | Section Feature Title: *"Sculpting Stories Beyond the Screen"* |
| `text-h3` | `24px (1.5rem)` / `20px (1.25rem)` | `1.28` | `-0.015em` | Syne 600 SemiBold | Showcase Card Titles (e.g. *"Kaelen: The Cyber Ronin"*) |
| `text-lead` | `20px (1.25rem)` / `17px (1.06rem)` | `1.55` | `-0.01em` | Plus Jakarta Sans 400 | Hero Manifesto Statement & Section Lead Paragraphs |
| `text-body` | `16px (1.0rem)` / `15px (0.94rem)` | `1.65` | `normal` | Plus Jakarta Sans 400 | Standard descriptive paragraphs, case study details |
| `text-ui` | `14px (0.875rem)` / `14px (0.875rem)` | `1.4` | `+0.01em` | Plus Jakarta Sans 600 | Navigation links, Button labels, Interactive chips |
| `text-mono-tag` | `13px (0.81rem)` / `12px (0.75rem)` | `1.3` | `+0.06em` | Space Grotesk 600 (Uppercase)| Pillar indices (`#01`), Pipeline tags (`BLENDER 4.2`) |
| `text-micro` | `11px (0.69rem)` / `11px (0.69rem)` | `1.2` | `+0.08em` | Space Grotesk 500 (Uppercase)| Copyright, 3D Canvas FPS readout, Polycount spec |

### 3.5 Typographic UX Rules
1. **Headline Line Balancing:** Apply `text-wrap: balance;` on all `h1`, `h2`, and `h3` elements to avoid awkward single-word typographic widows.
2. **Optimal Reading Measure:** Constrain prose width to `max-w-2xl` (~65-72 characters) to preserve reading comfort.
3. **Subpixel Antialiasing on Dark Surfaces:** Explicitly configure `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;` to prevent font dilation (bloating) on high-DPI OLED screens.

---

## 4. Layout Grid, Spacing Scale & Breakpoints

### 4.1 Responsive Breakpoint System

| Breakpoint Name | Media Query Range | Device Target | Max Content Width | Container Padding |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile (sm)** | `360px` – `479px` | Compact smartphones (iPhone SE, Galaxy S) | `100%` | `16px (1.0rem)` |
| **Mobile Large (md-min)**| `480px` – `767px` | Modern smartphones (Pro Max, Pixel XL) | `100%` | `20px (1.25rem)` |
| **Tablet (md)** | `768px` – `1023px` | iPads, Android tablets, Foldables unfolded | `720px` | `32px (2.0rem)` |
| **Desktop (lg)** | `1024px` – `1439px` | MacBooks, Laptops, Standard Monitors | `1140px` | `48px (3.0rem)` |
| **Ultra-Wide (xl)** | `1440px` and above | 4K Displays, Studio Displays, Pro Monitors | `1280px` (centered) | `64px (4.0rem)` |

### 4.2 Multi-Column Grid Architecture

```
DESKTOP (>= 1024px)
========================================================================================
[12 Columns]  |  Gutter: 32px  |  Margins: Auto / 48px  |  Max Width: 1280px
- Hero: Asymmetric Split -> Left 7 Columns (Headings + 4-Pillar Strip) + Right 5 Columns (Manifesto + 3D Turntable)
- "Behind the Renders" Header: Left 6 Columns (Kicker + H2) | Right 6 Columns (Description + CTA)
- Showcase Grid: 3 Equal Columns (4 Columns each) for character cards (3:4 aspect ratio)

TABLET (768px - 1023px)
========================================================================================
[8 Columns]   |  Gutter: 24px  |  Margins: 32px
- Hero: Stacked layout with central 3D interactive viewer
- 4-Pillar Strip: 2x2 Grid (4 Columns each)
- Showcase Grid: 2 Columns on top (4 cols each) + 1 Full-width card below (8 cols)

MOBILE (360px - 767px)
========================================================================================
[4 Columns]   |  Gutter: 16px  |  Margins: 16px
- Hero: Single Column vertical stack (Hero -> 3D Viewport -> Manifesto -> Pillars)
- 4-Pillar Strip: 2x2 compact grid or vertical stack
- Showcase Grid: 1 Column full-bleed card carousel / swipeable cards with snap points
```

### 4.3 Page Structure & Section Blueprint

```
+--------------------------------------------------------------------------------------+
| [HEADER / FLOATING NAV]                                                              |
| Logo ("SREERAJ 3D")         [Home]  [Selected Works]  [About]      [Get in Touch ->] |
+--------------------------------------------------------------------------------------+
| [HERO CARD CONTAINER]  (Rounded Bottom: 36px / Warm Ember Rim-Light Glow)            |
|                                                                                      |
|  "Hey, I'm Sreeraj —"                       "Bringing digital sculptures to life    |
|                                              through movement, emotion, and story."  |
|  CHARACTER DESIGNER &                                                                |
|  3D ANIMATOR                                 [Interactive 3D Turntable Viewport:     |
|                                               Blender Character Model with           |
|                                               dynamic rim-light & orbit controls]    |
|                                                                                      |
|  ----------------------------------------------------------------------------------  |
|  4-PILLAR SERVICE STRIP:                                                             |
|  [#01 Character Design]  [#02 3D Sculpting]  [#03 Rigging & Motion]  [#04 Lookdev]   |
+--------------------------------------------------------------------------------------+
| [STUDIO PROOF / PIPELINE TICKER]                                                     |
| "POWERING PRODUCTIONS WITH INDUSTRY-STANDARD PIPELINES"                              |
| [Blender 4.2 LTS]    [Unreal Engine 5]    [ZBrush]    [Substance 3D]    [Marvelous]  |
+--------------------------------------------------------------------------------------+
| [BEHIND THE RENDERS / SELECTED WORKS]                                                |
|                                                                                      |
|  Selected Works                              "From initial topological sculpt to     |
|  SCULPTING STORIES THAT                       final keyframe animation, every piece  |
|  RESONATE BEYOND THE SCREEN                   is engineered with cinematic weight."  |
|                                                                                      |
|                                              [Ready to start a project?] [Explore ->]|
|                                                                                      |
|  +-----------------------+  +-----------------------+  +-----------------------+     |
|  | [Card 01: Character]  |  | [Card 02: Animation]  |  | [Card 03: Creature]   |     |
|  | "Kaelen: Cyber Ronin" |  | "Aethelgard Movement" |  | "Obsidian Chimera"    |     |
|  | Sculpt & Grooming     |  | Blender Rig & Sim     |  | Lookdev & Volumetrics |     |
|  | [Blender 4.2] [Cycles]|  | [Auto-Rig] [ClothSim] |  | [Substance] [EEVEE]   |     |
|  +-----------------------+  +-----------------------+  +-----------------------+     |
+--------------------------------------------------------------------------------------+
```

### 4.4 8-Point Spacing Scale

All layout insets, gaps, and component bounds adhere strictly to an 8-point geometric scale (with 4px half-steps for micro-alignment):

```css
/* 8pt Spacing Token System */
--space-1:  4px;   /* 0.25rem - Micro gap, icon-to-label badge */
--space-2:  8px;   /* 0.50rem - Chip padding, tight button gap */
--space-3:  12px;  /* 0.75rem - Pill button vertical padding, form insets */
--space-4:  16px;  /* 1.00rem - Mobile gutter, card inner padding */
--space-5:  20px;  /* 1.25rem - Tablet gutter, medium component gap */
--space-6:  24px;  /* 1.50rem - Desktop card padding, header height padding */
--space-8:  32px;  /* 2.00rem - Grid gap desktop, sub-section spacing */
--space-10: 40px;  /* 2.50rem - Component cluster separator */
--space-12: 48px;  /* 3.00rem - Mobile section padding, large button height */
--space-16: 64px;  /* 4.00rem - Tablet section padding, hero top padding */
--space-20: 80px;  /* 5.00rem - Section vertical spacing desktop */
--space-24: 96px;  /* 6.00rem - Major section separation desktop */
--space-32: 128px; /* 8.00rem - Hero bottom clearance on ultra-wide screens */
```

---

## 5. UX Rules & Accessibility Engineering

### 5.1 Accessibility (WCAG 2.2 AA Standards)

#### Contrast & Perception
1. **Body & Normal Text:** All paragraph and UI text maintains a contrast ratio $\ge 4.5:1$ against its background layer.
2. **Large Text & Controls:** All headings $\ge 18.5\text{px}$ bold or $\ge 24\text{px}$ regular, plus interactive boundaries, maintain $\ge 3:1$ contrast against adjacent surfaces.
3. **Primary CTA Label Contrast:** The solid Ember CTA uses dark obsidian text (`#08080A` on `#FF6B2B`, 7.04:1 AAA), completely eliminating the low-contrast defect of the reference design.
4. **Color Independence:** Color is never used as the solitary visual vehicle for state; form errors, active tab indicators, and interactive links combine color with icons, underlines, or distinct typography.

#### Focus Management (`:focus-visible`)
Interactive elements feature an explicit focus ring that complies with WCAG 2.2 Success Criterion 2.4.13 (Focus Appearance):
```css
/* High-Visibility Focus Indicator */
:focus-visible {
  outline: 2px solid var(--color-focus-ring); /* #FF8547 */
  outline-offset: 3px;
  border-radius: 4px;
  transition: outline-offset 120ms ease-out;
}

/* Ensure focus is never clipped by overflow-hidden containers */
button:focus-visible, a:focus-visible {
  z-index: 20;
}
```

#### Screen Reader & Semantic Structure
- **Landmarks:** Native `<header role="banner">`, `<main id="main-content">`, `<nav aria-label="Primary Navigation">`, and `<footer role="contentinfo">`.
- **Skip Link:** A high-priority skip-to-content anchor provided at the very top of the DOM:
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ember focus:text-canvas focus:rounded-full">
    Skip to Main Content
  </a>
  ```
- **Decorative Media:** Purely decorative gradient overlays, sparks, and glow canvases include `aria-hidden="true"`.
- **3D Canvas Accessibility:**
  ```javascript
  // WebGL Canvas Screen Reader Integration
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 
    'Interactive 3D model of Sreeraj original character. Use arrow keys or drag mouse to orbit around the model.'
  );
  ```

---

### 5.2 Reduced-Motion Strategy (`prefers-reduced-motion: reduce`)

Users who suffer from vestibular disorders or motion sensitivity must be treated as first-class citizens:

```css
@media (prefers-reduced-motion: reduce) {
  /* Kill all non-essential keyframe animations and continuous scroll-jacking */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Reveal all scroll-triggered elements immediately without transform offsets */
  .gsap-reveal,
  .project-card,
  .hero-headline {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }

  /* Disable 3D Canvas auto-rotation in Three.js */
  /* Fallback to static rendered hero image or render single still frame */
  .canvas-turntable {
    pointer-events: none;
  }
}
```

```javascript
// GSAP MatchMedia Integration for Motion Safety
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Rich cinematic reveals, character split-text, and magnetic cursor hover
  initCinematicAnimations();
  init3DCameraOrbit();
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  // Static final states rendered immediately
  gsap.set(['.hero-title', '.project-card', '.pillar-item'], { 
    opacity: 1, 
    y: 0, 
    clearProps: 'all' 
  });
  stop3DAutoRotation();
});
```

---

### 5.3 Touch Targets & Ergonomics

1. **Target Dimensions:** Every interactive target (CTA buttons, navbar toggles, modal close icons, video play triggers) guarantees a minimum tap bounding area of **$44 \times 44\text{px}$ on iOS** and **$48 \times 48\text{px}$ on Android/Web**.
2. **Micro-Element Padding Expander:** For visually compact icons (e.g. 18px audio toggles or wireframe switches), transparent pseudo-elements expand the hit area:
   ```css
   .compact-icon-btn {
     position: relative;
     width: 24px;
     height: 24px;
   }
   .compact-icon-btn::before {
     content: '';
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     min-width: 48px;
     min-height: 48px;
   }
   ```
3. **Touch Target Separation:** A minimum spacing gap of `8px` is strictly preserved between adjacent clickable elements to eliminate accidental tap misfires on mobile screens.

---

### 5.4 3D Asset Loading, Skeletons & CLS Prevention

3D models (GLTF/GLB) and high-resolution character renders can cause severe page jank and layout shifts if not managed correctly.

1. **Aspect-Ratio Reservation (Zero CLS):**
   - Project cards reserve layout real-estate using `aspect-ratio: 4 / 5` with an obsidian skeleton placeholder (`bg-surface-card` with an ember shimmer gradient).
   - The hero 3D turntable container reserves `aspect-ratio: 16 / 9` (mobile) and fixed height bounds on desktop (`h-[480px]` or `h-[560px]`).
2. **Progressive Asset Hydration:**
   - **Phase 1 (Instant):** Blurred low-res WebP preview image (20KB) renders instantaneously within 100ms.
   - **Phase 2 (Async):** WebGL Three.js canvas initializes in the background (`requestIdleCallback`).
   - **Phase 3 (Load):** `GLTFLoader` with Draco compression loads the optimized character model (~2.5MB).
   - **Phase 4 (Reveal):** Cross-fade from WebP poster to interactive 3D model over 300ms using `opacity` tweening.
3. **Accessible Loading Progress:**
   ```html
   <div role="status" aria-live="polite" class="loader-container">
     <div class="ember-spinner" aria-hidden="true"></div>
     <span class="sr-only">Loading 3D Character Showcase: <span id="load-pct">0</span>% complete</span>
   </div>
   ```

---

## 6. Motion Guidelines & Interaction Choreography

### 6.1 Motion Timing & Easing Tokens

| Intent | Duration | Easing Curve (CSS / GSAP) | Behavior & Application |
| :--- | :--- | :--- | :--- |
| **Micro Hover** | `150ms – 200ms` | `cubic-bezier(0.16, 1, 0.3, 1)` / `power2.out` | Button scale, border color shift, pill arrow translation |
| **Hover Glow** | `250ms – 300ms` | `ease-out` / `power1.out` | Volumetric ember glow expansion around cards |
| **Card 3D Tilt** | Continuous mouse | Clamped spring (`quickTo` with damping `0.3`) | Card rotation based on pointer coordinates ($ \le 6^\circ $) |
| **Scroll Reveal**| `350ms – 450ms` | `cubic-bezier(0.22, 1, 0.36, 1)` / `power3.out` | Content rising into viewport with slight Y-offset (14px) |
| **Modal / Reel** | `280ms (In) / 200ms (Out)` | `cubic-bezier(0.16, 1, 0.3, 1)` / `power2.inOut` | Video reel lightbox expansion and backdrop blur |
| **Page Change** | `200ms (Exit) / 280ms (Enter)` | `power1.in` (exit) $\to$ `power2.out` (enter) | Asymmetric route transitions: Exit faster than enter |

---

### 6.2 Scroll Reveals & Stagger Orchestration

Scroll reveals utilize GSAP ScrollTrigger with small displacement to prevent intrusive slide-ins:

```javascript
// Scroll Reveal Recipe for Project Cards & Pillars
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project Showcase Cards (Staggered 3-Column Entrance)
gsap.from('.project-showcase-card', {
  scrollTrigger: {
    trigger: '#selected-works',
    start: 'top 82%',
    toggleActions: 'play none none reverse', // Smooth reverse if scrolled back up
  },
  opacity: 0,
  y: 20,
  duration: 0.45,
  stagger: 0.08,
  ease: 'power3.out',
  clearProps: 'transform', // Restore pristine layout after tween
});

// 4-Pillar Competency Strip (Horizontal Stagger Reveal)
gsap.from('.pillar-item', {
  scrollTrigger: {
    trigger: '.pillar-container',
    start: 'top 90%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  y: 12,
  duration: 0.35,
  stagger: 0.04,
  ease: 'power2.out',
});
```

---

### 6.3 Card 3D Tilt & Cursor Spotlight Interaction

Each showcase card delivers an immersive physical sensation via CSS 3D perspective and dynamic radial spotlight:

```javascript
// Interactive 3D Perspective Tilt on Showcase Cards
const cards = document.querySelectorAll('.project-showcase-card');

cards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates (-1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;

    // Apply 3D tilt & move spotlight gradient position
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});
```

```css
/* Card Dynamic Spotlight Shimmer */
.project-showcase-card {
  position: relative;
  background-color: var(--color-surface-card);
  border: 1px solid var(--color-border-subtle);
  border-radius: 24px;
  overflow: hidden;
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 250ms ease, 
              box-shadow 250ms ease;
  will-change: transform;
}

.project-showcase-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 107, 43, 0.12),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 300ms ease;
}

.project-showcase-card:hover {
  border-color: var(--color-border-hover);
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.7),
              0 0 24px rgba(255, 107, 43, 0.22);
}

.project-showcase-card:hover::before {
  opacity: 1;
}
```

---

### 6.4 Magnetic CTA Button & Arrow Pulse

The primary "Get in Touch" pill CTA replicates the high-end studio feel with magnetic pointer pull:

```javascript
// Clamped Magnetic CTA Pull
const magneticBtn = document.querySelector('.btn-magnetic');

if (magneticBtn && window.matchMedia('(pointer: fine)').matches) {
  const xTo = gsap.quickTo(magneticBtn, "x", { duration: 0.3, ease: "power3" });
  const yTo = gsap.quickTo(magneticBtn, "y", { duration: 0.3, ease: "power3" });

  magneticBtn.addEventListener('pointermove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    // Clamp pull strength to 0.25 so the button never runs away from cursor
    xTo(x * 0.25);
    yTo(y * 0.25);
  });

  magneticBtn.addEventListener('pointerleave', () => {
    xTo(0);
    yTo(0);
  });
}
```

```css
/* Primary Pill CTA Styling */
.btn-primary-ember {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #FF7A38 0%, #FF5500 100%);
  color: #08080A; /* AA/AAA verified high contrast */
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(255, 85, 0, 0.35);
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}

.btn-primary-ember:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 28px rgba(255, 85, 0, 0.50);
  filter: brightness(1.05);
}

.btn-primary-ember:active {
  transform: translateY(0px) scale(0.98);
  box-shadow: 0 2px 10px rgba(255, 85, 0, 0.30);
}

.btn-primary-ember .btn-icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #08080A;
  color: #FF6B2B;
  transition: transform 200ms ease;
}

.btn-primary-ember:hover .btn-icon-circle {
  transform: translateX(3px) rotate(-45deg);
}
```

---

### 6.5 Page & Modal Transitions (Reel Lightbox)

When a user clicks on a 3D character card to inspect the turntable reel or view topology breakdowns:

```javascript
// Lightbox Modal Expansion
export function openReelModal(projectData) {
  const modal = document.querySelector('#reel-modal');
  const backdrop = modal.querySelector('.modal-backdrop');
  const panel = modal.querySelector('.modal-panel');

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Lock background scroll

  gsap.fromTo(backdrop, 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.25, ease: 'power2.out' }
  );

  gsap.fromTo(panel, 
    { opacity: 0, scale: 0.94, y: 16 }, 
    { opacity: 1, scale: 1, y: 0, duration: 0.32, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }
  );
}

export function closeReelModal() {
  const modal = document.querySelector('#reel-modal');
  const backdrop = modal.querySelector('.modal-backdrop');
  const panel = modal.querySelector('.modal-panel');

  gsap.to(backdrop, { opacity: 0, duration: 0.18, ease: 'power1.in' });
  gsap.to(panel, { 
    opacity: 0, 
    scale: 0.96, 
    duration: 0.18, 
    ease: 'power1.in',
    onComplete: () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}
```

---

## 7. Implementation Checklist & Verification Matrix

Before proceeding to HTML/CSS/JavaScript or framework coding, verify every requirement against this specification:

- [x] **Style Direction Selected:** Option A ("Obsidian & Ember Studio") clearly justified and detailed.
- [x] **Color Tokens Defined:** Full hex palette, CSS custom properties, and Tailwind theme mapping with ember hover/active/glow states.
- [x] **Contrast Verification:** All normal text $\ge 4.5:1$, large text $\ge 3:1$, dark text on ember CTA button verified at **7.04:1 (AAA)**.
- [x] **Font Pairing:** Syne (Display) + Plus Jakarta Sans (Body) + Space Grotesk (Mono) with full Google Fonts import tags and typographic scale table.
- [x] **Responsive Grid & Layout:** 12-col desktop, 8-col tablet, 4-col mobile with 8pt spacing system and container definitions matching the reference structure.
- [x] **UX & Accessibility Rules:** Focus indicators (`:focus-visible`), touch targets $\ge 44\text{px}$, ARIA landmark semantics, WebGL canvas screen reader labels.
- [x] **Reduced-Motion Fallbacks:** Complete `@media (prefers-reduced-motion: reduce)` rules and GSAP `matchMedia` code to silence continuous animations.
- [x] **Loading & 3D Strategy:** Aspect-ratio reservation for zero CLS, progressive LOD hydration, and accessible status announcements.
- [x] **Motion Guidelines:** GSAP scroll reveals, clamped magnetic cursor hover, 3D card perspective tilt, and modal zoom choreography.
