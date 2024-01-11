import { z } from 'astro/zod'

import { ComponentConfigSchema } from './ComponentConfigSchema'
import { LayoutConfigSchema } from './LayoutConfigSchema'
import { SEOSchema } from './SEOSchema'

export const UserConfigSchema = z.object({
	/** Title for your website. Will be used in metadata and as browser tab title. */
	title: z
		.string()
        .default('My Astro Site')
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
     * A string of a path to your logo image.
     * Or you can specify a light and dark version of your logo
     * 
     * eg:
     * 
     * ```
     * {
     *   logo: './src/path/to/image.png',
     * }
     * 
     * OR
     * 
     * {
     *   logo: {
     *     light: './src/path/to/light/image.png',
     *     dark: './src/path/to/dark/image.png',
     *   }
     * }
     * ```
     */
    logo: z.union([
        z.object({
            /** Source of the image to use */
            src: z.string(),

            /** Alternative text description of the logo */
            alt: z.string().default(''),
        }),
        z.object({
             /** Source of the image to use in dark mode */
             dark: z.string(),

             /** Source of the image to use in light mode */
            light: z.string(),

            /** Alternative text description of the logo */
            alt: z.string().default(''),
        })
    ]).optional(),
    
    /**
     * An object containing config for Astro SEO. 
     * 
     * ---
     * 
     * @see https://github.com/jonasmerlin/astro-seo/tree/main
     * @see https://github.com/jonasmerlin/astro-seo/blob/main/src/SEO.astro
     */
    seo: SEOSchema,
})

export type AstroBlogPluginConfig = z.infer<typeof UserConfigSchema>
export type AstroBlogPluginUserConfig = z.input<typeof UserConfigSchema>