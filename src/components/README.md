# Components Directory

Shared UI components for QueueTheoryApp, styled with the Antigravity-inspired design system.

## Components

| Component | Purpose |
|---|---|
| `Nav.tsx` | Glassmorphic sticky navigation with backdrop-blur, framer-motion mobile drawer, profile dropdown |
| `Footer.tsx` | Column-layout footer with product/resource links, giant semi-transparent brand text |
| `ThemeToggle.tsx` | Animated sun/moon toggle using framer-motion rotation |
| `FloatingParticles.tsx` | Canvas-based animated dot-field background (blue/purple/cyan hues) |
| `Logo.tsx` | SVG logo component |
| `AuthContext.tsx` | Authentication context provider (Firebase) |
| `AuthGuard.tsx` | Route protection wrapper |
| `Login.tsx` | Login form component |
| `ClientLayout.tsx` | Client-side layout wrapper (includes Nav) |

## Design Patterns

- All components use CSS custom properties from `src/styles/tokens.css`
- Inline styles used for component-specific layout; global CSS classes for shared patterns
- framer-motion used for enter/exit animations (Nav menu, ThemeToggle, profile dropdown)
- `FloatingParticles` respects `prefers-reduced-motion` media query
