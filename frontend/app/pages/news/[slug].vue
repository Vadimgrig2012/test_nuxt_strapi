<template>
	<section class="section">
		<h1>Новость: {{ slug }}</h1>
	</section>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

useSeoMeta({
	title: `Новость: ${slug || ''}`,
	description: `Новость ${slug || ''} — страница материала.`
})
</script>
