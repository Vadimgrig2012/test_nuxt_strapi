<template>
	<div class="app">
		<AppHeader />
		<main class="main">
			<div class="wrapper">
				<slot />
			</div>
		</main>

		<footer class="footer">
			<div class="container footer__inner">
				<NuxtLink
					class="footer__logo"
					to="/"
				>
					Logo
				</NuxtLink>
				<p class="footer__copy">© {{ year }}</p>
			</div>
		</footer>
	</div>
</template>

<script setup>
const year = useState('year', () => new Date().getFullYear())
</script>

<style scoped lang="scss">
.wrapper {
	margin-left: 5rem;
	min-height: calc(
		100vh - 160px - 80px
	); // Adjust based on header and footer height
}

.footer {
	background: #ccc;
	color: #979797;
	padding: 2rem 0;
	text-align: center;
}

.footer__logo {
	font-weight: bold;
	color: rgb(120, 120, 161);
	font-size: 3rem;
	transition: color 0.3s ease;
	&:hover {
		color: rgb(86, 86, 182);
	}
}
</style>
