'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	BalloonEditor,
	BlockQuote,
	Bold,
	Essentials,
	Heading,
	Italic,
	Link,
	List,
	Paragraph,
	Undo,
} from 'ckeditor5';

type CkeditorClientProps = {
	data: string;
	config: Record<string, unknown>;
	onChange: (_event: unknown, editor: any) => void;
};

export default function CkeditorClient({
	data,
	config,
	onChange,
}: CkeditorClientProps) {
	return (
		<CKEditor
			editor={BalloonEditor}
			data={data}
			config={{
				...config,
				ui: {
					poweredBy: {
						position: 'inside',
						side: 'right',
						label: 'This is',
					},
				},
				licenseKey: 'GPL',
				plugins: [
					Essentials,
					Paragraph,
					Heading,
					Bold,
					Italic,
					Link,
					List,
					BlockQuote,
					Undo,
				],
			}}
			onChange={onChange}
		/>
	);
}
