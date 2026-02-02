<template>
	<section
		class="section"
		v-if="news"
	>
		<h1>{{ news.title_h1 }}</h1>

		<p v-if="news.excerpt">{{ news.excerpt }}</p>

		<pre>{{ JSON.stringify(news.content, null, 2) }}</pre>
	</section>
	<Button to="/news">← Назад к новостям</Button>
</template>

<script setup>
import { fetchNewsBySlug } from '@/services/news'
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const { data: news, error } = await useAsyncData(
	() => `news:${slug.value}`,
	() => fetchNewsBySlug(slug.value),
	{ watch: [slug] }
)

if (error.value) {
	showError({
		statusCode: 404,
		message: 'Новость не найдена'
	})
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

.content {
	margin-top: 2rem;
	font-size: 1.6rem;
	line-height: 1.6;
}
</style>
