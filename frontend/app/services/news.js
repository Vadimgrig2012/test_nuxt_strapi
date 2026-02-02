import { gqlRequest } from '@/services/graphql'

const NEWS_BY_SLUG_QUERY = /* #graphql */ `
query NewsBySlug($slug: String!) {
  newses(filters: { slug: { eq: $slug } }) {
    title_h1
    slug
    excerpt
    content
    seo {
      metaTitle
      metaDescription
    }
  }
}
`

export async function fetchNewsBySlug(slug) {
	const data = await gqlRequest(NEWS_BY_SLUG_QUERY, { slug })
	const item = data?.newses?.[0] || null

	if (!item) {
		throw createError({
			statusCode: 404,
			message: 'Новость не найдена'
		})
	}
	return item
}
