# Sreeraj — 3D Artist, Character Designer & Animator Portfolio

A high-performance, cinematic 3D portfolio website for **Sreeraj**, built with **Next.js (App Router, Static Export)**, **Tailwind CSS**, **Three.js (React Three Fiber + Drei)**, and **GSAP**.

Designed around the **"Obsidian & Ember Studio"** aesthetic specified in [`DESIGN.md`](../DESIGN.md), featuring interactive 3D character turntables with molten ember rim-lighting, graceful mobile degradation, a filterable works gallery, 5-step production pipeline stepper, and full WCAG 2.2 AA accessibility.

---

## Features & Architecture

- **Interactive 3D Hero Canvas:**
  - React Three Fiber + Drei scene rendering a rotating character turntable.
  - Three-point cinematic lighting: warm key light, cool ambient fill, and a dramatic molten ember rim light (`#FF5500`) matching Blender Cycles lighting.
  - **Damped OrbitControls:** Wheel zoom is isolated to prevent page-scroll hijacking.
  - **Graceful Mobile & Low-End Degradation:** Devices on mobile (< 640px), systems lacking WebGL, or users with `@media (prefers-reduced-motion)` automatically receive an optimized 2D poster preview with zero layout shift (CLS = 0) and an optional on-demand "Launch Live 3D" button.
- **Single Source of Truth (`/src/data/works.json`):**
  - All portfolio projects, categories, bio details, skills, pipeline software, showreel URLs, and social links live in one place.
  - Sreeraj can add new 3D models or swap YouTube/Vimeo reels without touching UI code.
- **Filterable Works Grid & Lightbox Modals:**
  - Filter across `All`, `Characters`, `3D Animation`, and `Illustration`.
  - Cards feature 3D perspective tilt (`rotateX`/`rotateY`) with dynamic pointer spotlight reflections.
  - Universal Lightbox Modal: renders an interactive 3D turntable viewer with a wireframe/solid toggle for 3D sculpts, or a video player for animation clips. Keyboard navigable (ESC to close, Left/Right arrows to flip between works).
- **5-Stage Production Pipeline Stepper:**
  - Interactive walkthrough: `01 Concept & Silhouette` → `02 Sculpt & Topology` → `03 Rigging & Deformation` → `04 Animation & Physics` → `05 Lighting & Shading`.
- **Contact & Inquiries:**
  - Interactive inquiry form with client-side validation.
  - One-click email copy button with clipboard feedback toast.
  - Studio channels (ArtStation, Instagram, YouTube, BlenderArtists).
- **GSAP Motion Choreography:**
  - ScrollTrigger reveals for section titles and cards.
  - Clamped magnetic cursor pull on the primary Ember CTA button on desktop.
- **Deployment Ready:**
  - Configured with `output: "export"` in `next.config.ts`, generating an ultra-fast zero-server static site in `out/`, ready for direct drag-and-drop or Git deployment to Vercel or Netlify.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live portfolio.

### 3. Build Static Export (Production)
```bash
npm run build
```
The optimized static website will be generated in the `out/` directory.

---

## How to Update Portfolio Content

All content is managed through a single file:
**`src/data/works.json`**

### Adding a New Project
In `src/data/works.json`, append a new object to the `projects` array:

```json
{
  "id": "new-character-slug",
  "title": "Character Name",
  "category": "Characters",
  "subtitle": "Digital Sculpt, Topology & Grooming",
  "description": "Project narrative, lore, and anatomical focus...",
  "thumbnail": "/placeholders/work-01.jpg",
  "modelUrl": "/models/my-model.glb",
  "videoUrl": null,
  "featured": true,
  "year": "2026",
  "polycount": "42,000 Quads",
  "tools": ["Blender 4.2", "ZBrush", "Cycles X"],
  "stats": {
    "Rig": "Auto-Rig Pro",
    "Textures": "2 x 4K Sets",
    "Render Engine": "Cycles X"
  }
}
```

### Swapping 3D Models
1. Export your character model from Blender as a binary `.glb`.
2. Enable **Draco mesh compression** during export in Blender to keep file size under 5MB.
3. Place the file inside `public/models/my-character.glb`.
4. Point `"modelUrl": "/models/my-character.glb"` in `src/data/works.json`.

---

## Deployment to Vercel or Netlify

### Vercel
1. Push repository to GitHub or run `npx vercel` in this folder.
2. Build Command: `npm run build`
3. Output Directory: `out`

### Netlify
1. Connect repository or run `npx netlify deploy`.
2. Build Command: `npm run build`
3. Publish Directory: `out`

---

## Verification Matrix

- [x] **Next.js Static Export:** Builds cleanly with `output: 'export'` to `out/` with zero errors.
- [x] **React Three Fiber Canvas:** Performant 3D turntable with warm rim-lighting and idle float.
- [x] **Graceful Degradation:** Automatic poster fallback for mobile/low-end devices with manual live toggle.
- [x] **Single Data Layer:** `src/data/works.json` drives all sections and lightboxes.
- [x] **Accessibility:** WCAG 2.2 AA verified contrast, visible `:focus-visible` indicators, 44px+ touch targets, and `prefers-reduced-motion` safety.
