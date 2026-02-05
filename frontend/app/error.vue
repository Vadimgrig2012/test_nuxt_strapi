<template>
	<main class="error">
		<h1 class="error__title">
			{{ is404 ? '404 — страница не найдена' : `Ошибка ${code}` }}
		</h1>
		<p class="error__message">
			{{ message }}
		</p>

		<button
			type="button"
			class="error__btn"
			@click="clearError({ redirect: '/' })"
		>
			← На главную
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
const code = computed(() => Number(props.error?.statusCode || 500))
const is404 = computed(() => code.value === 404)

const raw = computed(
	() => props.error?.message || props.error?.statusMessage || ''
)

const message = computed(() => {
	if (is404.value) {
		if (
			typeof raw.value === 'string' &&
			raw.value.startsWith('Page not found')
		) {
			return 'Запрашиваемая страница не существует.'
		}
		return raw.value || 'Такой страницы не существует.'
	}
	return (
		raw.value || 'Произошла ошибка на сервере. Пожалуйста, попробуйте позже.'
	)
})

const errorTitle = computed(() =>
	is404.value ? '404 — страница не найдена' : `Ошибка ${code.value}`
)

useHead(() => ({
	title: errorTitle.value,
	titleTemplate: '%s'
}))
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

.error__message {
	margin: 2rem 0;
	font-weight: 600;
}

.error__pre {
	white-space: pre-wrap;
}

.error__btn {
	padding: 0.5rem 1rem;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 0.3rem;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #0f6ed3;
	}
}
</style>
