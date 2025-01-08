// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false},
  app: {
    head: {
      charset: 'utf-8',
      // viewport: 'width=device-width, initial-scale=1',
      title: 'Bottle-Seperator',
      link: [{ rel: 'icon', type: 'image/png', href: '/icons/icon.png' },
         { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap' }
      ]
    },
    // buildAssetsDir: '/asset/'
  },
  css: ['~/asset/main.css','@fortawesome/fontawesome-free/css/all.min.css','sweetalert2/dist/sweetalert2.min.css'],
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL ||'http://s671int511v003.sit.kmutt.ac.th:3333/api/v1/',
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxt/ui', '@pinia/nuxt']
})