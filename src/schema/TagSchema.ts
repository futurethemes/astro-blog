import { z } from 'astro/zod';

export const TagSchema = () => {
	return z.object({
        tag: z.string().default('blog')
    })
}