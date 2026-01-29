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
				<p class="footer__copy">© {{ year }}</p>
			</div>
		</footer>
	</div>
</template>

<script setup>
const year = useState('year', () => new Date().getFullYear())
</script>
