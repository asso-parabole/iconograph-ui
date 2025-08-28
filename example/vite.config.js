import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    optimizeDeps: {
      exclude: ["rrule"], // Stop Vite from pre-bundling `rrule`
    },
    resolve: {
      alias: {
        "rrule": "rrule/dist/esm", // Use correct ESM version
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true, // Allow mixed ES & CJS modules
      },
    },
	plugins: [sveltekit()]
  });