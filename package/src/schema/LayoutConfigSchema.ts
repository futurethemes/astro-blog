import { z } from 'astro/zod';
import { createResolver } from 'astro-integration-kit';

const { resolve } = createResolver(import.meta.url)

export function LayoutConfigSchema() {
	return z
		.string()
		.optional()
}
