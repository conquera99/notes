'use client';

import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { ToastContainer, toast } from 'react-toastify';
import Select, { SingleValue } from 'react-select';
import {
	Long_Cang,
	Kaushan_Script,
	Anonymous_Pro,
	Raleway,
	Noto_Sans_SC,
} from 'next/font/google';

import type BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

import Header from '@/components/display/header';
import { Loading, Trash } from '@/components/icons';

import { db } from '@/lib/db';
import { editorConfig } from '@/lib/constant';

import 'react-toastify/dist/ReactToastify.css';

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const LongChangFont = Long_Cang({
	subsets: ['latin'],
	weight: ['400'],
});
const KaushanScriptFont = Kaushan_Script({
	subsets: ['latin'],
	weight: ['400'],
});
const AnonymousProFont = Anonymous_Pro({
	subsets: ['latin'],
	weight: ['400'],
});
const RalewayFont = Raleway({
	subsets: ['latin'],
	weight: ['400'],
});
const NotoSansSCFont = Noto_Sans_SC({
	subsets: ['latin'],
	weight: ['400'],
});

const OptionsValue = {
	'': { label: 'Nothing Font', value: '' },
	[LongChangFont.className]: {
		label: 'Chinese Font',
		value: LongChangFont.className,
	},
	[KaushanScriptFont.className]: {
		label: 'Kaushan Font',
		value: KaushanScriptFont.className,
	},
	[AnonymousProFont.className]: {
		label: 'Anonymous Font',
		value: AnonymousProFont.className,
	},
	[RalewayFont.className]: {
		label: 'Raleway Font',
		value: RalewayFont.className,
	},
	[NotoSansSCFont.className]: {
		label: 'Noto Sans Font',
		value: NotoSansSCFont.className,
	},
};

export default function Editor() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const editorRef = useRef<{ CKEditor: any; BalloonEditor: BalloonEditor }>();

	const id = searchParams.get('id');

	// get data
	useLiveQuery(async () => {
		if (id) {
			const note = await db.notes.get(Number(id));

			setTitle(note?.title || '');
			setData(note?.content || '');
			setFont(note?.font || '');

			return note;
		}

		return null;
	}, [id]);

	const [editorLoaded, setEditorLoaded] = useState(false);
	const [data, setData] = useState('');
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(false);
	const [font, setFont] = useState('');

	const { CKEditor, BalloonEditor } = editorRef.current || {};

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onFontChange = (val: SingleValue<{ value: string; label: string }>) =>
		setFont(val?.value || '');

	const onTextEditorChange = (_event: any, editor: any) => {
		const data = editor.getData();

		setData(data);
	};

	const onRemove = async () => {
		setLoading(true);

		try {
			if (id) {
				console.log('delete-data');
				db.notes.delete(Number(id)).then((response) => {
					console.log('data deleted', response);
					toast.success('Notes deleted!');
					router.push('/');
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

			if (!id) {
				console.log('create-data');
				db.notes
					.add({
						title: title,
						content: data,
						font: font,
						createdAt: currentTimestamp,
						updatedAt: currentTimestamp,
					})
					.then((response) => {
						console.log('data created', response);
						toast.success('Notes saved!');
						router.replace(`/notes?id=${response}`);
					});
			} else {
				console.log('update-data', id);
				db.notes
					.update(Number(id), {
						title,
						content: data,
						font: font,
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
					<Select
						options={[
							{ value: '', label: 'Nothing Font' },
							{
								value: LongChangFont.className,
								label: 'Chinese Font',
							},
							{
								value: KaushanScriptFont.className,
								label: 'Kaushan Font',
							},
							{
								value: AnonymousProFont.className,
								label: 'Anonymous Font',
							},
							{
								value: RalewayFont.className,
								label: 'Raleway Font',
							},
							{
								value: NotoSansSCFont.className,
								label: 'Noto Sans Font',
							},
						]}
						className="input-select"
						value={OptionsValue[font]}
						onChange={onFontChange}
						styles={{
							option(base) {
								return {
									...base,
									color: '#333333',
								};
							},
						}}
					/>
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
						className="rounded-full bg-red-500 text-white px-6 py-1 flex items-center"
					>
						{loading && <Loading className="text-sm" />} Save
					</button>
				</div>
			</Header>
			{editorLoaded ? (
				<div className={`px-4 ${font}`}>
					<input
						value={title}
						onChange={onTitleChange}
						placeholder="Write your title"
						className="py-2 focus:outline-none text-xl w-full"
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
