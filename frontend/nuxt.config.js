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
	},

	app: {
		head: {
			title: 'Тестовый сайт',
			titleTemplate: '%s - Тестовый сайт',
			meta: [
				{ name: 'description', content: 'Default description' }, // <-- БЕЗ key

				{ property: 'og:site_name', content: 'Site Name', key: 'og:site_name' },
				{ property: 'og:type', content: 'website', key: 'og:type' },
				{ property: 'og:locale', content: 'ru_RU', key: 'og:locale' }
			]
		}
	}
})
