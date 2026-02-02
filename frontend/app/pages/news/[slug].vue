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
const slug = route.params.slug

const { data: news, error } = await useAsyncData(`news:${slug}`, () =>
	fetchNewsBySlug(slug)
)

if (error.value) {
	throw error.value
}

useSeoMeta(() => {
	const metaTitle = news.value?.seo?.metaTitle || news.value?.title_h1
	const metaDescription =
		news.value?.seo?.metaDescription || news.value?.excerpt

	return {
		title: metaTitle,
		description: metaDescription
	}
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
