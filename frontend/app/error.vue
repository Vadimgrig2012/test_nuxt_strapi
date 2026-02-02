<template>
	<main class="error">
		<h1
			v-if="is404"
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
		<p v-if="is404">
			{{ display404Message }}
		</p>
		<p v-else>
			{{
				displayMessage || 'Произошла ошибка. Попробуй обновить страницу позже.'
			}}
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
const is404 = computed(() => statusCode.value === 404)

/**
 * Берём сообщение, которое пришло в ошибке.
 * Важно: сначала message, потом statusMessage (ты уже сделал правильно).
 */
const rawMessage = computed(
	() => props.error?.message || props.error?.statusMessage || ''
)

/**
 * У Nuxt для "роут не найден" часто message = "Page not found: /xxx".
 * Мы НЕ хотим это показывать пользователю.
 */
const isNuxtRoute404Message = computed(() => {
	const msg = rawMessage.value
	return typeof msg === 'string' && msg.startsWith('Page not found:')
})

/**
 * Сообщение для не-404 ошибок (500 и т.д.)
 */
const displayMessage = computed(() => rawMessage.value)

/**
 * Сообщение для 404:
 * - если это системный "Page not found: /xxx" → показываем дефолтный человеко-текст
 * - если это твой 404 (например "Новость не найдена") → показываем его
 */
const display404Message = computed(() => {
	if (isNuxtRoute404Message.value) return 'Такой страницы не существует.'
	return rawMessage.value || 'Такой страницы не существует.'
})

function goHome() {
	clearError({ redirect: '/' })
}

useHead(() => ({
	title: is404.value
		? '404 — страница не найдена'
		: `Ошибка ${statusCode.value}`,
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

.error__pre {
	white-space: pre-wrap;
}
</style>
