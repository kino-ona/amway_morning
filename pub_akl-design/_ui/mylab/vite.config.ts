import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import ViteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    VueSetupExtend(),
    Pages({
      routeBlockLang: 'yaml',
      exclude: ['**/components/*.{vue,ts}'],
      dirs: mode === 'publishing' ? `${resolve(process.cwd(), './src/pages-publishing')}` : undefined,
      extendRoute(route) {
        if ((route.path as string).startsWith('/members/:seq')) {
          route.path = route.path.replace(':seq', ':seq(\\d+)')
        }
        return route
      },
    }),
    Layouts(),
    Components({
      resolvers: [
        // auto import icons
        // https://github.com/antfu/unplugin-icons
        IconsResolver({
          prefix: false,
        }),
      ],
      dts: 'types/components.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
    ViteCompression(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/assets/scss/config/_variables.scss";`,
      },
    },
  },
  server: {
    proxy: {
      '^/v1/api': {
        target: 'https://mylab.dev.amway.co.kr',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '~/': `${resolve(process.cwd(), './src')}/`,
      '#/': `${resolve(process.cwd(), './types')}/`,
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      //detail to look https://terser.org/docs/api-reference#compress-options
      compress: {
        drop_console: false,
        pure_funcs: ['console.log', 'console.info'],
        drop_debugger: true,
      },
    },
  },
}))
