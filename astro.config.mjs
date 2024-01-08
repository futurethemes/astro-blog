import { AstroBlogPlugin } from './index'
import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"
import dynamicImport from 'vite-plugin-dynamic-import'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    AstroBlogPlugin({
        title: 'Test Site',
    }),
  ],
  vite: {
    base: './',
    plugins: [
        dynamicImport(),
    ],
  },
});