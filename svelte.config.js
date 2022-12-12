import { vitePreprocess } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),


	kit: {
		alias: {
			$store: resolve('src/store'),
			icons: resolve('node_modules/svelte-feather-icons/src/icons'),
			$icons: resolve('src/icons'),
			$smui:resolve('node_modules/@smui')
		},
		adapter: adapter()
	}
};

export default config;
