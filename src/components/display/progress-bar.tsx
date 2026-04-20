'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { ReactNode } from 'react';

type ProgressBarProps = {
	children: ReactNode;
};

const ProgressBar = ({ children }: ProgressBarProps) => {
	return (
		<ProgressProvider color="#ef4444" options={{ showSpinner: false }}>
			{children}
		</ProgressProvider>
	);
};

export default ProgressBar;
