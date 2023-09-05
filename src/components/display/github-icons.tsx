'use client';

import { GitHub, GitHubWhite } from '@/components/icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const GithubIcons = () => {
	const { theme } = useTheme();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return theme === 'light' ? <GitHub /> : <GitHubWhite />;
};
