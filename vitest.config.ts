import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],

	test: {
		// Jest like globals
		includeSource: ['src/**/*.{js,ts}'],
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.ts'],
		// Extend jest-dom matchers
		setupFiles: ['./setupTest.ts']
	}
});
