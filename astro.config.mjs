import { AstroBlogPlugin } from './index';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import dynamicImport from 'vite-plugin-dynamic-import';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), AstroBlogPlugin({
    title: 'Test Site'
  }), mdx()],
  vite: {
    base: './',
    plugins: [dynamicImport()]
  }
});