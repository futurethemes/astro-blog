import { z } from 'astro/zod';

export const AuthorSchema = () => ({ image }) => z.object({
    name: z.string(),
    description: z.string().optional(),
    image: image(),
})