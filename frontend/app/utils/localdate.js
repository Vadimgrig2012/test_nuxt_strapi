export function localDate(date) {
	if (!date) return ''
	return new Date(date).toLocaleDateString()
}
