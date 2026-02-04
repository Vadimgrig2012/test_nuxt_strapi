<template>
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
</template>

<script setup>
import { mainNav } from '@/config/navigation.js'
</script>

<style scoped lang="scss">
.header__link.is-active {
	text-decoration: underline;
	color: rgb(119, 80, 156);
}

.header {
	padding: 1.5rem 5rem;
	margin-bottom: 5rem;
	border-bottom: 0.1rem solid #ccc;

	&__inner {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 4rem;
	}

	&__logo {
		font-size: 3rem;
		font-weight: 700;
		color: rgb(86, 86, 182);
		text-decoration: none;
	}

	&__nav {
		display: flex;
		gap: 2rem;
	}
	&__link {
		font-weight: 600;
		transition: color 0.3s ease;

		&:hover {
			color: red;
		}
	}
}
</style>
