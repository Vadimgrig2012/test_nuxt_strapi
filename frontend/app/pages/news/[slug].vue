<template>
	<section
		class="section"
		v-if="news"
	>
		<h1>{{ news.title_h1 }}</h1>

		<p>{{ news.excerpt }}</p>

		<nav
			class="news-nav"
			aria-label="Навигация по новостям"
		>
			<NuxtLink
				v-if="prev"
				class="news-nav__link"
				:to="`/news/${prev.slug}`"
			>
				← Предыдущая: {{ prev.title_h1 }}
			</NuxtLink>

			<NuxtLink
				v-if="next"
				class="news-nav__link"
				:to="`/news/${next.slug}`"
			>
				Следующая: {{ next.title_h1 }} →
			</NuxtLink>
		</nav>

		<div class="content">
			{{ richtext }}
		</div>
	</section>

	<p v-else>Новостей пока нет...</p>
	<Button to="/news">← Назад к новостям</Button>
</template>

<script setup>
import { fetchNewsBySlug, fetchNewsNeighborsByPublished } from '@/services/news'
import { toRichtext } from '@/utils/richtext'

const route = useRoute()
const { $gqlRequest } = useNuxtApp()
const slug = computed(() => route.params.slug)

const { data, error } = await useAsyncData(
	() => `news:${slug.value}`,
	async () => {
		if (!slug.value) return null
		const news = await fetchNewsBySlug($gqlRequest, String(slug.value))
		const { prev, next } = await fetchNewsNeighborsByPublished(
			$gqlRequest,
			news.published
		)
		return { news, prev, next }
	}
)

const news = computed(() => data.value.news)
const prev = computed(() => data.value.prev)
const next = computed(() => data.value.next)

const richtext = computed(() => toRichtext(news.value?.content))

if (error.value) {
	throw error.value
}

if (!data.value?.news) {
	throw createError({ statusCode: 404, message: 'Новость не найдена' })
}

useSeoMeta({
	title: () => news.value?.seo?.metaTitle || news.value?.title_h1 || 'Новость',

	description: () =>
		news.value?.seo?.metaDescription ?? news.value?.excerpt ?? '',

	ogTitle: () =>
		news.value?.seo?.metaTitle || news.value?.title_h1 || 'Новость',

	ogDescription: () =>
		news.value?.seo?.metaDescription ?? news.value?.excerpt ?? ''
})
</script>

<style scoped lang="scss">
.meta {
	margin-top: 1rem;
	font-size: 1.4rem;
	opacity: 0.7;
}

.news-nav {
	margin-top: 3rem;
	display: flex;
	justify-content: space-between;
	width: 50%;
}

.content {
	width: 50%;
	margin-top: 2rem;
	font-size: 1.6rem;
	line-height: 1.6;
	white-space: pre-wrap;
	padding: 2rem;
	border: 0.1rem solid #ccc;
	border-radius: 0.5rem;
}
</style>
