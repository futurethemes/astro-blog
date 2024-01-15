import type { AstroIntegration } from "astro"
import { type SafeParseSuccess } from 'astro/zod'

import { UserConfigSchema, type AstroBlogUserConfig, type AstroBlogConfig } from './src/schema/UserConfigSchema'
import { vitePluginAstroBlogUserConfig } from './src/integrations/virtual-user-config'

export default function AstroBlog(options: AstroBlogUserConfig): AstroIntegration {
    return {
        name: 'astro-blog',
        hooks: {
            'astro:config:setup': async ({
                injectRoute,
                updateConfig,
                logger,
                config,
            }) => {
                const userConfig = UserConfigSchema.safeParse(options) as SafeParseSuccess<AstroBlogConfig>
                
                injectRoute({
                    pattern: '/blog',
                    entrypoint: 'astro-blog/blog.astro'
                })

                injectRoute({
                    pattern: '/blog/[page]',
                    entrypoint: 'astro-blog/blog/[page].astro'
                })

                injectRoute({
                    pattern: '/blog/[...slug]',
                    entrypoint: 'astro-blog/blog/[...slug].astro'
                })

                try {
                    updateConfig({
                        vite: {
                            plugins: [
                                vitePluginAstroBlogUserConfig(userConfig.data, config),
                            ],
                        },
                    })
                } catch (e) {
                    logger.error(e as string)
                    throw e
                }

                logger.info('Astro Blog Plugin Loaded!')
            }
        }
    }
}

export { AstroBlogTailwindPaths } from './tailwind.plugin'
export { type AstroBlogLayoutProps } from './src/types/LayoutProps'
