declare module 'virtual:astro-blog-plugin/user-config' {
	const Config: import('./src/schema/UserConfigSchema').AstroBlogPluginConfig;
	export default Config;
}

declare module 'virtual:astro-blog-plugin/components' {
	export const Layout: any;
}

declare module 'virtual:astro-blog-plugin/user-images' {
	type ImageMetadata = import('astro').ImageMetadata;

	export const logos: {
		dark?: ImageMetadata;
		light?: ImageMetadata;
	};
}