<template>
	<NuxtLoadingIndicator />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
const appConfig = useAppConfig()

// Базовые теги для всего сайта
useHead({
	htmlAttrs: {
		lang: appConfig.site.lang
	},
	link: [
		{
			rel: 'icon',
			type: 'image/png',
			href: '/favicon.png'
		}
	]
	// titleTemplate: titleChunk => {
	// 	return titleChunk ? `${titleChunk} - Тестовый сайт` : 'Тестовый сайт'
	// }
})
</script>
