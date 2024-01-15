import { defineConfig, squooshImageService } from 'astro/config';
import AstroBlog from './index';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost',
  integrations: [tailwind(), AstroBlog({
    title: 'Test Site',
    layoutComponent: './src/components/Layouts/Layout.astro',
    logo: {
      dark: './src/assets/images/logo.png',
      light: './src/assets/images/logo-dark.png',
      alt: 'The FutureThemes logo',
    },
    blogRoot: {
      seo: {
      },
    }
  }), mdx()],
  image: {
    service: squooshImageService(),
  },
});