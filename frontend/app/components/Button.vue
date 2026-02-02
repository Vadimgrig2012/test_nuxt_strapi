<template>
	<NuxtLink
		class="button"
		:to="to"
	>
		<slot />
	</NuxtLink>
</template>

<script setup>
defineProps({
	to: {
		type: [String, Object],
		required: true
	}
})
</script>

<style scoped lang="scss">
.button {
	margin: 5rem 0;
	padding: 0.5rem 1rem;
	background-color: #007bff;
	color: white;
	border-radius: 4px;
	text-decoration: none;
	text-align: center;
	display: inline-block;
}
</style>
