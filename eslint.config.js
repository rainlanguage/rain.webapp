import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';

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
			'yarn.lock',
			'.next'
		]
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
	reactPlugin.configs.flat.recommended,
	reactPlugin.configs.flat['jsx-runtime'],
	{
		rules: {
			'no-console':
				process.env.NODE_ENV === 'production' || process.env.CI
					? ['error', { allow: ['warn', 'error'] }]
					: 'off',
			'no-trailing-spaces': 'error',
			eqeqeq: 'off',
			'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
			'react/react-in-jsx-scope': 'off',
			'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
			'react/prop-types': 'off',
			'react/no-unknown-property': ['error', { ignore: ['tw'] }],
			// Disabled for PRs to be merged
			'react/jsx-key': 'off',
			// '@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off'
			// '@typescript-eslint/no-empty-object-type': 'off',
			// 'no-case-declarations': 'off',
			// 'react/no-unescaped-entities': 'off',
			// 'no-unsafe-optional-chaining': 'off',
		}
	}
];
