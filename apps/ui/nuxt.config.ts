import { workspaceRoot } from '@nx/devkit';
import { defineNuxtConfig, type NuxtConfig } from 'nuxt/config';
import { join } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

/**
 * read the compilerOptions.paths option from a tsconfig and return as aliases for Nuxt
 **/
function getMonorepoTsConfigPaths(tsConfigPath: string) {
  const tsPaths = require(tsConfigPath)?.compilerOptions?.paths as Record<
    string,
    string[]
  >;

  const alias: Record<string, string> = {};
  if (tsPaths) {
    for (const p in tsPaths) {
      // '@org/something/*': ['libs/something/src/*'] => '@org/something': '{pathToWorkspaceRoot}/libs/something/src'
      alias[p.replace(/\/\*$/, '')] = join(
        workspaceRoot,
        tsPaths[p][0].replace(/\/\*$/, '')
      );
    }
  }

  return alias;
}

const VITE_CONFIG: NuxtConfig['vite'] = {
  optimizeDeps: {
    include:
      process.env.NODE_ENV === 'development'
        ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
        : [],
  },
  server: {
    strictPort: true,
    proxy: {
      '/api': {
        target:
          process.env.API_SERVER ??
          `http://localhost:${process.env.API_PORT ?? 8080}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};

const MODULES_CONFIG: NuxtConfig['modules'] = [
  (_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(
        AutoImport({
          imports: ['vue', 'vue-router', '@vueuse/core'],
        }),
        Components({
          resolvers: [NaiveUiResolver()],
        })
      );
    });
  },
  [
    '@nuxtjs/i18n',
    {
      i18n: {
        vueI18n: './i18n.config.ts',
      },
    },
  ],
  '@nuxtjs/eslint-module',
  '@unocss/nuxt',
  [
    '@pinia/nuxt',
    {
      autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
    },
  ],
];

export default defineNuxtConfig({
  /**
   * aliases set here will be added to the auto generate tsconfig by Nuxt
   * https://nuxt.com/docs/guide/directory-structure/tsconfig
   **/
  alias: getMonorepoTsConfigPaths('../../tsconfig.base.json'),
  vite: VITE_CONFIG,
  modules: MODULES_CONFIG,
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
          ]
        : ['@juggle/resize-observer'],
  },
});
