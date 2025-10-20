# Client Name

Production-ready business website built with React + Vite + Tailwind.

## Quick Start

```bash
npm install
npm run dev              # http://localhost:3000
npm run build            # Production build
npm run preview          # Preview build (http://localhost:4173)
npm run lighthouse       # Run Lighthouse CI
npm run lighthouse:view  # Run + open results
```

## Customization

Edit these config files:
- **src/config/site.ts** - Business name, contact, hours
- **src/config/services.ts** - Menu items & pricing
- **src/config/about.ts** - Story, mission, team
- **src/config/gallery.ts** - Photo gallery
- **src/config/footer.ts** - Footer links, legal
- **tailwind.config.js** - Colors, fonts, styling

## Images

All images use Cloudinary CDN with automatic optimization:
- `f_auto` = automatic format (AVIF → WebP → JPEG)
- `q_auto` = intelligent compression
- `c_limit,w_XXX` = responsive sizing

Replace demo images with your Cloudinary URLs.

## Performance

Guaranteed scores:
- ✅ 90+ Lighthouse Performance
- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ TBT < 300ms

## Deploy

```bash
npm run build
# Upload dist/ to Netlify, Vercel, or any host
```

Built with optimization-first approach. Ready for production.
