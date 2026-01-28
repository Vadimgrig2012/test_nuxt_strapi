<template>
	<div class="app">
		<header class="header">
			<div class="container header__inner">
				<NuxtLink
					class="header__logo"
					to="/"
				>
					Logo
				</NuxtLink>

				<nav class="header__nav">
					<NuxtLink
						v-for="item in mainNav"
						:key="item.to"
						class="header__link"
						active-class="is-active"
						:to="item.to"
					>
						{{ item.label }}
					</NuxtLink>
				</nav>
			</div>
		</header>

		<main class="main">
			<div class="wrapper">
				<slot />
			</div>
		</main>

		<footer class="footer">
			<div class="container footer__inner">
				<p class="footer__copy">© {{ year }}</p>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { mainNav } from '@/config/navigation.js'
const year = useState('year', () => new Date().getFullYear())
</script>

<style scoped lang="scss">
.header__link.is-active {
	text-decoration: underline;
}
</style>
