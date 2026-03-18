# BADGR Funnel Site - Production-Ready Files Output

This document contains all missing and incomplete files required to make the badgr-funnel project fully production-ready, deployable, and maintainable.

---

## FILE: vercel.json

```json
{
  "version": 2,
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "env": {
    "NODE_ENV": "production",
    "PORT": "3000"
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/dist/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/public/index.html"
    }
  ],
  "functions": {
    "server/index.ts": {
      "memory": 1024,
      "maxDuration": 60
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, immutable"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## FILE: netlify.toml

```toml
[build]
command = "pnpm run build"
publish = "dist/public"
functions = "dist"

[build.environment]
NODE_VERSION = "22"
NODE_ENV = "production"

[[redirects]]
from = "/api/*"
to = "/.netlify/functions/server/:splat"
status = 200

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

[[headers]]
for = "/api/*"
[headers.values]
Cache-Control = "no-cache, no-store, must-revalidate"
X-Content-Type-Options = "nosniff"

[[headers]]
for = "/*"
[headers.values]
X-Content-Type-Options = "nosniff"
X-Frame-Options = "DENY"
X-XSS-Protection = "1; mode=block"
Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## FILE: README.md

```markdown
# BADGR Funnel Site

A modern, high-performance funnel website for BADGRTechnologies LLC built with React 19, TypeScript, Vite, and Express.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

BADGR Funnel Site is a production-ready conversion funnel designed to help BADGRTechnologies LLC acquire leads and customers. The site features:

- **Hero Section:** Free site audit tool with instant Core Web Vitals scoring
- **Services & Pricing:** Three-tier pricing model with annual savings option
- **AI Solutions:** ROI calculator and AI implementation showcase
- **Results Section:** Case studies and testimonials
- **CTA Sections:** Strategic call-to-action elements throughout
- **Stripe Integration:** Seamless payment processing
- **Responsive Design:** Mobile-first, fully responsive layout
- **Performance Optimized:** Minimal CSS, fast load times, optimized images

### Design Philosophy

The site follows the **"Cyber-Industrial Monolith"** aesthetic:
- Dark monotone background (deepest black #050505)
- Strategic cobalt blue accents (oklch(0.4 0.22 260))
- Minimal corner radius (0.1rem)
- Space Grotesk + Ubuntu Sans typography
- Smooth animations and micro-interactions

## 🛠 Tech Stack

### Frontend
- **React** 19.2.1 - UI framework
- **TypeScript** 5.6.3 - Type safety
- **Vite** 7.1.7 - Build tool & dev server
- **Tailwind CSS** 4.1.14 - Utility-first CSS with @theme
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Backend
- **Express** 4.21.2 - HTTP server framework
- **Node.js** 22+ - Runtime
- **TypeScript** - Type safety
- **Stripe** 19.1.0 - Payment processing

### DevOps & Deployment
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Vercel** or **Netlify** - Hosting options

### Development Tools
- **pnpm** 10.15.1 - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **TypeScript** - Type checking

## 📦 Installation

### Prerequisites

- **Node.js** 22+ ([download](https://nodejs.org/))
- **pnpm** 10+ ([install](https://pnpm.io/installation))
- **Git** ([download](https://git-scm.com/))

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ch405-L9/badgr-funnel.git
   cd badgr-funnel
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Verify installation**
   ```bash
   pnpm run check
   ```

## 🚀 Development

### Start Development Server

```bash
pnpm dev
```

The site will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Health Check:** http://localhost:3000/api/health

### Available Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server (frontend + backend) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm test` | Run unit tests |
| `pnpm check` | TypeScript type checking |

### Project Structure

