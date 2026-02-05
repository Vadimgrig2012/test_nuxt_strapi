export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig()
	const url = config.public.strapiUrl + config.public.strapiGraphqlPath

	const gqlRequest = async (query, variables = {}) => {
		try {
			const res = await $fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: { query, variables }
			})

			if (res?.errors?.length) {
				const message = res.errors
					.map(e => e?.message)
					.filter(Boolean)
					.join('\n')

				throw createError({
					statusCode: 500,
					message: `GraphQL error: ${operationName}: ${message}`
				})
			}

			return res?.data
		} catch (e) {
			if (e?.statusCode) throw e

			const statusCode =
				e?.response?.status || e?.status || e?.statusCode || 500

			const msg =
				e?.data?.message ||
				e?.response?._data?.message ||
				e?.message ||
				'GraphQL request failed'

			throw createError({
				statusCode: statusCode >= 400 && statusCode <= 599 ? statusCode : 500,
				message: `GraphQL request failed: ${msg}`
			})
		}
	}

	return {
		provide: { gqlRequest }
	}
})
