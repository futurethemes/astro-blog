import { z } from 'astro/zod'

import { type AuthorSchemaRaw } from './AuthorSchema';
import { TagSchema } from './TagSchema';
import { SEOSchema } from './SEOSchema';

export const ArticleSchema = ({ image }) => z.object({
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
    imageAlt: z.string().default(''),
    seo: SEOSchema,
    featured: z.boolean().default(false),
})

export type ArticleSchemaRaw = Omit<z.infer<ReturnType<typeof ArticleSchema>>, 'imageSrc'> & {
    imageSrc: ImageMetadata;
}

export type ArticleSchemaTransformed = Omit<ArticleSchemaRaw, 'datePublished' | 'author' | 'tags'> & {
    datePublished: string;
    slug: string;
    link: string;
    render: Function;
    id: string;
    author: AuthorSchemaRaw,
    tags: Array<z.infer<typeof TagSchema>>,
}

export type ArticleContentCollectionData = {
    id: string;
    slug: string;
    body: string;
    collection: string;
    render: Function;
    data: ArticleSchemaRaw;
}