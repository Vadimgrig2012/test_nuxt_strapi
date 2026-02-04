<template>
	<section class="section">
		<div v-if="pending">Загрузка...</div>
		<div v-else-if="error">Ошибка загрузки</div>

		<h1>{{ data?.title_h1 }}</h1>
		<p>Это страница контактов</p>

		<div class="content">{{ richtext }}</div>

		<div class="contact-info">
			<div class="email">{{ data?.email }}</div>
			<div class="phone">{{ data?.phone }}</div>
			<div class="address">{{ data?.address }}</div>
		</div>
	</section>
</template>

<script setup>
import { fetchContactPage } from '@/services/contact'
import { toRichtext } from '@/utils/richtext'

const { $gqlRequest } = useNuxtApp()

const { data, pending, error } = await useAsyncData('contact:page', () =>
	fetchContactPage($gqlRequest)
)

const richtext = computed(() => toRichtext(data.value?.content))

if (error.value) throw error.value
if (!data.value)
	throw createError({
		statusCode: 404,
		message: 'Страница контактов не найдена'
	})

useSeoMeta({
	title: () => data.value?.seo?.metaTitle || data.value?.title_h1 || 'Контакты',

	description: () =>
		data.value?.seo?.metaDescription ??
		plainText.value ??
		'Описание страницы контактов',

	ogTitle: () =>
		data.value?.seo?.metaTitle || data.value?.title_h1 || 'Контакты',

	ogDescription: () =>
		data.value?.seo?.metaDescription ?? data.value?.content ?? ''
})
</script>

<style scoped lang="scss">
.content {
	margin: 2rem 0;
	white-space: pre-wrap;
	display: flex;
	width: 50%;
}

.contact-info {
	display: flex;
	flex-direction: column;
	width: 50%;
	margin-top: 2rem;
	padding: 2rem;
	font-weight: bold;
	border: 0.1rem solid #ccc;
	border-radius: 0.5rem;

	.email,
	.phone,
	.address {
		margin-bottom: 0.5rem;
		margin-left: 1.5rem;
	}
}
</style>
