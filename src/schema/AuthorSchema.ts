import { z } from 'astro/zod';

// @ts-ignore
export const AuthorSchema = ({ image }) => z.object({
    name: z.string(),
    description: z.string().optional(),
    image: image(),
})