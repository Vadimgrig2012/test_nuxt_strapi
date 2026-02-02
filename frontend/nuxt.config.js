import { fileURLToPath, URL } from 'url'

export default defineNuxtConfig({
	// Глобальные CSS/SCSS
	css: ['@/assets/scss/main.scss'],

	// Модули Nuxt (если нужны, можно потом добавить)
	modules: [],

	// ⬇️ ВАЖНО: алиасы задаём ТОЛЬКО здесь
	alias: {
		// Алиас для scss в корне проекта
		'@scss': fileURLToPath(new URL('./assets/scss', import.meta.url))
	},

	runtimeConfig: {
		public: {
			strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
			strapiGraphqlPath: process.env.NUXT_PUBLIC_STRAPI_GQL_PATH || '/graphql'
		}
	}
})
