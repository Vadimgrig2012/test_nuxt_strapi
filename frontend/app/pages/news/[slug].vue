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

const { data: news } = await useAsyncData(
	() => `news:${slug}`,
	() => fetchNewsBySlug(slug.value),
	{ watch: [slug] }
)

watchEffect(() => {
	if (news.value === undefined) return

	if (!news.value) {
		showError({
			statusCode: 404,
			message: 'Новость не найдена'
		})
	}
})

watchEffect(() => {
	if (!news.value) return
	const title = news.value?.seo?.metaTitle || news.value?.title_h1 || 'Новость'
	const description =
		news.value?.seo?.metaDescription ?? news.value?.excerpt ?? ''
	useHead({
		title,
		meta: [
			{
				name: 'description',
				content: description
			},
			{ property: 'og:title', content: title },
			{ property: 'og:description', content: description }
		]
	})
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
