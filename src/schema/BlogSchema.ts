import { z } from 'astro/zod'

// @ts-ignore
export const BlogSchema = ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    isDraft: z.boolean(),
    
    /**
     * A string of the unique id of the author
     */
    author: z.string(),
    datePublished: z.date(),
    tags: z.array(z.string()),
    imageSrc: image(),
    imageAlt: z.string().optional(),
})