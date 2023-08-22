'use client';

import { AppProgressBar } from 'next-nprogress-bar';

const ProgressBar = () => {
	return <AppProgressBar color="#3b3b3b" options={{ showSpinner: false }} />;
};

export default ProgressBar;
