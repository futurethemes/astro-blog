import { reference, type SchemaContext } from 'astro:content';
import { z } from 'astro/zod'

import { type AuthorSchemaRaw } from './AuthorSchema';
import { TagSchema } from './TagSchema';

export const BlogSchema = ({ image }: SchemaContext) => z.object({
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

export type BlogSchemaTransformed = Omit<BlogSchemaRaw, 'datePublished' | 'author' | 'tags'> & {
    datePublished: string;
    slug: string;
    link: string;
    render: Function;
    id: string;
    author: AuthorSchemaRaw,
    tags: Array<z.infer<typeof TagSchema>>,
}

export type BlogContentCollectionData = {
    id: string;
    slug: string;
    body: string;
    collection: string;
    render: Function;
    data: BlogSchemaRaw;
}