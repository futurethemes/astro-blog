export type AstroBlogPluginConfig = {
    /**
     * Your standard layout component.
     * 
     * eg:
     * 
     * ```ts
     * import Layout from './src/Layout.astro'
     * 
     * ...
     * 
     * {
     *   layoutComponent: Layout
     * }
     * ```
     */
    layoutComponent: any,
    
    /**
     * A custom OpenGraph image to include on every page.
     * 
     * eg:
     * ogImage: '/og.png'
     */
    ogImage?: string | null,
}

export let ThemeConfig: AstroBlogPluginConfig = {
    layoutComponent: null,
    ogImage: null,
}

export function updateThemeConfig(newThemeConfig: Partial<AstroBlogPluginConfig>) {
    if (newThemeConfig === undefined || newThemeConfig === null) {
        return;
    }

    for (let key of Object.keys(ThemeConfig)) {
        if (newThemeConfig[key]) {
            ThemeConfig[key] = newThemeConfig[key]
        }
    }
}