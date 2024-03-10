import { z } from 'astro/zod';

export const TagSchema = z
    .object({
        tag: z.string().default('blog'),
        bgColor: z.string().default('#5b21b6'),
        textColor: z.string().default('#fff'),
    })

export type TagSchemaRaw = z.infer<typeof TagSchema>