```
badgr-funnel/
├── client/                          # Frontend (React)
│   ├── public/                      # Static assets
│   │   ├── images/                  # Optimized images
│   │   └── index.html               # HTML entry point
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   ├── pages/                   # Page components
│   │   ├── contexts/                # React contexts
│   │   ├── lib/                     # Utility functions
│   │   ├── App.tsx                  # Main app component
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles & design tokens
│   └── package.json
├── server/                          # Backend (Express)
│   ├── config/                      # Configuration
│   │   └── env.ts                   # Environment loading & validation
│   ├── middleware/                  # Express middleware
│   │   └── errorHandler.ts          # Centralized error handling
│   ├── routes/                      # API routes
│   │   └── index.ts                 # Route mounting
│   ├── controllers/                 # Route controllers
│   │   └── health.controller.ts     # Health check controller
│   ├── services/                    # Business logic
│   │   └── health.service.ts        # Health check service
│   ├── app.ts                       # Express app setup
│   └── index.ts                     # Server bootstrap
├── tests/                           # Unit tests
│   └── sample.test.ts               # Sample test
├── .github/
│   └── workflows/
│       └── ci.yml                   # GitHub Actions CI/CD
├── Dockerfile                       # Multi-stage Docker build
├── docker-compose.yml               # Local orchestration
├── vitest.config.ts                 # Test configuration
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.js                 # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── package.json                     # Dependencies & scripts
└── README.md                        # This file
```

## 🏗 Building

### Development Build

```bash
pnpm build
```

This creates:
- `dist/public/` - Frontend static files
- `dist/index.js` - Backend server bundle

### Production Build

The production build is optimized for performance:

```bash
NODE_ENV=production pnpm build
```

## 🌐 Deployment

### Option 1: Docker (Recommended for Self-Hosted)

#### Build Image

```bash
docker build -t badgr-funnel:latest .
```

#### Run Container

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e STRIPE_SECRET_KEY=sk_live_xxx \
  badgr-funnel:latest
```

#### Using Docker Compose

```bash
docker-compose up -d
```

### Option 2: Vercel (Recommended for Serverless)

1. **Connect repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - Vercel automatically builds and deploys on push to main

```bash
# Manual deployment
vercel --prod
```

### Option 3: Netlify

1. **Connect repository** to Netlify
2. **Configure build settings:**
   - Build command: `pnpm run build`
   - Publish directory: `dist/public`
3. **Deploy** - Netlify automatically builds and deploys

### Option 4: Generic Node Host (Railway, Render, Heroku)

1. **Set environment variables** in hosting dashboard
2. **Configure start command:**
   ```
   NODE_ENV=production node dist/index.js
   ```
3. **Deploy** - Push to main branch or use hosting CLI

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | `production` |
| `PORT` | Server port | `3000` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://badgrtech.com` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe API secret key | `sk_live_xxx` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_xxx` |
| `DATABASE_URL` | Database connection string | `postgresql://...` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key` |
| `LOG_LEVEL` | Logging level | `info` |

### Setup

1. **Copy template**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit with your values**
   ```bash
   nano .env.local
   ```

3. **Never commit** `.env` files to version control

## 🧪 Testing

### Run All Tests

```bash
pnpm test
```

### Run Tests in Watch Mode

```bash
pnpm test -- --watch
```

### Generate Coverage Report

```bash
pnpm test -- --coverage
```

## 🐛 Troubleshooting

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

### Dependencies Not Installing

**Error:** `pnpm install fails`

**Solution:**
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
pnpm install
```

### Build Fails

**Error:** `pnpm build fails with TypeScript errors`

**Solution:**
```bash
# Check TypeScript
pnpm check

# Fix linting issues
pnpm lint -- --fix

# Rebuild
pnpm build
```

### Stripe Integration Not Working

**Error:** `Stripe API errors`

**Solution:**
1. Verify `STRIPE_SECRET_KEY` is set correctly
2. Check Stripe webhook configuration
3. Review Stripe dashboard for API errors
4. Ensure CORS is configured for your domain

### Docker Build Fails

**Error:** `Docker build fails`

**Solution:**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker build --no-cache -t badgr-funnel:latest .
```

## 📝 Contributing

### Code Style

- **Formatting:** Prettier (auto-formatted on commit)
- **Linting:** ESLint (must pass before commit)
- **Type Safety:** TypeScript (strict mode)

### Before Committing

```bash
# Format code
pnpm format

# Lint
pnpm lint -- --fix

# Test
pnpm test

# Type check
pnpm check
```

