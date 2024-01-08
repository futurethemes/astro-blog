import { z } from 'astro/zod'

import { ComponentConfigSchema } from './ComponentConfigSchema'
import { LayoutConfigSchema } from './LayoutConfigSchema'

export const UserConfigSchema = z.object({
	/** Title for your website. Will be used in metadata and as browser tab title. */
	title: z
		.string()
		.describe('Title for your website. Will be used in metadata and as browser tab title.'),

	/** Description metadata for your website. Can be used in page metadata. */
	description: z
		.string()
		.optional()
		.describe('Description metadata for your website. Can be used in page metadata.'),

    /** Specify paths to components that should override Astro Blog Plugin's default components */
	components: ComponentConfigSchema(),

    /**
     * Your standard layout component.
     * 
     * eg:
     * 
     * ```ts
     * import Layout from './src/Layout.astro'
     * 
     * ...
     * 
     * {
     *   layoutComponent: Layout
     * }
     * ```
     */
    layoutComponent: LayoutConfigSchema(),
    
    /**
     * A custom OpenGraph image to include on every page.
     * 
     * eg:
     * ogImage: '/og.png'
     */
    ogImage: z
        .string()
        .url()
        .optional(),
})

export type AstroBlogPluginConfig = z.infer<typeof UserConfigSchema>
export type AstroBlogPluginUserConfig = z.input<typeof UserConfigSchema>