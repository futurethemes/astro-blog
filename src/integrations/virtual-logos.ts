import { logos } from 'virtual:astro-blog/user-images'

export const AstroBlogLogos = logos satisfies {
    dark?: ImageMetadata;
    light?: ImageMetadata;
    alt?: string;
};