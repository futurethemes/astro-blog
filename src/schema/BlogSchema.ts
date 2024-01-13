import { reference } from 'astro:content';
import { z } from 'astro/zod'

// @ts-ignore
export const BlogSchema = ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    isDraft: z.boolean(),
    
    /**
     * A string of the unique id of the author
     */
    author: reference('author'),
    datePublished: z.date(),
    tags: z.array(reference('tag')),
    imageSrc: image(),
    imageAlt: z.string().default(''),
})

export type BlogSchemaRaw = Omit<z.infer<ReturnType<typeof BlogSchema>>, 'imageSrc'> & {
    imageSrc: ImageMetadata;
}

export type BlogSchemaTransformed = Omit<BlogSchemaRaw, 'datePublished'> & {
    datePublished: string;
    slug: string;
    link: string;
    render: Function;
    id: string;
}

export type BlogContentCollectionData = {
    id: string;
    slug: string;
    body: string;
    collection: string;
    render: Function;
    data: BlogSchemaRaw;
}