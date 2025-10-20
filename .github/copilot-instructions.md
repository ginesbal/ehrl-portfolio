# Copilot Instructions for ehrl-portfolio

## Project Overview
Next.js 15 portfolio site with App Router, showcasing projects with custom modal interactions and performance-optimized animations. Built with React 19, Framer Motion, and Tailwind CSS.

## Architecture Patterns

### Component Organization
- **Sections** (`components/sections/`): Full-page sections composed on `app/page.js` - Hero, Projects, Skills, About, Contact
- **Modals** (`components/modals/`): Project detail overlays with custom showcase capability
- **Projects** (`components/projects/`): Project-specific components (ParkPalShowcase, PhoneMockup, ProjectCard)
- **Layout** (`components/layout/`): Navigation with scroll-based active section detection, Footer

### Modal System
Projects can render in two modes via `ProjectModalWrapper`:
- **Standard modal**: Generic project display for future projects
- **Custom showcase**: Project-specific full-screen showcase (e.g., `ParkPalShowcase.jsx`)

Controlled by `customShowcase: true` flag in `data/portfolio-data.js`. This pattern allows deep project storytelling while maintaining consistent modal infrastructure.

### Data Structure
Central data in `data/portfolio-data.js`:
- Project metadata with optional `customShowcase` flag
- Utility functions: `getProjectById`, `getFeaturedProjects`, etc.
- **Single source of truth** - all project data lives here

## Styling Conventions

### CSS Variables (globals.css)
Use semantic CSS variables, NOT Tailwind color classes:
```jsx
style={{ color: 'var(--rose-taupe)' }}
style={{ background: 'var(--bg-secondary)' }}
```

Key variables:
- Colors: `--rose-taupe`, `--rose-quartz`, `--onyx`, `--anti-flash-white`
- Backgrounds: `--bg-primary`, `--bg-secondary`, `--bg-dark`
- Text: `--text-primary`, `--text-secondary`, `--text-muted`
- Borders: `--border-light`, `--border-dark`
- Easings: `--ease-out-expo`, `--ease-out-quart`

### Typography Classes
Pre-defined classes in `globals.css`:
- `heading-xl`, `heading-lg`, `heading-md` for headlines
- `body-text`, `caption-text` for content
- `container-custom` for consistent page margins

## Animation Patterns

### Framer Motion Variants
Reusable animation objects in `lib/animations.js`:
- `fadeInUp`, `fadeIn`, `scaleIn`
- `slideInFromLeft`, `slideInFromRight`
- `staggerContainer` for sequential reveals
- `textReveal` for text masking effects

### Inline Animations
Some components use inline Framer Motion for context-specific timing (see `Hero.jsx` for staggered text reveals with custom delays).

## Navigation System

### Hash-based Section Navigation
- Homepage uses anchor links (`#projects`, `#about`, `#contact`)
- Navigation tracks active section via scroll position intersection
- Projects page is separate route (`/projects`)
- Special handling in `app/layout.js` strips hash on hard refresh to prevent scroll jumps

### Active State Logic (Navigation.jsx)
```jsx
const isItemActive = (item) => {
  if (item === 'projects') {
    return onProjectsRoot || (onHome && activeSection === 'projects')
  }
  return activeSection === item
}
```

## Development Workflows

### Commands
```bash
npm run dev      # Local development (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint check
```

### File Extensions
**Always use `.jsx`** for React components. The codebase has been cleaned of duplicate `.js` files. `.jsx` is preferred as it explicitly indicates JSX content and provides better IDE support.

## API Routes

### Contact Form (`app/api/contact/route.js`)
POST endpoint with validation for name, email, subject, message. Uses **Resend** for email delivery.

**Environment Variables Required:**
- `RESEND_API_KEY`: Get from https://resend.com/api-keys
- `CONTACT_EMAIL`: Your email address for receiving submissions

See `.env.local.example` for configuration template.

## Static Assets

### Public Directory Structure
- `/files/resume.pdf`: Resume for download
- `/screenshots/parkpal-*.png`: Project gallery images
- `/parkpal/index.html`: Embedded Expo web build for live demo
- `/images/projects/`: Project thumbnails and assets

### Embedded Demos
ParkPal uses iframe to `/parkpal/index.html` (Expo web export). Future mobile projects should follow this pattern.

## Key Conventions

### State Management
Simple React hooks (`useState`, `useEffect`) - no external state library. Modal state lifted to parent sections.

### Client Components
Most components are `'use client'` due to interactivity (Framer Motion, scroll listeners, modals). Keep server components where possible for new sections without interactions.

### Import Paths
Use `@/` alias for absolute imports from root:
```jsx
import { projects } from '@/data/portfolio-data'
import Hero from '@/components/sections/Hero.jsx'
```

## Common Patterns

### Hover State with Inline Styles
Many components use controlled inline styles for hover due to CSS variable integration:
```jsx
onMouseEnter={(e) => {
  e.currentTarget.style.background = 'var(--rose-taupe)'
}}
```

### Scroll-based Effects
Navigation and Hero use `window.addEventListener('scroll')` with cleanup. Always remove listeners in cleanup function.

### Gradient Backgrounds
Dynamic gradients via inline styles from project data:
```jsx
background: `linear-gradient(135deg, ${project.gradient})`
```

## Adding New Projects

1. Add project object to `data/portfolio-data.js` 
2. For standard projects: Set `demo` to iframe URL or null
3. For custom showcases: Set `customShowcase: true` and create showcase component
4. Add gallery images to `/screenshots/` or `/public/images/`
5. Modal system automatically handles rendering logic

## Known Quirks

- Hash stripping script in `app/layout.js` prevents scroll position restoration on refresh to avoid jarring jumps when users hard-refresh the homepage
