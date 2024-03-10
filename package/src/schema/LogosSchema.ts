import { z } from 'astro/zod'

export const ImageMetadata = z.object({
    src: z.string(),
    width: z.number(),
    height: z.number()
})

export const LogosSchema = z.object({
    alt: z.string().default(''),
    light: ImageMetadata,
    dark: ImageMetadata,
})

export type LogosConfig = z.infer<typeof LogosSchema>