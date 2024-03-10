import { defineConfig } from 'astro/config';
import AstroBlog from 'astro-blog';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
	// tailwind(),
	AstroBlog({
		title: 'Test Astro Blog',
		layoutComponent: './src/components/Layouts/Layout.astro',
	}),
  ]
});
