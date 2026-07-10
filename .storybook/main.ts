import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
	// Only committed service stories. This repo uses Storybook purely to render
	// the real output of pure functions (see app/_services/buttonsData.stories.tsx),
	// not to story Next pages.
	stories: ['../app/**/*.stories.@(ts|tsx)'],
	addons: ['@storybook/addon-essentials'],
	framework: {
		name: '@storybook/react-vite',
		options: {}
	},
	core: {
		disableTelemetry: true
	},
	async viteFinal(viteConfig) {
		// Mirror the `@/*` -> repo-root alias used by tsconfig.json and
		// vitest.config.ts so stories can import `@/app/...`.
		viteConfig.resolve = viteConfig.resolve || {};
		viteConfig.resolve.alias = {
			...(viteConfig.resolve.alias || {}),
			'@': path.resolve(process.cwd(), '.')
		};
		// tsconfig.json sets `jsx: "preserve"` for Next; esbuild would otherwise
		// fall back to the classic runtime (bare `React.createElement`) and break
		// at render. Force the automatic runtime so stories need no React import,
		// matching the app's own components.
		viteConfig.esbuild = {
			...(viteConfig.esbuild || {}),
			jsx: 'automatic'
		};
		return viteConfig;
	}
};

export default config;
