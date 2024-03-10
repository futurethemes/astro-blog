import { AstroBlogTailwindPaths } from 'astro-blog/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
        './src/**/*.{astro,html,jsx}',
        ...AstroBlogTailwindPaths,
    ],
	theme: {
		extend: {},
	},
	plugins: [],
	darkMode: 'class',
}
