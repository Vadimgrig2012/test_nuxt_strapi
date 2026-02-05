export function toRichtext(blocks) {
	if (!Array.isArray(blocks)) return ''

	return blocks
		.map(block => {
			const children = Array.isArray(block?.children) ? block.children : []
			const text = children
				.map(ch => (typeof ch?.text === 'string' ? ch.text : ''))
				.join('')
				.trim()

			return text
		})
		.filter(Boolean)
		.join('\n\n')
}
