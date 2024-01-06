import type { AstroIntegration } from "astro"

import { type AstroBlogPluginConfig, ThemeConfig, updateThemeConfig } from "./src/Config/config"
import { vitePluginGalaxyUserConfig } from './src/integrations/virtual-user-config'

export default function AstroBlogPluginIntegration(options: AstroBlogPluginConfig): AstroIntegration {
    return {
        name: '@futurethemes/galaxy-theme',
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

                // Check if the footer has more than 2 entries and give a warning
                if (options.footerNav && Object.keys(options.footerNav).length > 2) {
                    logger.warn('[config.footerNav] contains more than 2 sections. I\'m not going to stop you... But things could get weird. It\'s best to stick with 2 if you can. But you can have an unlimited amount of links per section!')
                }
                
                injectRoute({
                    pattern: '404',
                    entrypoint: '@futurethemes/galaxy-theme/404.astro'
                })

                injectRoute({
                    pattern: '',
                    entrypoint: '@futurethemes/galaxy-theme/index.astro'
                })

                injectRoute({
                    pattern: '/pricing',
                    entrypoint: '@futurethemes/galaxy-theme/pricing.astro'
                })

                injectRoute({
                    pattern: '/about',
                    entrypoint: '@futurethemes/galaxy-theme/about.astro'
                })

                if (options.blog) {
                    injectRoute({
                        pattern: '/blog',
                        entrypoint: '@futurethemes/galaxy-theme/blog.astro'
                    })
    
                    injectRoute({
                        pattern: '/blog/[page]',
                        entrypoint: '@futurethemes/galaxy-theme/blog/[page].astro'
                    })
    
                    injectRoute({
                        pattern: '/blog/[...slug]',
                        entrypoint: '@futurethemes/galaxy-theme/blog/[...slug].astro'
                    })
                }

                injectRoute({
                    pattern: '[...slug]',
                    entrypoint: '@futurethemes/galaxy-theme/page.astro'
                })

                addWatchFile(new URL('./tailwind.config.js', config.root));

                try {
                    updateConfig({
                        vite: {
                            plugins: [
                                vitePluginGalaxyUserConfig(ThemeConfig, config),
                            ],
                        },
                    })
                } catch (e) {
                    logger.error(e.message)
                    throw e
                }

                logger.info('Galaxy Theme Loaded!')
            }
        }
    }
}