declare module 'virtual:astro-blog/user-config' {
	const userConfig: import ('../schema/UserConfigSchema').AstroBlogUserConfig;

	export default config as userConfig;
}

declare module 'virtual:astro-blog/user-images' {
	const logosConfig: import ('../schema/LogosSchema').LogosConfig;

	export default logos as logosConfig;
}
