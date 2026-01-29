<template>
	<section class="section">
		<h1>Страница не найдена</h1>
		<p>Похоже, у нас нет такой страницы</p>

		<NuxtLink to="/">На главную</NuxtLink>
	</section>
</template>

<script setup>
const event = useRequestEvent()
if (event) {
	event.node.res.statusCode = 404
}

useSeoMeta({
	title: '404 - Страница не найдена',
	description: 'Запрошенная страница не существует'
})
</script>
