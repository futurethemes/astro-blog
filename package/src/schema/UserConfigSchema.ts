import { z } from 'astro/zod'

// import { ComponentConfigSchema } from './ComponentConfigSchema'
import { LayoutConfigSchema } from './LayoutConfigSchema'
import { SEOSchema } from './SEOSchema'

export const UserConfigSchema = z.object({
	/** Title for your website. Will be used in metadata and as browser tab title. */
	title: z
		.string()
        .default('My Astro Site')
		.describe('Title for your website. Will be used in metadata and as browser tab title.'),

    /**
     * These options will get used on your blog root page: `/blog`
     */
    blogRoot: z.object({
        /**
         * An object containing config for Astro SEO. 
         * 
         * ---
         * 
         * @see https://github.com/jonasmerlin/astro-seo/tree/main
         * @see https://github.com/jonasmerlin/astro-seo/blob/main/src/SEO.astro
         */
        seo: SEOSchema,

        /** Description metadata for your website. Can be used in page metadata. */
        description: z
            .string()
            .optional()
            .describe('Description metadata for your website. Can be used in page metadata.'),
    }).optional(),


    /** Specify paths to components that should override Astro Blog Plugin's default components */
	// components: ComponentConfigSchema(),

    /**
     * Your standard layout component.
     * 
     * eg:
     * 
     * ```ts
     * {
     *   layoutComponent: './src/components/layouts/Layout.component',
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
     *   logo: {
     *     src: './src/path/to/image.png',
     *   }
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
     * How many blog posts should be visible per page.
     * 
     * @default 9
     */
    paginateSize: z.number().default(9),

    /**
     * If you're working in an SSR environment you can set the pages astro-blog provides to be prerendered
     */
    // prerender: z.boolean().default(true)
})

export type AstroBlogConfig = z.infer<typeof UserConfigSchema>
export type AstroBlogUserConfig = z.input<typeof UserConfigSchema>