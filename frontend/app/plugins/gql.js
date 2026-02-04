export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig()
	const url = config.public.strapiUrl + config.public.strapiGraphqlPath

	const gqlRequest = async (query, variables = {}) => {
		const res = await $fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: { query, variables }
		})

		if (res?.errors?.length) {
			const message = res.errors.map(e => e.message).join('\n')
			throw createError({
				statusCode: 500,
				statusMessage: 'Graphql error',
				message
			})
		}

		return res.data
	}

	return {
		provide: { gqlRequest }
	}
})
