import vue from '@vitejs/plugin-vue2';
import path from 'path';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vitePluginRequire from 'vite-plugin-require';

export default defineConfig(({ mode, command }) => {
  return {
    base: '/',
    plugins: [
      vue(),
      commonjs(),
      nodePolyfills(),
      vitePluginRequire(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[name]',
      }),
      //修复vite Cannot access 'router' before initialization
      {
        name: 'singleHMR',
        handleHotUpdate({ modules }) {
          modules.map((m) => {
            m.importedModules = new Set();
            m.importers = new Set();
          });
          return modules;
        },
      },
    ],
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    define: {
      'process.env': {},
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, 'src/styles/variables.module.scss')}";`,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    server: {
      port: 9527,
      host: true,
      open: false,
      //   proxy: {
      //     '/api': {
      //       target: 'http://xxx:30808',
      //     },
      //   },
    },
  };
});
