declare module 'virtual:astro-blog-plugin/user-config' {
	export const config: import('./src/schema/UserConfigSchema').AstroBlogPluginConfig;
}

declare module 'virtual:astro-blog-plugin/components' {
	export const Layout: any;
}