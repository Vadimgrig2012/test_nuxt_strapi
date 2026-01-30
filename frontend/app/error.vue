<template>
	<main class="error">
		<h1 class="error__title">Ошибка {{ statusCode }}</h1>
		<p class="error__desc">
			{{ message }}
		</p>

		<div class="error__actions">
			<button
				type="button"
				@click="goHome"
			>
				На главную
			</button>
			<button
				v-if="canRetry"
				type="button"
				@click="tryAgain"
			>
				Повторить
			</button>
		</div>

		<details
			v-if="isDev"
			class="error__details"
		>
			<summary>Dev details</summary>
			<pre class="error__pre">{{ error }}</pre>
		</details>
	</main>
</template>

<script setup>
const props = defineProps({
	error: {
		type: Object,
		required: true
	}
})

const isDev = process.dev

const statusCode = computed(() => props.error.statusCode || 500)

const message = computed(() => {
	if (statusCode.value === 404) {
		return (
			'Страница не найдена' +
			(props.error?.statusMessage ? `: ${props.error.statusMessage}` : '')
		)
	}

	return (
		props.error?.statusMessage ||
		props.error?.message ||
		'Произошла неизвестная ошибка. Попробуй повторить'
	)
})

const canRetry = computed(() => [500, 502, 503, 504].includes(statusCode.value))

function goHome() {
	clearError({ redirect: '/' })
}

function tryAgain() {
	clearError()
}
</script>

<style scoped lang="scss">
.error {
	padding: 2rem;
}

.error__actions {
	margin-top: 1rem;
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
}

.error__details {
	margin-top: 1.5rem;
}

.error__pre {
	white-space: pre-wrap;
}
</style>
