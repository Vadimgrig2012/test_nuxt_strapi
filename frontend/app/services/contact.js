const CONTACT_PAGE_QUERY = /* #graphql */ `
query ContactPage {
	contact {
    title_h1
    content
    email
    phone
    address
    seo {
      metaTitle
      metaDescription
    }
  }
}
`

export async function fetchContactPage(gqlRequest) {
	const data = await gqlRequest(CONTACT_PAGE_QUERY)
	return data?.contact || null
}
