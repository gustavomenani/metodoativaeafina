// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://ativa-afina.vercel.app',
  output: 'static',
  adapter: vercel(),
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // WebP + AVIF via componente <Image /> do Astro
    domains: [],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
