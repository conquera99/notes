'use client';

import { AppProgressBar } from 'next-nprogress-bar';

const ProgressBar = () => {
	return <AppProgressBar color="#ef4444" options={{ showSpinner: false }} />;
};

export default ProgressBar;
