import { defineConfig, squooshImageService } from 'astro/config';
import { AstroBlogPlugin } from './index';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), AstroBlogPlugin({
    title: 'Test Site'
  }), mdx()],
  image: {
    service: squooshImageService(),
  },
});