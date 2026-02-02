<template>
	<main class="error">
		<h1
			v-if="statusCode === 404"
			class="error__title"
		>
			404 - страница не найдена
		</h1>
		<h1
			v-else
			class="error__title"
		>
			Ошибка {{ statusCode }}
		</h1>
		<p v-if="statusCode === 404">
			{{ message || 'Такой страницы не существует.' }}
		</p>
		<p v-else>
			{{ message || 'Произошла ошибка. Попробуй обновить страницу позже.' }}
		</p>

		<button
			type="button"
			@click="goHome"
		>
			На главную
		</button>

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

const statusCode = computed(() => props.error?.statusCode || 500)
const message = computed(
	() => props.error?.message || props.error?.statusMessage || ''
)

function goHome() {
	clearError({ redirect: '/' })
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
