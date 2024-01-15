import type { AstroConfig, ViteUserConfig } from 'astro'
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type AstroBlogConfig } from '../schema/UserConfigSchema'

function resolveVirtualModuleId<T extends string>(id: T): `\0${T}` {
	return `\0${id}`
}

export function vitePluginAstroBlogUserConfig(
	opts: AstroBlogConfig,
	{
		root,
	}: Pick<AstroConfig, 'root' | 'srcDir' | 'trailingSlash'> & {
		build: Pick<AstroConfig['build'], 'format'>
	}
): NonNullable<ViteUserConfig['plugins']>[number] {
	const resolveId = (id: string) =>
		JSON.stringify(id.startsWith('.') ? resolve(fileURLToPath(root), id) : id);

	const createUserImagesModule = (opts: AstroBlogConfig) => {
		let imagesModule = ''
	
		if (opts.logo) {
			if (
				!('src' in opts.logo) &&
				!('dark' in opts.logo) &&
				!('light' in opts.logo)
			) {
				throw new Error(' `logo` config is incorrect. You must specify at least one of `src`, `dark` or `light`.')
			}

			if ('src' in opts.logo) {
				const src = resolveId(opts.logo.src)
				imagesModule = `import src from ${src}; export const logos = { dark: src, light: src };`
			} else {
				const dark = resolveId(opts.logo.dark)
				const light = resolveId(opts.logo.light)

				imagesModule = `import dark from ${dark}; import light from ${light}; export const logos = { dark, light };`
			}
		} else {
			imagesModule = 'export const logos = {}'
		}
	
		return imagesModule
	}

    const modules = {
        'virtual:astro-blog/user-config': `export default ${ JSON.stringify(opts) }`,
		'virtual:astro-blog/components': `export { default as Layout } from ${ resolveId(opts.layoutComponent) };`,
		'virtual:astro-blog/user-images': createUserImagesModule(opts),
    } satisfies Record<string, string>

    /** Mapping names prefixed with `\0` to their original form. */
	const resolutionMap = Object.fromEntries(
		(Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
			resolveVirtualModuleId(key),
			key,
		])
	)

    return {
		name: 'vite-plugin-astro-blog-user-config',
		resolveId(id): string | void {
			if (id in modules) return resolveVirtualModuleId(id)
		},
		load(id): string | void {
			const resolution = resolutionMap[id]
			if (resolution) return modules[resolution]
		},
	}
}