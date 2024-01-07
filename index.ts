import type { AstroIntegration } from "astro"
import { join, resolve, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { type AstroBlogPluginConfig, Config, updateConfig as updateAstroBlogPluginConfig, getConfig } from "./src/Config/config"
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

                updateAstroBlogPluginConfig(options)
                
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
                                vitePluginAstroBlogPluginUserConfig(getConfig(), config),
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