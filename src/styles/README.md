# Styles Directory

This directory contains the design system foundation for QueueTheoryApp, inspired by the antigravity.google aesthetic.

## File Structure

| File | Purpose |
|---|---|
| `tokens.css` | Design tokens — colors, radii (up to 60px), shadows, glassmorphism vars, transitions |
| `animations.css` | Keyframe animations and utility classes — reveal-up, float-particle, glow-pulse, drift-bg |
| `globals.css` | Global styles — glass-card, pill-shaped buttons, inputs, badges, gradient-text utility |

## Token Architecture

- **Light mode** — warm white bg (#f8f9fa) with soft blue/cyan ambient glows
- **Dark mode** — deep black bg (#050a14) with blue-tinged surfaces
- **Glassmorphism** — `--surface-glass`, `--border-glass` tokens define translucent panels
- **Glow tokens** — `--glow-primary` (blue), `--glow-secondary` (violet), `--glow-cyan` for ambient radial gradients

## Data Flow

`globals.css` imports `tokens.css` and `animations.css`. The root layout (`src/app/layout.tsx`) imports only `globals.css` — all tokens and animations cascade from there.
