import { z } from 'astro/zod';

export function LayoutConfigSchema() {
	return z
		.string()
        .default('astro-blog/components/Layout.astro')
}