import { type SchemaContext } from 'astro:content';
import { z } from 'astro/zod';

export const AuthorSchema = ({ image }: SchemaContext) => z.object({
    name: z.string(),
    description: z.string().optional(),
    imageSrc: image().optional(),
    imageAlt: z.string().optional()
})

export type AuthorSchemaRaw = Omit<z.infer<ReturnType<typeof AuthorSchema>>, 'imageSrc'> & Partial<{
    imageSrc: ImageMetadata;
}>