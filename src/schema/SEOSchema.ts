import { z } from 'astro/zod'

export const SEOSchema = z.object({
    title: z.string().optional(),
    titleDefault: z.string().optional(),
    charset: z.string().optional(),
    description: z.string().optional(),
    canonical: z.string().url().optional(),
    nofollow: z.string().optional(),
    noindex: z.string().optional(),
    languageAlternatives: z.array(z.object({
        href: z.string().url(),
        hrefLang: z.string(),
    })).optional(),

    openGraph: z.object({
        basic: z
            .object({
                title: z.string(),
                type: z.string(),
                image: z.string(),
                url: z.string().url().optional(),
            })
            .refine(data => data.title && data.type && data.image, {
                message: 'If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!',
            })
            .optional()
            .describe('If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!'),
        optional: z
            .object({
                audio: z.string().optional(),
                description: z.string().optional(),
                determiner: z.string().optional(),
                locale: z.string().optional(),
                localeAlternate: z.array(z.string()).optional(),
                siteName: z.string().optional(),
                video: z.string().optional(),
            })
            .optional(),
        article: z
            .object({
                publishedTime: z.string().optional(),
                modifiedTime: z.string().optional(),
                expirationTime: z.string().optional(),
                authors: z.array(z.string()).optional(),
                section: z.string().optional(),
                tags: z.array(z.string()).optional(),
            })
            .optional(),
        twitter: z
            .object({
                card: z.string().refine(str => str === 'summary' || str === 'summary_large_image' || str === 'app' || str === 'player'),
                site: z.string().optional(),
                creator: z.string().optional(),
                title: z.string().optional(),
                description: z.string().optional(),
                image: z.string().url().optional(),
                imageAlt: z.string().optional(),
            })
            .optional(),
    }).optional(),
}).optional()

export type SEOConfig = z.infer<typeof SEOSchema>
export type SEOUserConfig = z.input<typeof SEOSchema>