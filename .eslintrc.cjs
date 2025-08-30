module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ 
		files: ['*.svelte'], 
		processor: 'svelte/svelte',
		plugins: ['svelte']
	}],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022
	},
	env: {
		browser: true,
		es2022: true,
		node: true
	}
};
