import type { AstroIntegration } from "astro"
import tailwind from '@astrojs/tailwind'
import { resolve } from 'node:path'

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

                // injectRoute({
                //     pattern: '/blog/[page]',
                //     entrypoint: '@futurethemes/astro-blog-plugin/blog/[page].astro'
                // })

                // injectRoute({
                //     pattern: '/blog/[...slug]',
                //     entrypoint: '@futurethemes/astro-blog-plugin/blog/[...slug].astro'
                // })

                // injectScript("page-ssr", `import '@astrojs/tailwind/base.css';`);

                const isTailwindAlreadyInstalled = config.integrations.find(integration => integration.name == '@astrojs/tailwind') !== undefined

                if (isTailwindAlreadyInstalled) {
                    logger.warn('Tailwind is already installed in this project! Make sure to add the Astro Blog Plugin paths to your Tailwind config or the blog pages won\'t style correctly!')
                }

                const integrations = []

                if (!isTailwindAlreadyInstalled) {
                    integrations.push(
                        tailwind({
                            configFile: resolve(process.cwd(), 'node_modules/@futurethemes/astro-blog-plugin/tailwind.config.mjs'),
                            applyBaseStyles: false,
                            nesting: false,
                        }),
                    )
                }

                try {
                    updateConfig({
                        integrations,
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