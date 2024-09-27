import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
	{
		ignores: [
			'.DS_Store',
			'node_modules',
			'/dist',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock'
		]
	},
	{
		rules: {
			'no-console': process.env.NODE_ENV === 'production' || process.env.CI ? 'error' : 'off',
			'no-trailing-spaces': 'error',
			eqeqeq: 'off',
			'no-unused-vars': 'error',
			'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
			'react/react-in-jsx-scope': 'off'
		}
	},

	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2017,
				...globals.node,
				...globals.jest
			},
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module'
			}
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended
];
