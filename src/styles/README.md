# src/styles/

Global CSS design system. Imported by `src/app/layout.tsx`.

## Files

| File | Purpose |
|------|---------|
| `tokens.css` | CSS custom properties for light (`default`) and dark (`[data-theme="dark"]`) themes: colors, shadows, radii, transitions |
| `animations.css` | Keyframe animations (`fade-in`, `slide-up`, `scale-in`, etc.) and utility classes |
| `globals.css` | Base reset, body styles, reusable classes (`glass-card`, `btn`, `input`, `badge`, `skeleton`) |

## Theme Switching

Dark/light mode is toggled by setting `data-theme` on `<html>`. Managed by `src/hooks/useTheme.ts`.
