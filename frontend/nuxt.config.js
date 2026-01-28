import { fileURLToPath, URL } from 'url'

export default defineNuxtConfig({
	// Глобальные CSS/SCSS
	css: ['@/assets/scss/main.scss'],

	// Модули Nuxt (если нужны, можно потом добавить)
	modules: [],

	// Настройка Vite для алиасов
	vite: {
		resolve: {
			alias: {
				// Теперь '@scss' ссылается на папку assets/scss
				'@scss': fileURLToPath(new URL('./assets/scss', import.meta.url))
			}
		}
	}
})
