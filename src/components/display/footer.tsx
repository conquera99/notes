'use client';

import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { useTheme } from 'next-themes';

import { Moon, Sun } from '@/components/icons';

import { formatNumber } from '@/lib/helper';

const DIVIDE = 1_048_576;

export default function Footer() {
	const { setTheme, theme } = useTheme();
	const size = useWindowSize();

	const [mounted, setMounted] = useState(false);

	const [estimateStorage, setEstimateStorage] = useState<StorageEstimate>({});

	const switchTheme = (_theme: string) => {
		setTheme(_theme);

		console.log(_theme);
	};

	useEffect(() => {
		if (typeof navigator !== 'undefined') {
			if (typeof navigator.storage.estimate !== 'undefined') {
				navigator.storage.estimate().then((estimateSize) => {
					setEstimateStorage(estimateSize);
				});
			}
		}

		setMounted(true);
	}, []);

	if (!mounted)
		return (
			<div className="text-sm h-[29px] flex items-center justify-between fixed bottom-0 px-4 left-0 right-0 text-center py-1 backdrop-blur-sm bg-white/30 border-t-slate-100 border-t">
				&nbsp;
			</div>
		);

	return (
		<div className="text-sm flex items-center justify-between fixed bottom-0 px-4 left-0 right-0 text-center py-1 backdrop-blur-sm bg-white/30 border-t-slate-100 border-t">
			<div>
				Usage&nbsp;
				{formatNumber(
					Number(((estimateStorage?.usage || 0) / DIVIDE).toFixed(0)),
				)}
				&nbsp;of&nbsp;
				{formatNumber(
					Number(((estimateStorage?.quota || 0) / DIVIDE).toFixed(0)),
				)}
				&nbsp;MB
			</div>
			<div className="flex gap-6 items-center">
				{size.width}x{size.height}
				<span className="cursor-pointer">
					{theme === 'light' ? (
						<Moon onClick={switchTheme} />
					) : (
						<Sun onClick={switchTheme} />
					)}
				</span>
			</div>
		</div>
	);
}
