export const editorConfig = {
	placeholder: 'Start writing here',
	toolbar: [
		'heading',
		'|',
		'bold',
		'italic',
		'link',
		'bulletedList',
		'numberedList',
		'blockQuote',
		'|',
		'undo',
		'redo',
	],
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph',
			},
			{
				model: 'heading1',
				view: 'h1',
				title: 'Heading 1',
				class: 'ck-heading_heading1',
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2',
			},
		],
	},
};

export const appConfig = {
	name: 'Notes.',
	desc: 'offline notes for mobile and web',
	url: 'https://notes.nunukan.net',
};
