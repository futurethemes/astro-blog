import type { AstroConfig, ViteUserConfig } from 'astro'

import { type AstroBlogPluginConfig } from '../Config/config'

function resolveVirtualModuleId<T extends string>(id: T): `\0${T}` {
	return `\0${id}`
}

export function vitePluginAstroBlogPluginUserConfig(
	opts: AstroBlogPluginConfig,
	{
		build,
		root,
		srcDir,
		trailingSlash,
	}: Pick<AstroConfig, 'root' | 'srcDir' | 'trailingSlash'> & {
		build: Pick<AstroConfig['build'], 'format'>
	}
): NonNullable<ViteUserConfig['plugins']>[number] {
    const modules = {
        'virtual:astro-blog-plugin/user-config': `export default ${ JSON.stringify(opts) }`,
    } satisfies Record<string, string>

    /** Mapping names prefixed with `\0` to their original form. */
	const resolutionMap = Object.fromEntries(
		(Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
			resolveVirtualModuleId(key),
			key,
		])
	)

    return {
		name: 'vite-plugin-galaxy-user-config',
		resolveId(id): string | void {
			if (id in modules) return resolveVirtualModuleId(id)
		},
		load(id): string | void {
			const resolution = resolutionMap[id]
			if (resolution) return modules[resolution]
		},
	}
}