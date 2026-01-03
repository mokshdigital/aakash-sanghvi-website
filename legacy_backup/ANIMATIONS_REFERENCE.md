# Animation & Interaction Reference
This document serves as a reference for all animations, styles, and interactions implemented in `animations.html` and `animations2.html`.

## Libraries Used
- **Tailwind CSS** (Styling)
- **GSAP** (GreenSock Animation Platform)
  - Core
  - ScrollTrigger
  - Flip Plugin
- **Google Fonts**: Inter

---

## 1. Global Effects
### Custom Cursor
- **Implementation**: Two divs (`.cursor-dot`, `.cursor-outline`).
- **Behavior**:
  - `mousemove` listener updates position.
  - Dot follows instantly.
  - Outline follows with `0.15s` delay (GSAP) for fluidity.
  - **Hover State**: Scales up when hovering links/buttons (`mouseenter`/`mouseleave`).
- **Source**: `animations.html` (Lines 455-488), `animations2.html` (Lines 176-189).

### Smooth Scrolling / Scrollbar
- **CSS**: Custom `::-webkit-scrollbar` styling (Dark theme).
- **Source**: `animations.html` (Lines 26-36).

---

## 2. Scroll-Triggered Animations (GSAP ScrollTrigger)
### Fade Up Reveal
- **Effect**: Elements translate `y: 50 -> 0` and `opacity: 0 -> 1` when entering viewport.
- **Trigger**: `top 80%` of viewport.
- **Source**: `animations.html` (Lines 332-345).

### Image Scale Reveal
- **Effect**: Container scales image down from `1.25` to `1` as user scrolls past.
- **Type**: Scrubbed animation (tied to scroll position).
- **Source**: `animations.html` (Lines 348-357).

### Horizontal Scroll Section
- **Effect**: Vertical scroll is converted to horizontal movement.
- **Implementation**:
  - `pin: true` locks the section in place.
  - `x` translation of container based on `scrollWidth`.
  - `scrub: 1` triggers smooth playback linked to scroll.
- **Source**: `animations.html` (Lines 362-376).

### SVG Self-Drawing Path
- **Effect**: An SVG path "draws" itself as you scroll.
- **Implementation**: Manipulates `strokeDashoffset` from max length to 0.
- **Source**: `animations2.html` (Lines 234-242).

### Parallax Backgrounds
- **Effect**: Background shapes move at different speeds relative to scroll.
- **Implementation**: `y` translation = `-100 * speed`.
- **Source**: `animations.html` (Lines 380-393).

---

## 3. Mouse Interactions
### Hero Mouse Parallax
- **Effect**: Floating elements move in opposition to mouse cursor position.
- **Implementation**: Calculates normalized x/y (-1 to 1) and applies `gsap.to` with different multipliers.
- **Source**: `animations.html` (Lines 296-312).

### 3D Tilt Card & Glow
- **Effect**:
  - **Glow**: Radial gradient follows mouse cursor *inside* the card.
  - **Tilt**: Card rotates on X/Y axes based on cursor position relative to center.
  - **Reset**: Returns to 0,0 on `mouseleave`.
- **Source**: `animations.html` (Lines 397-436).

### Magnetic Buttons
- **Effect**: Button physically moves *towards* the cursor when hovered, then snaps back elastically.
- **Source**: `animations2.html` (Lines 191-208).

---

## 4. UI/Layout Animations
### Text Reveal (Load)
- **Effect**: Masked text reveals line-by-line (`y` translation).
- **Source**: `animations.html` (Lines 315-328).

### Infinite Marquee
- **Effect**: Endless scrolling text loop.
- **Advanced Feature**: **Velocity Response**. Detects scroll speed/direction and temporarily speeds up or reverses the marquee (`timeScale`).
- **Source**: `animations2.html` (Lines 211-231).

### FLIP Layout Transition
- **Effect**: Smoothly animates elements between two different layout states (e.g., Row to Column).
- **Method**: uses `Flip.getState()` -> Change Classes -> `Flip.from()`.
- **Source**: `animations2.html` (Lines 272-294).

### Hacker Text Scramble
- **Effect**: On hover, text cycles through random characters before settling on the target string.
- **Source**: `animations2.html` (Lines 245-269).

---

## 5. CSS-Only Effects
### Skeleton Loading
- **Effect**: Shimmering background gradient for loading states.
- **Method**: `@keyframes shimmer` moving `background-position`.
- **Source**: `animations2.html` (Lines 33-41).

---

## 6. Canvas Effects
### Constellation Particles
- **Effect**: Moving dots connected by lines when close to each other.
- **Implementation**: HTML5 Canvas 2D Context.
- **Source**: `animations2.html` (Lines 297-363).
