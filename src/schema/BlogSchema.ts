import { z } from 'astro/zod'

export const BlogSchema = () => ({ image }) => z.object({
    isDraft: z.boolean(),
    title: z.string(),
    description: z.string(),

    /**
     * A string of the unique id of the author
     */
    author: z.string(),
    datePublished: z.date(),
    tags: z.array(z.string()),
    imageSrc: image(),
    imageAlt: z.string().optional(),
})