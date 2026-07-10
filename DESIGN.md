---
name: Lumina-Cybernetics
colors:
  surface: '#f9f9fc'
  surface-dim: '#d9dadd'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#edeef1'
  surface-container-high: '#e8e8eb'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#5f3e3e'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#946e6d'
  outline-variant: '#e9bcba'
  surface-tint: '#bf002a'
  primary: '#ba0029'
  on-primary: '#ffffff'
  primary-container: '#e90036'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b2'
  secondary: '#006877'
  on-secondary: '#ffffff'
  secondary-container: '#00e0ff'
  on-secondary-container: '#005f6d'
  tertiary: '#5d5c5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#767474'
  on-tertiary-container: '#f7feff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b2'
  on-primary-fixed: '#410008'
  on-primary-fixed-variant: '#92001e'
  secondary-fixed: '#a5eeff'
  secondary-fixed-dim: '#00daf8'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.1em
  micro-feed:
    fontFamily: JetBrains Mono
    fontSize: 9px
    fontWeight: '400'
    lineHeight: 10px
spacing:
  unit: 4px
  grid-line: 1px
  gutter-dense: 8px
  margin-panel: 16px
  container-max: 1440px
---

## Brand & Style

The design system establishes a **Light Tech Noir** aesthetic, merging the precision of high-end laboratory instruments with the high-energy data density of futuristic urban infrastructure. The visual narrative is defined by "Modern Minimalist Lab"—an environment that is sterile, hyper-organized, and surgically precise, yet pulsing with the electricity of "Cyber-Cherry" and "Electric Blue" data streams.

The style leverages **Technical Minimalism** with a **Brutalist** structural backbone. It prioritizes information density through a "micrographic carpet" layout, where every pixel serves a functional purpose. The emotional response is one of high-stakes professional clarity: the user should feel like an operator managing a critical, high-velocity system within a pristine, light-filled command center. Key characteristics include hair-line borders, halftone texture overlays for depth, and constant technical "chatter" via micro-typography.

## Colors

The palette is anchored in a high-contrast clinical environment. The background architecture utilizes a range of "Optical Whites" and "Instrument Greys" to prevent eye fatigue while maintaining a sterile feel.

- **Surface Primary (#FFFFFF):** The base laboratory floor. Clean, high-reflectance.
- **Surface Secondary (#F4F4F7):** Used for inset panels and data-wells to create subtle structural hierarchy.
- **Cyber-Cherry (#FF003C):** The primary action and alert color. It represents "Active" states, critical data points, and high-energy transitions.
- **Electric Blue (#00E0FF):** The system's "Pulse." Used for data streams, telemetry highlights, and secondary interactive elements.
- **Technical Black (#0A0A0A):** Reserved for high-contrast typography and structural grid lines.
- **Halftone Tint (#D1D1D6):** A mid-grey used specifically for halftone patterns and background textures to provide a sense of physical "printed" hardware.

## Typography

Typography is the primary engine of the "Technical Instrument" feel. The system utilizes a three-tier font strategy:

1.  **Space Grotesk (Headlines):** High-tech, geometric, and bold. Used for major module headings and primary navigation nodes.
2.  **Geist (Body):** A clean, developer-centric sans-serif for high readability in dense descriptions and UI instructions.
3.  **JetBrains Mono (Data & Labels):** The "Heart" of the system. Used for all data feeds, telemetry, status labels, and any element requiring a "computed" aesthetic.

Large headlines should use tight tracking, while micro-labels should use wide letter-spacing (0.1em) to maintain legibility at 10px or smaller. All numeric data must be rendered in monospaced font to ensure alignment in rapidly updating tables.

## Layout & Spacing

This design system employs a **Micro-Grid Layout** (4px base unit). The layout philosophy is "Information-Dense Carpet"—maximizing the visible data without clutter through strict alignment and fine-line separation.

- **The Grid:** A 12-column fluid grid is used for macro-layout, but sub-modules must snap to a secondary 1px internal grid.
- **Borders as Spacing:** Instead of wide whitespace, use 1px Technical Black or mid-grey borders to define zones.
- **Density:** Padding is intentionally tight (8px-12px) within data modules to allow for more content on-screen simultaneously.
- **Breakpoints:**
    - **Desktop (1280px+):** Full multi-column dashboard with side-car data feeds.
    - **Tablet (768px - 1279px):** Collapsed sidebars, priority given to primary telemetry.
    - **Mobile (Below 768px):** Stacked modules; font sizes for data feeds are reduced to the 9px `micro-feed` tier to preserve the dense look.

## Elevation & Depth

In a Light Tech Noir system, depth is achieved through **structural layering** rather than traditional soft shadows.

- **Flat Layering:** Components do not float; they sit flush or are "etched" into the surface.
- **Halftone Textures:** Use a subtle halftone dot pattern (radial or linear) on the background of secondary panels (`#F4F4F7`) to create a "tactile hardware" sensation.
- **Fine-Line Borders:** Use 1px solid borders for primary containers. Use 1px dashed borders for "optional" or "empty" states to simulate technical blueprints.
- **Backdrop Blurs:** When overlays (modals) are required, use a high-intensity backdrop blur (20px) with a semi-transparent white tint (80% opacity) to maintain the "Light Lab" atmosphere while isolating the task.
- **Glow Accents:** Use a very tight, high-intensity outer glow (2px-4px) on active Cyber-Cherry elements to simulate LED indicators.

## Shapes

The shape language is strictly **Sharp (0px)**. To maintain the "Technical Instrument" and "Brutalist" influence, there are no rounded corners in the design system.

- **Corners:** Every button, input, card, and panel must have a 90-degree corner.
- **Beveled Details:** For special "Hero" buttons or active tabs, a 45-degree clipped corner (chamfer) may be used to enhance the "Cybernetic" hardware feel.
- **Iconography:** Icons should be stroke-based, 1.5px weight, with sharp terminations.

## Components

- **Buttons:** Rectangular with a 1px border. Default state is White background with Technical Black text. Hover state flips to Cyber-Cherry background with White text. Use a small "corner accent" (a 4x4px square in the top-right) for primary actions.
- **Data Cards:** No shadows. Defined by a 1px border. The top header of the card should be a solid 20px bar in Technical Black with `label-caps` text in White.
- **Input Fields:** Bottom-border only (2px thickness). When focused, the border becomes Electric Blue and triggers a micro-feed of technical "validation text" below the field.
- **Chips/Status Tags:** Use a "Status Box" style—a solid block of color (Cyber-Cherry for Error, Electric Blue for Active) with monospaced text.
- **Progress Bars:** Segmented into blocks (10-step increments) rather than a continuous fluid bar, evoking old-school hardware diagnostics.
- **Telemetry Lists:** High-density rows with alternating light-grey backgrounds. Each row should feature a "timestamp" in the `micro-feed` font.
- **Grid Overlays:** A subtle, non-interactive 1px light grey grid can be toggled as a background layer for the entire workspace to aid the "Lab Instrument" aesthetic.