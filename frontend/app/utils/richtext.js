export function toRichtext(blocks) {
	if (!blocks) return ''

	const arr = Array.isArray(blocks) ? blocks : [blocks]

	const getTextFromChildren = children => {
		if (!Array.isArray(children)) return ''
		return children
			.map(ch => (typeof ch?.text === 'string' ? ch.text : ''))
			.join('')
			.trim()
	}

	// Берём только параграфы/заголовки как “абзацы” (одна строка текста)
	const paragraphs = arr
		.map(block => getTextFromChildren(block?.children))
		.map(t => t.replace(/\s+/g, ' ').trim())
		.filter(Boolean)

	return paragraphs.join('\n\n')
}
