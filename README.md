# BadgerTech Universal Website Template

A complete, production-ready React website template built with modern technologies and automated setup.

## 🚀 Quick Start

```bash
# If running the complete automation:
./header_v4_hotfix.sh              # Fix any configuration issues
./header_v4C_services.sh           # Add services section
./header_v4C2_about_contact.sh     # Add about and contact sections  
./header_v4C3_footer_integration.sh # Add footer and final integration

# Or if you have the complete project:
npm install
npm run dev
```

## 📋 What's Included

### ✅ Complete Sections
- **Header**: Professional navigation with mobile menu
- **Hero**: Configurable hero section with multiple variants
- **Services**: Professional service cards with pricing and CTAs
- **About**: Company information with highlights and team details
- **Contact**: Contact form with business information and social links
- **Footer**: Comprehensive footer with legal links and newsletter signup

### 🎨 Design System
- **Colors**: Professional blue (#0066CC) and white theme
- **Typography**: Goldman Bold for headings, system fonts for body
- **Borders**: Maximum 2px radius throughout
- **Responsive**: Mobile-first design with tablet and desktop breakpoints
- **Shadows**: Professional blue-tinted shadows

### 🛠 Technical Features
- **React 18+** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS v3.4.x** for styling
- **Radix UI** for accessible components
- **Configuration-driven** architecture
- **SEO optimized** with meta tags and structured data
- **Performance optimized** with lazy loading and code splitting

## 🔧 Customization

### Update Site Content
Edit the configuration files to customize your content:

```typescript
// src/config/site.ts - Main site configuration
// src/config/services.ts - Services and pricing
// src/config/about.ts - Company information
// src/config/contact.ts - Contact details
// src/config/footer.ts - Footer content
```

### Modify Styling
The design system is centralized in:
- `src/styles/index.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration

### Add New Sections
Follow the established pattern:
1. Create component in `src/components/`
2. Create configuration in `src/config/`
3. Add to `src/App.tsx`

## 📂 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation and hero
│   ├── ServiceCard.tsx  # Individual service cards
│   ├── ServicesSection.tsx # Services grid
│   ├── AboutSection.tsx # About company
│   ├── ContactForm.tsx  # Contact form
│   ├── ContactSection.tsx # Contact info
│   └── Footer.tsx       # Site footer
├── config/              # Configuration files
│   ├── site.ts         # Main site config
│   ├── services.ts     # Services configuration
│   ├── about.ts        # About page config
│   ├── contact.ts      # Contact info config
│   └── footer.ts       # Footer configuration
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── styles/              # CSS files
└── App.tsx             # Main application component
```

## 🎯 Key Features

### Services Section
- **Double-sized cards** for professional appearance
- **Blue borders** with hover effects
- **Pricing display** with starting prices
- **Feature lists** with checkmark icons
- **CTA integration** with email/phone/link support
- **Popular service highlighting**

### Contact System
- **Interactive form** with validation
- **Email integration** (opens default mail client)
- **Business information** display
- **Social media links**
- **Office hours** and contact methods

### Footer
- **Company information** and description
- **Quick navigation** links
- **Legal pages** (Privacy, Terms)
- **Social media** integration
- **Newsletter signup** (optional)
- **Back to top** functionality

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Run `npm run build`
2. Drag the `dist/` folder to Netlify

### Deploy to Vercel
1. Connect your GitHub repository
2. Vercel will auto-deploy on push

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder contents to your web server

## 🔍 SEO & Performance

### Included Optimizations
- **Meta tags** for social media sharing
- **Semantic HTML** structure
- **Image optimization** with lazy loading
- **Performance budgets** and code splitting
- **Accessibility** features (WCAG 2.1 AA compliant)
- **Mobile-first** responsive design

### Lighthouse Targets
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build and test production version
npm run build
npm run preview

# Type checking
npx tsc --noEmit
```

## 📞 Support

For technical support or customization assistance:
- **Email**: hello@badgetechnologies.com
- **Documentation**: This README and inline code comments
- **Issues**: Check console for any errors

## 📄 License

This template is provided by BadgerTech LLC. Feel free to use for commercial projects.

---

**Built with ❤️ by BadgerTech LLC**
