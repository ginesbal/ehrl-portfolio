# Ehrl Balquin - Portfolio

A modern, performance-optimized portfolio showcasing full-stack development projects with a focus on spatial databases and React applications.

**Live Site:** [Coming Soon - Deploy to Vercel]

## 🚀 Featured Project

### ParkPal - Smart Parking Finder

Mobile-first parking finder for downtown Calgary with PostGIS spatial optimization. Built with React Native, Node.js, and PostgreSQL with PostGIS extensions.

**Key Technical Achievement:**

- Optimized geospatial queries from 800ms+ to ~120ms average using PostGIS spatial indexing
- Implemented `ST_DWithin` radius-based searches with custom indexes
- 100+ parking spots retrieved with debounced search (300ms) to reduce API calls

[View Live Demo](/parkpal) | [GitHub](https://github.com/ginesbal/parkpal)

## 🛠️ Tech Stack

**Frontend:**

- Next.js 15 (App Router)
- React 19
- Framer Motion (animations)
- Tailwind CSS (utility-first styling)

**Backend & Services:**

- Node.js
- PostgreSQL + PostGIS
- Resend (email service)

**Development Tools:**

- TypeScript
- ESLint
- Git/GitHub

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/ehrlbalquin/ehrl-portfolio.git
cd ehrl-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:

```env
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your.email@example.com
```

Get your Resend API key from [resend.com/api-keys](https://resend.com/api-keys)

4. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
ehrl-portfolio/
├── app/                    # Next.js App Router pages
│   ├── api/contact/       # Contact form API endpoint
│   ├── projects/          # Projects page
│   └── page.js            # Homepage
├── components/
│   ├── sections/          # Full-page sections (Hero, Projects, Contact)
│   ├── projects/          # Project-specific components
│   ├── modals/            # Modal system
│   ├── layout/            # Navigation, Footer
│   └── ui/                # Reusable UI components
├── data/
│   └── portfolio-data.js  # Single source of truth for project data
├── lib/
│   └── animations.js      # Reusable Framer Motion variants
└── public/
    ├── parkpal/           # Embedded ParkPal demo
    ├── screenshots/       # Project images
    └── files/             # Resume PDF
```

## 🎨 Design System

The portfolio uses a custom CSS variable system for consistent theming:

- **Colors:** Rose Taupe (`#6b4f4f`), Anti-Flash White, Onyx
- **Typography:** System font stack with responsive sizing
- **Animations:** Framer Motion with custom easing curves
- **Responsive:** Mobile-first design with Tailwind breakpoints

See `app/globals.css` for full variable definitions.

## 🧪 Key Features

- **Custom Modal System:** Project showcases can use standard modal or custom full-screen layouts
- **Performance Optimized:** Lazy loading, optimized images, minimal bundle size
- **Accessibility:** Semantic HTML, keyboard navigation, ARIA labels
- **Contact Form:** Server-side validation with Resend email integration
- **Scroll-based Navigation:** Active section detection with hash routing

## 📧 Contact Form Setup

The contact form uses [Resend](https://resend.com) for email delivery:

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain OR use their testing domain
3. Create an API key
4. Add to `.env.local` as shown above

See `CONTACT_SETUP.md` for detailed instructions.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ehrlbalquin/ehrl-portfolio)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables (RESEND_API_KEY, CONTACT_EMAIL)
4. Deploy!

### Build for Production

```bash
npm run build
npm run start
```

## 📝 License

© 2024-2025 Ehrl Balquin. All rights reserved.

## 🤝 Connect

- **Email:** <ehrl.balquin@gmail.com>
- **LinkedIn:** [linkedin.com/in/ehrlbalquin](https://linkedin.com/in/ehrlbalquin)
- **GitHub:** [github.com/ehrlbalquin](https://github.com/ehrlbalquin)
