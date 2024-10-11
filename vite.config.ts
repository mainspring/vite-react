import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
      'process.env.PUBLIC_URL': `""`,
    },

    plugins: [
      // docs say we can use exclude, but not part of options so there's something I'm missing
      tsconfigPaths({ ignoreConfigErrors: true }),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],

    css: {
      postcss: {
        // postcss-import loaded by default
        // postcss-url ??
        plugins: [autoprefixer({})],
      },
    },

    envDir: './src',

    build: {
      rollupOptions: {
        external: [],
      },
    },

    optimizeDeps: {
      exclude: ['js-big-decimal'],
    },
  };
});
