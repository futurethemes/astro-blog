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

export let Config: AstroBlogPluginConfig = {
    layoutComponent: null,
    ogImage: null,
}

export function updateConfig(newConfig: Partial<AstroBlogPluginConfig>) {
    if (newConfig === undefined || newConfig === null) {
        return;
    }

    for (let key of Object.keys(Config)) {
        if (newConfig[key]) {
            Config[key] = newConfig[key]
        }
    }
}

export function getConfig() {
    return Config
}