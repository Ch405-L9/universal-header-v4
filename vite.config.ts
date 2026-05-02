import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, type Plugin } from "vite";

function deferNonCriticalCss(): Plugin {
  return {
    name: "defer-non-critical-css",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html.replace(
          /<link rel="stylesheet"([^>]*?)href="(\/assets\/[^"]+\.css)"([^>]*?)>/g,
          (_, pre, href, post) =>
            `<link rel="preload"${pre}href="${href}"${post} as="style" onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
        );
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), deferNonCriticalCss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      "lucide-react/dist/esm/icons/briefcase-conveyor-belt.js": path.resolve(
        import.meta.dirname,
        "node_modules/lucide-react/dist/esm/icons/briefcase-business.js"
      ),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-radix-core": [
            "@radix-ui/react-slot",
            "@radix-ui/react-tooltip",
          ],
          "vendor-radix-overlay": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-menubar",
          ],
          "vendor-radix-form": [
            "@radix-ui/react-checkbox",
            "@radix-ui/react-label",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-slider",
            "@radix-ui/react-switch",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
          ],
          "vendor-radix-layout": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-progress",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-separator",
            "@radix-ui/react-tabs",
          ],
          "vendor-icons": ["lucide-react"],
          "vendor-motion": ["framer-motion"],
          "vendor-charts": ["recharts"],
          "vendor-toast": ["sonner", "next-themes"],
          "vendor-wouter": ["wouter"],
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
