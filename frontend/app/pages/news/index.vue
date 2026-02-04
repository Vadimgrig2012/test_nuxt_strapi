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
				:key="item.slug"
				class="news-card"
			>
				<NuxtLink
					:to="`/news/${item.slug}`"
					class="news-card__link"
				>
					<h2 class="news-card__title">{{ item.title_h1 }}</h2>
					<p class="news-card__date">
						Опубликовано: {{ new Date(item.createdAt).toLocaleDateString() }}
					</p>
					<p class="news-card__excerpt">{{ item.excerpt }}</p>
				</NuxtLink>
			</li>
		</ul>
	</section>
</template>

<script setup>
import { fetchNewsList } from '@/services/news'

const { data, pending, error } = await useAsyncData('news:list', () =>
	fetchNewsList()
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
	border: 0.1rem solid #ccc;
	border-radius: 0.5rem;
	display: flex;
}

.news-card__title {
	font-size: 2.4rem;
	line-height: 1.2;
}

.news-card__link {
	padding: 2rem;
	text-decoration: none;
	color: inherit;
	display: block;
	height: 100%;
	flex: 1;
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
