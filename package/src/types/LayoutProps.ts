import type { SEOUserConfig } from "../schema/SEOSchema";
import type { AstroBlogConfig } from '../schema/UserConfigSchema'

export type AstroBlogLayoutProps = {
    title: string;
    description: string;
    seo: SEOUserConfig;
    config: AstroBlogConfig;
}