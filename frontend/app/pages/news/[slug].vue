<template>
	<section
		class="section"
		v-if="item"
	>
		<h1>{{ item.title }}</h1>

		<p class="meta">
			<span>{{ item.publishedAt }}</span>
		</p>

		<div
			class="content"
			v-html="item.content"
		/>
	</section>

	<section
		class="section"
		v-else
	>
		<h1>Новость не найдена</h1>

		<NuxtLink to="/news">Вернуться к новостям</NuxtLink>
	</section>

	<Button to="/news">← Назад к новостям</Button>
</template>

<script setup>
import { getNewsBySlug } from '@/composables/news'

const route = useRoute()
const slug = String(route.params.slug || '')

// Загружаем новость
const { data } = await useAsyncData(
	() => `news/${slug}`,
	() => getNewsBySlug(slug)
)

// Если новость не нашлась тогда вызываем ошибку 404
if (!data.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Not Found',
		message: 'Новость не найдена'
	})
}

// Данные динамические и вычисляемые
const item = computed(() => data.value)

// SEO заголовки динамические
useSeoMeta({
	title: () => item.value?.seo?.title || item.value?.title || 'Новость',
	description: () => item.value?.seo?.description || item.value?.excerpt || ''
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