### Pull Request Process

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -m "feat: add my feature"`
3. Push to GitHub: `git push origin feature/my-feature`
4. Create Pull Request with description
5. Wait for CI/CD to pass
6. Request review from maintainers
7. Merge after approval

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 🔒 Security

For security concerns, please see [SECURITY.md](./SECURITY.md).

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@badgrtech.com

---

**Last Updated:** March 2026  
**Maintained by:** BADGRTechnologies LLC
```

---

## FILE: CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-18

### Added

- Initial release of BADGR Funnel Site
- Hero section with free site audit tool
- Services & pricing section with three-tier model
- AI solutions section with ROI calculator
- Results/testimonials section
- CTA sections throughout the site
- Stripe payment integration
- Responsive mobile-first design
- Dark mode with cyber-industrial aesthetic
- Production-ready backend with Express
- Docker containerization
- GitHub Actions CI/CD pipeline
- Comprehensive documentation
- ESLint and Prettier configuration
- Vitest unit testing setup
- Environment configuration and validation
- Centralized error handling
- Health check endpoint
- CORS configuration
- Graceful shutdown handling

### Technical Stack

- React 19.2.1
- TypeScript 5.6.3
- Vite 7.1.7
- Tailwind CSS 4.1.14
- Express 4.21.2
- Node.js 22+
- Docker & Docker Compose
- GitHub Actions

### Documentation

- README.md with complete setup and deployment instructions
- DEV_GUIDE.md with development guidelines
- SECURITY.md with security best practices
- CHANGELOG.md (this file)

---

## [Unreleased]

### Planned Features

- [ ] Database integration (PostgreSQL)
- [ ] User authentication (OAuth)
- [ ] Email notifications (SendGrid)
- [ ] Analytics dashboard
- [ ] Admin panel
- [ ] Blog/content management
- [ ] Advanced form analytics
- [ ] A/B testing framework
- [ ] Webhook support
- [ ] API rate limiting
```

---

## FILE: DEV_GUIDE.md

```markdown
# Development Guide

This guide provides detailed information for developers working on the BADGR Funnel Site project.

## Table of Contents

- [Frontend Development](#frontend-development)
- [Backend Development](#backend-development)
- [Adding Features](#adding-features)
- [Common Pitfalls](#common-pitfalls)
- [Debugging](#debugging)
- [Performance Tips](#performance-tips)

## Frontend Development

### Component Structure

Components are organized by responsibility:

```
client/src/components/
├── ui/                          # shadcn/ui components
├── Layout.tsx                   # Navigation & footer wrapper
├── Hero.tsx                     # Hero section
├── Pricing.tsx                  # Pricing cards
├── AISection.tsx                # AI solutions section
└── ...
```

### Creating a New Component

1. **Create component file**
   ```typescript
   // client/src/components/MyComponent.tsx
   import React from "react";
   
   interface MyComponentProps {
     title: string;
     description?: string;
   }
   
   export default function MyComponent({ title, description }: MyComponentProps) {
     return (
       <div className="space-y-4">
         <h2 className="text-2xl font-bold">{title}</h2>
         {description && <p className="text-muted-foreground">{description}</p>}
       </div>
     );
   }
   ```

2. **Export from index** (if needed)
   ```typescript
   // client/src/components/index.ts
   export { default as MyComponent } from "./MyComponent";
   ```

3. **Use in pages**
   ```typescript
   import { MyComponent } from "@/components";
   
   export default function Home() {
     return <MyComponent title="Welcome" />;
   }
   ```

### Styling Guidelines

- **Use Tailwind utilities** for layout and spacing
- **Use design tokens** for colors (e.g., `text-primary`, `bg-card`)
- **Avoid inline styles** - use Tailwind classes
- **Keep components responsive** - test on mobile, tablet, desktop
- **Use CSS variables** defined in `index.css` for consistency

### Design Tokens

All colors and sizes are defined in `client/src/index.css`:

```css
:root {
  --primary: oklch(0.4 0.22 260);      /* Cobalt blue */
  --background: oklch(0.15 0 0);       /* Deep black */
  --foreground: oklch(0.92 0 0);       /* Near white */
  --card: oklch(0.18 0 0);             /* Dark gray */
  --radius: 0.1rem;                    /* Minimal radi
(Content truncated due to size limit. Use line ranges to read remaining content)
