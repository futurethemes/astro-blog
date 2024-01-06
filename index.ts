import type { AstroIntegration } from "astro"
import tailwind from '@astrojs/tailwind'

import { type AstroBlogPluginConfig, ThemeConfig, updateThemeConfig } from "./src/Config/config"
import { vitePluginAstroBlogPluginUserConfig } from './src/integrations/virtual-user-config'

export default function AstroBlogPlugin(options: AstroBlogPluginConfig): AstroIntegration {
    return {
        name: '@futurethemes/astro-blog-plugin',
        hooks: {
            'astro:config:setup': async ({
                injectRoute,
                injectScript,
                updateConfig,
                addWatchFile,
                logger,
                config,
            }) => {
                updateThemeConfig(options)
                
                injectRoute({
                    pattern: '/blog',
                    entrypoint: '@futurethemes/astro-blog-plugin/blog.astro'
                })

                injectRoute({
                    pattern: '/blog/[page]',
                    entrypoint: '@futurethemes/astro-blog-plugin/blog/[page].astro'
                })

                injectRoute({
                    pattern: '/blog/[...slug]',
                    entrypoint: '@futurethemes/astro-blog-plugin/blog/[...slug].astro'
                })

                try {
                    updateConfig({
                        integrations: [
                            tailwind(),
                        ],
                        vite: {
                            plugins: [
                                vitePluginAstroBlogPluginUserConfig(ThemeConfig, config),
                            ],
                        },
                    })
                } catch (e) {
                    logger.error(e.message)
                    throw e
                }

                logger.info('Astro Blog Plugin Loaded!')
            }
        }
    }
}

export { BlogSchema } from './src/schema/BlogSchema'