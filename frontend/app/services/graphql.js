export async function gqlRequest(query, variables = {}, opts = {}) {
	const config = useRuntimeConfig()

	const url = config.public.strapiUrl + config.public.strapiGraphqlPath

	const res = await $fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...opts.headers
		},
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
