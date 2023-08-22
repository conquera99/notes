/**
 * Format Number
 *
 * @param {number | bigint} value
 * @param {string | string[]} locale default en-ID
 * @param {Intl.NumberFormatOptions | undefined} options Intl number format options
 *
 * @returns {string}
 */
export const formatNumber = (
	value: number,
	locale: string | string[] = 'en-ID',
	options: Record<string, unknown> = { style: 'decimal' },
): string => new Intl.NumberFormat(locale, options).format(value);

export const escapeHtml = (unsafe: string) => {
	return unsafe
		.replace(/(<([^>]+)>)/gi, '')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&nbsp;/g, ' ')
		.replace(/&#039;/g, "'");
};
