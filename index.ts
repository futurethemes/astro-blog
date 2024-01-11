import type { AstroIntegration } from "astro"
import { type SafeParseSuccess } from 'astro/zod'

import { UserConfigSchema, type AstroBlogPluginUserConfig, type AstroBlogPluginConfig } from './src/schema/UserConfigSchema'
import { vitePluginAstroBlogPluginUserConfig } from './src/integrations/virtual-user-config'

export function AstroBlogPlugin(options: AstroBlogPluginUserConfig): AstroIntegration {
    return {
        name: '@futurethemes/astro-blog-plugin',
        hooks: {
            'astro:config:setup': async ({
                injectRoute,
                updateConfig,
                logger,
                config,
            }) => {
                const userConfig = UserConfigSchema.safeParse(options) as SafeParseSuccess<AstroBlogPluginConfig>
                
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
                    logger.error(e as string)
                    throw e
                }

                logger.info('Astro Blog Plugin Loaded!')
            }
        }
    }
}

export { BlogSchema } from './src/schema/BlogSchema'
export { AuthorSchema } from './src/schema/AuthorSchema'
export { TagSchema } from './src/schema/TagSchema'
export { AstroBlogPluginTailwindContentPaths } from './tailwind.plugin'
export { type LayoutProps } from './src/types/LayoutProps'