// svelte.config.js

import nodeAdapter from '@sveltejs/adapter-node';
import autoAdapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
let config = {
    kit: {
        adapter: nodeAdapter()
    },
    server: {
        port: 5173,
        strictPort: true,
    },
    onwarn: (warning, handler) => {
        if (warning.code.includes("a11y")) return;
        handler(warning);
    },
};

if (process.env.NODE_ENV == 'development') {
    config = {
        preprocess: vitePreprocess(),
        kit: {
            adapter: autoAdapter()
        },
        server: {
            port: 5173,
            strictPort: true,
        },
        onwarn: (warning, handler) => {
            if (warning.code.includes("a11y")) return;
            handler(warning);
        },
    };
}

export default config;