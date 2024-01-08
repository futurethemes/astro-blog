import type { AstroConfig, ViteUserConfig } from 'astro'
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type AstroBlogPluginConfig } from '../schema/UserConfigSchema'

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
	const resolveId = (id: string) =>
		JSON.stringify(id.startsWith('.') ? resolve(fileURLToPath(root), id) : id);

    const modules = {
        'virtual:astro-blog-plugin/user-config': `export default ${ JSON.stringify(opts) }`,
		'virtual:astro-blog-plugin/components': `export { default as Layout } from ${ resolveId(opts.layoutComponent) };`
    } satisfies Record<string, string>

    /** Mapping names prefixed with `\0` to their original form. */
	const resolutionMap = Object.fromEntries(
		(Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
			resolveVirtualModuleId(key),
			key,
		])
	)

    return {
		name: 'vite-plugin-astro-blog-plugin-user-config',
		resolveId(id): string | void {
			if (id in modules) return resolveVirtualModuleId(id)
		},
		load(id): string | void {
			const resolution = resolutionMap[id]
			if (resolution) return modules[resolution]
		},
	}
}