import { defineNuxtConfig, type NuxtConfig } from 'nuxt/config';
import { join } from 'path';
import { workspaceRoot } from '@nx/devkit';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

const vite: NuxtConfig['vite'] = {
  vue: {
    template: {
      transformAssetUrls,
    },
  },
  server: {
    proxy: {
      '/api': {
        target:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:8081'
            : 'http://localhost:8081',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
};

const modules: NuxtConfig['modules'] = [
  (_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(vuetify({ autoImport: true }));
    });
  },
  [
    '@pinia/nuxt',
    {
      autoImports: [
        // 自动引入 `defineStore()`
        'defineStore',
        // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
        ['defineStore', 'definePiniaStore'],
      ],
    },
  ],
];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/directory-structure/tsconfig
  app: {
    head: {
      title: 'Let Flow',
      meta: [{ name: 'description', content: 'Let Flow ' }],
    },
  },
  vite,
  build: {
    transpile: ['vuetify'],
  },
  modules,
  alias: getMonorepoTsConfigPaths('../../tsconfig.base.json'),
  devtools: { enabled: true },
});

function getMonorepoTsConfigPaths(tsConfigPath: string) {
  const tsPaths = require(tsConfigPath)?.compilerOptions?.paths as Record<
    string,
    string[]
  >;

  const alias: Record<string, string> = {};
  if (tsPaths) {
    for (const p in tsPaths) {
      alias[p.replace(/\/\*$/, '')] = join(
        workspaceRoot,
        tsPaths[p][0].replace(/\/\*$/, ''),
      );
    }
  } else {
    console.warn(
      'Root level tsconfig ',
      tsConfigPath,
      ' does not contain any paths',
    );
  }

  return alias;
}
