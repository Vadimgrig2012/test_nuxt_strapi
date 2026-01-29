import { newsMock } from '@/data/news.mock'

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getNewsList() {
	await sleep(150)
	return newsMock
		.slice()
		.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
		.map(({ id, title, slug, excerpt, publishedAt }) => ({
			id,
			title,
			slug,
			excerpt,
			publishedAt
		}))
}

export async function getNewsBySlug(slug) {
	await sleep(150)
	const item = newsMock.find(item => item.slug === slug)
	return item || null
}
