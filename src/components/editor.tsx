'use client';

import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { ToastContainer, toast } from 'react-toastify';

import type BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

import Header from '@/components/header';
import { Loading, Trash } from '@/components/icons';

import { db } from '@/lib/db';
import { editorConfig } from '@/lib/constant';

import 'react-toastify/dist/ReactToastify.css';

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

	const onRemove = async () => {
		setLoading(true);

		try {
			if (id !== 'create') {
				console.log('delete-data');
				db.notes.delete(Number(id)).then((response) => {
					console.log('data deleted', response);
					toast.success('Notes deleted!');
					router.push('/main');
				});
			}
		} catch (error) {
			console.log('remove-error', error);
			toast.error('Remove failed!');
		}

		setLoading(false);
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
						toast.success('Notes saved!');
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
				toast.success('Notes saved!');
			}
		} catch (error) {
			console.log('save-error', error);
			toast.error('Save failed!');
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
				<div className="flex items-center">
					{id !== 'create' && (
						<button
							onClick={onRemove}
							disabled={loading}
							className="rounded-full text-red-500 px-4 flex items-center"
						>
							{loading && <Loading className="text-sm" />}&nbsp;
							<Trash />
						</button>
					)}
					<button
						onClick={onSave}
						disabled={loading}
						className="rounded-full bg-red-500 text-white px-4 py-1 flex items-center"
					>
						{loading && <Loading className="text-sm" />} Save
					</button>
				</div>
			</Header>
			{editorLoaded ? (
				<div className="px-4">
					<input
						value={title}
						onChange={onTitleChange}
						placeholder="Write your title"
						className="py-2 focus:outline-none text-xl"
					/>
					<CKEditor
						editor={BalloonEditor}
						data={data}
						config={editorConfig}
						onChange={onTextEditorChange}
					/>
				</div>
			) : (
				<div className="text-sm px-4">
					<Loading className="text-sm" />
				</div>
			)}
			<ToastContainer position="top-center" />
		</div>
	);
}
