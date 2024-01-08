import { z } from 'astro/zod';

export function LayoutConfigSchema() {
	return z
		.string()
        .default('@futurethemes/astro-blog-plugin/components/Layout.astro')
}