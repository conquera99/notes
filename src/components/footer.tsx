'use client';

import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

import { formatNumber } from '@/lib/helper';

const DIVIDE = 1_048_576;

export default function Footer() {
	const size = useWindowSize();

	const [estimateStorage, setEstimateStorage] = useState<StorageEstimate>({});

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
			<div>
				{size.width}x{size.height}
			</div>
		</div>
	);
}
