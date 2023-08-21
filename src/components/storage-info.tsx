'use client';

import { formatNumber } from '@/lib/helper';
import { useEffect, useState } from 'react';

const DIVIDE = 1_048_576;

const StorageInfo = () => {
	const [estimateStorage, setEstimateStorage] = useState<StorageEstimate>({});

	useEffect(() => {
		if (typeof navigator !== 'undefined') {
			navigator.storage.estimate().then((estimateSize) => {
				setEstimateStorage(estimateSize);
			});
		}
	}, []);

	return (
		<div className="text-sm fixed bottom-0 px-4 left-0 right-0 text-center py-1">
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
	);
};

export default StorageInfo;
