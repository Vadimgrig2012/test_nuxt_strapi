<template>
	<section
		class="section"
		v-if="news"
	>
		<h1>{{ news.title_h1 }}</h1>

		<p v-if="news.excerpt">{{ news.excerpt }}</p>

		<div class="content">
			{{ plainText }}
		</div>
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

if (error.value || !news.value) {
	throw createError({
		statusCode: 404,
		message: 'Новость не найдена'
	})
}

const plainText = computed(() => {
	if (!news.value?.content) return ''
	return news.value.content
		.map(block =>
			(block.children || []).map(child => child.text || '').join('')
		)
		.join('\n')
})

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
	width: 50%;
	margin-top: 2rem;
	margin-left: 2rem;
	font-size: 1.6rem;
	line-height: 1.6;
	white-space: pre-wrap;
	padding: 2rem;
	border: 0.2rem solid #ccc;
	border-radius: 0.5rem;
}
</style>
