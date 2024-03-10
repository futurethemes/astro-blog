import { defineIntegration, createResolver } from 'astro-integration-kit'
import { corePlugins, addVirtualImportsPlugin, addDtsPlugin } from 'astro-integration-kit/plugins'

import { UserConfigSchema } from './schema/UserConfigSchema'

export default defineIntegration({
	name: 'astro-blog',
	optionsSchema: UserConfigSchema,
	plugins: [
		...corePlugins,
		addVirtualImportsPlugin,
		addDtsPlugin,
	],
	setup: ({
		name,
		options,
	}) => {
		return {
			"astro:config:setup": ({
				injectRoute,
				addVirtualImports,
				addDts,
				config,
			}) => {
				const { resolve } = createResolver(import.meta.url)
				const { resolve: rootResolve } = createResolver(config.root.pathname)

				injectRoute({
                    pattern: '/blog',
                    entrypoint: resolve('./pages/blog.astro'),
                })

                injectRoute({
                    pattern: '/blog/[page]',
                    entrypoint: resolve('./pages/[page].astro'),
                })

                injectRoute({
                    pattern: '/blog/[...slug]',
                    entrypoint: resolve('./pages/[...slug].astro'),
                })

				let logoModule = 'export const logos = { light: null, dark: null };'

				if (options.logo) {
					if ('src' in options.logo) {
						logoModule = `import src from "${ rootResolve(options.logo.src) }"; export const logos = { light: src, dark: src };`
					} else if ('light' in options.logo) {
						logoModule = `import light from "${ rootResolve(options.logo.light) }"; import dark from "${ rootResolve(options.logo.dark) }"; export const logos = { light, dark };`
					}
				}

				let layoutComponentPath

				if (options.layoutComponent) {
					layoutComponentPath = rootResolve(options.layoutComponent)
				} else {
					layoutComponentPath = resolve('./components/Layouts/Layout.astro')
				}

				addVirtualImports({
					'virtual:astro-blog/user-config': `export default ${ JSON.stringify(options) }`,
					'virtual:astro-blog/components': `export { default as Layout } from "${ layoutComponentPath }";`,
					'virtual:astro-blog/user-images': logoModule,
				})

				const astroBlogDts = `
					declare module 'virtual:astro-blog/user-config' {
						const userConfig: import("${ resolve('./schema/UserConfigSchema') }").AstroBlogUserConfig;

						export default config as userConfig;
					}

					declare module 'virtual:astro-blog/user-images' {
						const logosConfig: import("${ resolve('./schema/LogosSchema') }").LogosConfig;

						export const logos: logosConfig;
					}

					declare module 'virtual:astro-blog/components' {
						export const Layout: typeof import("${ layoutComponentPath }").default
					}
				`

				addDts({
					name: 'astro-blog.d.ts',
					content: astroBlogDts,
				})
			},
		}
	},
})

export { type AstroBlogLayoutProps } from './types/LayoutProps'
