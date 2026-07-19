// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { adminContentMiddleware } from './admin-content-middleware.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://ativa-afina.vercel.app',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // WebP + AVIF via componente <Image /> do Astro
    domains: [],
  },
  vite: {
    plugins: [tailwindcss(), adminContentMiddleware()],
  },
});
