declare module 'virtual:astro-blog/user-config' {
	const Config: import('./src/schema/UserConfigSchema').AstroBlogConfig;
	export default Config;
}

declare module 'virtual:astro-blog/components' {
	export const Layout: any;
}

declare module 'virtual:astro-blog/user-images' {
	type ImageMetadata = import('astro').ImageMetadata;

	export const logos: {
		dark?: ImageMetadata;
		light?: ImageMetadata;
		alt?: string;
	};
}