<template>
	<section class="section">
		<h1>Новости</h1>

		<div v-if="pending">Загрузка...</div>
		<div v-else-if="error">Ошибка загрузки</div>

		<ul
			v-else
			class="news-list"
		>
			<li
				v-for="item in list"
				:key="item.id"
				class="news-card"
			>
				<h2 class="news-card__title">
					<NuxtLink :to="`/news/${item.slug}`">
						{{ item.title }}
					</NuxtLink>
				</h2>

				<p class="news-card__excerpt">{{ item.excerpt }}</p>
				<p class="news-card__date">{{ item.publishedAt }}</p>
			</li>
		</ul>
	</section>
</template>

<script setup>
// import { getNewsList } from '~/services/news'

const { data, pending, error } = await useAsyncData('news:list', () =>
	getNewsList()
)

const list = computed(() => data.value || [])
useSeoMeta({
	title: 'Новости',
	description: 'Архив новостей'
})
</script>

<style scoped lang="scss">
.news-list {
	display: grid;
	gap: 2rem;
	margin-top: 2rem;
	width: 50%;
	margin-left: 2rem;
}

.news-card {
	padding: 2rem;
	border: 0.2rem solid #ccc;
	border-radius: 0.5rem;
}

.news-card__title {
	font-size: 2.4rem;
	line-height: 1.2;
}

.news-card__excerpt {
	margin-top: 0.8rem;
	font-size: 1.6rem;
}

.news-card__date {
	margin-top: 0.8rem;
	font-size: 1.4rem;
	opacity: 0.7;
}
</style>
