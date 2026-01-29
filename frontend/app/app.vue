<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
const appConfig = useAppConfig()
const route = useRoute()

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
})

// Базовые SEO-дефолты (могут быть переопределены на страницах)
useSeoMeta({
	titleTemplate: titleChunk => {
		const siteName = appConfig.site.name

		return titleChunk ? `${titleChunk} - ${siteName}` : siteName
	},
	description: appConfig.site.description,

	ogSiteName: appConfig.site.name,
	ogType: 'website',
	ogUrl: () => `${appConfig.site.url}${route.fullPath}`,
	ogLocale: 'ru_RU'
})
</script>
