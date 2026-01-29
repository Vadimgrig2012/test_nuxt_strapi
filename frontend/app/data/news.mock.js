export const newsMock = [
	{
		id: 1,
		title: 'Как работает Nuxt 4: структура проекта',
		slug: 'kak-rabotaet-nuxt-4-struktura-proekta',
		excerpt: 'Разбираем app/, pages/, layouts/ и как Nuxt собирает роутинг.',
		content:
			'<p>Nuxt 4 использует file-based routing. Папка <code>pages</code> превращается в маршруты...</p>',
		publishedAt: '2026-01-20',
		seo: {
			title: 'Как работает Nuxt 4',
			description:
				'Гайд по структуре Nuxt 4: pages, layouts, app.vue и routing.'
		}
	},
	{
		id: 2,
		title: 'useAsyncData: как правильно получать данные',
		slug: 'useasyncdata-kak-pravilno-poluchat-dannye',
		excerpt:
			'Зачем ключи, что такое server/client и как избежать лишних запросов.',
		content:
			'<p><code>useAsyncData</code> — основной способ получать данные в Nuxt (SSR-friendly)...</p>',
		publishedAt: '2026-01-23',
		seo: {
			title: 'useAsyncData в Nuxt',
			description:
				'Понимаем useAsyncData: ключи, SSR, кеширование и типовые паттерны.'
		}
	},
	{
		id: 3,
		title: 'SEO в Nuxt: useSeoMeta и шаблон заголовков',
		slug: 'seo-v-nuxt-useseometa-i-shablon-zagolovkov',
		excerpt: 'Как задать titleTemplate, description и OpenGraph по уму.',
		content:
			'<p>SEO в Nuxt удобно делать через <code>useSeoMeta</code> на уровне страниц...</p>',
		publishedAt: '2026-01-27',
		seo: {
			title: 'SEO в Nuxt',
			description: 'Настраиваем SEO в Nuxt: useSeoMeta, titleTemplate, og tags.'
		}
	}
]
