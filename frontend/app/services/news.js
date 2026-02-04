const NEWS_LIST = /* #graphql */ `
query NewsList {
  newses (sort: ["published:desc"]) {
    title_h1
    slug
    excerpt
    published
  }
}
`

const NEWS_BY_SLUG_QUERY = /* #graphql */ `
query NewsBySlug($slug: String!) {
  newses(filters: { slug: { eq: $slug } }) {
    title_h1
    slug
    excerpt
    content
    published
    seo {
      metaTitle
      metaDescription
    }
  }
}
`

const NEWS_NEIGHBORS_BY_PUBLISHED = /* #graphql */ `
query NewsNeighborsByPublished($published: DateTime!) {
  previous: newses(filters: { published: { lt: $published } }, sort: ["published:desc"], pagination: { limit: 1 }) {
    title_h1
    slug
    published
  }
  next: newses(filters: { published: { gt: $published } }, sort: ["published:asc"], pagination: { limit: 1 }) {
    title_h1
    slug
    published
  }
}
`

export async function fetchNewsList(gqlRequest) {
	const data = await gqlRequest(NEWS_LIST)
	return data?.newses || []
}

export async function fetchNewsBySlug(gqlRequest, slug) {
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

export async function fetchNewsNeighborsByPublished(gqlRequest, published) {
	const data = await gqlRequest(NEWS_NEIGHBORS_BY_PUBLISHED, { published })
	return {
		prev: data?.previous?.[0] || null,
		next: data?.next?.[0] || null
	}
}
