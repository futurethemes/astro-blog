import { defineCollection } from 'astro:content'
import { ArticleSchema } from '../schema/ArticleSchema';
import { AuthorSchema } from '../schema/AuthorSchema';
import { TagSchema } from '../schema/TagSchema';

export const collections = {
    blog: defineCollection({
        type: 'content',
        schema: ArticleSchema,
    }),


    author: defineCollection({
        type: 'content',
        schema: AuthorSchema,
    }),

    tag: defineCollection({
        type: 'content',
        schema: TagSchema,
    }),
}