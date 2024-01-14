import { defineCollection } from 'astro:content'
import { BlogSchema } from '../schema/BlogSchema';
import { AuthorSchema } from '../schema/AuthorSchema';
import { TagSchema } from '../schema/TagSchema';

export const collections = {
    blog: defineCollection({
        type: 'content',
        schema: BlogSchema,
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