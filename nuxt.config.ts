// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages:true,
  modules: [
     '@nuxtjs/supabase',
     "@nuxtjs/tailwindcss", 
     "@nuxt/icon", 
     '@pinia/nuxt',
     '@prisma/nuxt',
     'nuxt-lodash'
  ],

  
  runtimeConfig: {
    public: {
      STRIPE_PK_KEY: process.env.STRIPE_PK_KEY,
    },
    private: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    }
  },
  
  app: {
  head: {
  script: [{ src: "https://js.stripe.com/v3/", defer: true }],
  },
  
  },

  
  supabase:{ redirect : false}
})