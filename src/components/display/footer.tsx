'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { useTheme } from 'next-themes';

import { Moon, Sun } from '@/components/icons';

import { formatNumber } from '@/lib/helper';

const DIVIDE = 1_048_576;

export default function Footer({ status }: { status?: ReactNode }) {
	const { setTheme, theme } = useTheme();
	const size = useWindowSize();

	const [estimateStorage, setEstimateStorage] = useState<StorageEstimate>({});

	const switchTheme = (_theme: string) => {
		setTheme(_theme);
	};

	useEffect(() => {
		if (typeof navigator !== 'undefined') {
			if (typeof navigator.storage.estimate !== 'undefined') {
				navigator.storage.estimate().then((estimateSize) => {
					setEstimateStorage(estimateSize);
				});
			}
		}
	}, []);

	return (
		<div className="fixed inset-x-0 bottom-0 z-50 border-t border-(--surface-border) bg-(--surface)/95 text-sm backdrop-blur-md">
			<div className="mx-auto flex w-full max-w-5xl gap-2 px-4 py-2 flex-row sm:items-center sm:justify-between">
				<div className="w-full text-xs leading-5 text-(--muted) sm:text-sm">
				Usage&nbsp;
				{formatNumber(
					Number(((estimateStorage?.usage || 0) / DIVIDE).toFixed(0)),
				)}
				&nbsp;of&nbsp;
				{formatNumber(
					Number(((estimateStorage?.quota || 0) / DIVIDE).toFixed(0)),
				)}
				&nbsp;MB; &nbsp;Status: <span className="text-(--foreground)">{status ?? '-'}</span>
				</div>
				<div className="flex w-full items-center gap-3 text-xs text-(--muted) sm:w-auto justify-end sm:text-sm">
					<span className="hidden sm:inline">{size.width}x{size.height}</span>
					<button
						type="button"
						onClick={() => switchTheme(theme === 'light' ? 'dark' : 'light')}
						className="cursor-pointer rounded-full border border-(--surface-border) p-2 text-(--foreground) transition hover:bg-black/5 dark:hover:bg-white/10"
					>
						{theme === 'light' ? (
							<Moon />
						) : (
							<Sun />
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
