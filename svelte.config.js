import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Pin the function runtime rather than inferring it from whichever Node
		// the build machine happens to run. Keep in sync with engines.node.
		adapter: adapter({ runtime: 'nodejs24.x' })
	}
};

export default config;
