import { defineConfig } from 'tsup';

export default defineConfig({
	bundle: true,
	clean: true,
	dts: true,
	entryPoints: ['src/index.ts'],
	format: 'esm',
	outdir: 'dist',
	platform: 'node',
	sourcemap: true,
	treeshake: true
});
