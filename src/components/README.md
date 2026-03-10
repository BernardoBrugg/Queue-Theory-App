# Components

This directory contains reusable UI components for the QueueTheoryApp.

## Main Components

- **Footer.tsx**: The global application footer, featuring a glassmorphic design and project credits.
- **Header/Nav**: Navigation components for application-wide routing.
- **Auth**: Components for user authentication and protection.
- **ui/**: Atomic UI components (buttons, inputs, etc.) based on the design system.

## Data Flow

Components are designed to be mostly stateless or to interact with global contexts (like `AuthContext`) to ensure a consistent user experience and easy modularity.
