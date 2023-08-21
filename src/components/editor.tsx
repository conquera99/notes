'use client';

import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';

import type BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

import { db } from '@/lib/db';
import { editorConfig } from '@/lib/constant';
import Header from '@/components/header';

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export default function Editor({
	id = 'create',
}: {
	id?: number | string | undefined;
}) {
	const router = useRouter();
	const editorRef = useRef<{ CKEditor: any; BalloonEditor: BalloonEditor }>();

	// get data
	useLiveQuery(async () => {
		if (id !== 'create') {
			const note = await db.notes.get(Number(id));

			setTitle(note?.title || '');
			setData(note?.content || '');

			return note;
		}

		return null;
	}, [id]);

	const [editorLoaded, setEditorLoaded] = useState(false);
	const [data, setData] = useState('');
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(false);

	const { CKEditor, BalloonEditor } = editorRef.current || {};

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onTextEditorChange = (_event: any, editor: any) => {
		const data = editor.getData();

		setData(data);
	};

	const onSave = async () => {
		setLoading(true);

		try {
			const currentTimestamp = dayjs().format(DATETIME_FORMAT);

			if (id === 'create') {
				console.log('create-data');
				db.notes
					.add({
						title: title,
						content: data,
						createdAt: currentTimestamp,
						updatedAt: currentTimestamp,
					})
					.then((response) => {
						console.log('data created', response);
					});
			} else if (id) {
				console.log('update-data', id);
				db.notes
					.update(Number(id), {
						title,
						content: data,
						updatedAt: currentTimestamp,
					})
					.then((response) => {
						console.log(response);
						if (response) console.log('updated data', id);
						else console.log('no data updated');
					});
			}
		} catch (error) {
			console.log('save-error', error);
		}

		setLoading(false);
	};

	useEffect(() => {
		editorRef.current = {
			CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
			BalloonEditor: require('@ckeditor/ckeditor5-build-balloon'),
		};
		setEditorLoaded(true);
	}, []);

	return (
		<div>
			<Header>
				<button
					onClick={onSave}
					className="rounded-full bg-red-500 text-white px-4 py-1"
				>
					Save
				</button>
			</Header>
			{editorLoaded ? (
				<div className="px-4">
					<input
						value={title}
						onChange={onTitleChange}
						placeholder="Write your title"
						className="py-2 focus:outline-none"
					/>
					<CKEditor
						editor={BalloonEditor}
						data={data}
						config={editorConfig}
						onChange={onTextEditorChange}
					/>
				</div>
			) : (
				<div className="text-sm px-4">loading...</div>
			)}
		</div>
	);
}
