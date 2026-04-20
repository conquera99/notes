'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
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

import Header from '@/components/display/header';
import SyncBadge from '@/components/display/sync-badge';
import { Loading, Trash } from '@/components/icons';

import { db } from '@/lib/db';
import { editorConfig } from '@/lib/constant';

import 'react-toastify/dist/ReactToastify.css';

const CKEditorClient = dynamic(
	() => import('./ckeditor-client'),
	{ ssr: false },
);

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

	const id = searchParams.get('id');

	const [data, setData] = useState('');
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(false);
	const [font, setFont] = useState('');

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
				const deletedAt = dayjs().format(DATETIME_FORMAT);

				await db.notes.update(Number(id), {
					deletedAt,
					updatedAt: deletedAt,
				});

				toast.success('Notes deleted!');
				router.push('/');
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
						deletedAt: null,
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
						deletedAt: null,
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

	return (
		<div className="pb-4">
			<Header>
				<div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
					<SyncBadge />
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
						className="min-w-0 flex-1 text-sm sm:min-w-40 sm:flex-none"
						value={OptionsValue[font]}
						onChange={onFontChange}
						styles={{
							control(base, state) {
								return {
									...base,
									backgroundColor: 'var(--surface)',
									borderColor: state.isFocused
										? 'color-mix(in oklab, var(--accent) 45%, var(--surface-border))'
										: 'var(--surface-border)',
									boxShadow: 'none',
								};
							},
							option(base, state) {
								return {
									...base,
									color: 'var(--foreground)',
									backgroundColor: state.isSelected
										? 'color-mix(in oklab, var(--accent) 20%, var(--surface))'
										: state.isFocused
											? 'color-mix(in oklab, var(--accent) 12%, var(--surface))'
											: 'var(--surface)',
									cursor: 'pointer',
								};
							},
							menu(base) {
								return {
									...base,
									backgroundColor: 'var(--surface)',
									border: '1px solid var(--surface-border)',
								};
							},
							singleValue(base) {
								return {
									...base,
									color: 'var(--foreground)',
								};
							},
							input(base) {
								return {
									...base,
									color: 'var(--foreground)',
								};
							},
							placeholder(base) {
								return {
									...base,
									color: 'var(--muted)',
								};
							},
							indicatorSeparator(base) {
								return {
									...base,
									backgroundColor: 'var(--surface-border)',
								};
							},
							dropdownIndicator(base) {
								return {
									...base,
									color: 'var(--muted)',
								};
							},
							clearIndicator(base) {
								return {
									...base,
									color: 'var(--muted)',
								};
							},
							noOptionsMessage(base) {
								return {
									...base,
									color: 'var(--muted)',
								};
							},
						}}
					/>
					{id !== 'create' && (
						<button
							onClick={onRemove}
							disabled={loading}
							className="flex items-center rounded-full border border-red-300/80 px-3 py-1 text-red-500 transition hover:bg-red-50 sm:px-4 dark:border-red-400/40 dark:hover:bg-red-500/10"
						>
							{loading && <Loading className="text-sm" />}&nbsp;
							<Trash />
						</button>
					)}
					<button
						onClick={onSave}
						disabled={loading}
						className="flex items-center rounded-full bg-(--accent) px-4 py-1.5 font-medium text-(--accent-contrast) transition hover:opacity-90 sm:px-6"
					>
						{loading && <Loading className="text-sm" />} Save
					</button>
				</div>
			</Header>
			<div className={`mx-3 mt-4 rounded-2xl border border-(--surface-border) bg-(--surface) p-3 sm:mx-4 sm:p-6 ${font}`}>
				<input
					value={title}
					onChange={onTitleChange}
					placeholder="Write your title"
					className="w-full border-b border-(--surface-border) bg-transparent py-3 text-xl font-semibold focus:outline-none sm:text-2xl"
				/>
				<CKEditorClient
					data={data}
					config={editorConfig}
					onChange={onTextEditorChange}
				/>
			</div>
			<ToastContainer position="top-center" />
		</div>
	);
}
