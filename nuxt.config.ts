// https://nuxt.com/docs/api/configuration/nuxt-config
import { _slow } from "#tailwind-config/theme/animation"

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *;'
        }
      }
    }
  },
  tailwindcss: {
    config: {
        theme: {
          extend: {
            animation: {
               slow: 'spin 12s linear infinite'
            }
          }
        }
    }
  },
  nitro: {
    preset: 'node-server'
  },
  build: {
    transpile: ['@oracledb']
  },
  runtimeConfig: {
    public: {
      // Public runtime config, accessible on both server and client
      GEOCODE_API_KEY: process.env.GEOCODE_API_KEY,
    },
    // Private runtime config, only accessible on the server
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  }
});
