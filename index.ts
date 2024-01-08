import type { AstroIntegration } from "astro"

import { UserConfigSchema, type AstroBlogPluginConfig } from './src/schema/UserConfigSchema'
import { vitePluginAstroBlogPluginUserConfig } from './src/integrations/virtual-user-config'

export function AstroBlogPlugin(options: AstroBlogPluginConfig): AstroIntegration {
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
                const userConfig = UserConfigSchema.safeParse(options)

                console.log(userConfig, options)
                
                injectRoute({
                    pattern: '/blog',
                    entrypoint: '@futurethemes/astro-blog-plugin/blog.astro'
                })

                // injectRoute({
                //     pattern: '/blog/[page]',
                //     entrypoint: '@futurethemes/astro-blog-plugin/blog/[page].astro'
                // })

                // injectRoute({
                //     pattern: '/blog/[...slug]',
                //     entrypoint: '@futurethemes/astro-blog-plugin/blog/[...slug].astro'
                // })

                // injectScript("page-ssr", `import '@astrojs/tailwind/base.css';`);

                try {
                    updateConfig({
                        vite: {
                            plugins: [
                                vitePluginAstroBlogPluginUserConfig(userConfig.data, config),
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
export { AstroBlogPluginTailwindContentPaths } from './tailwind.plugin'