'use client';

import { GitHub, GitHubWhite } from '@/components/icons';
import { useTheme } from 'next-themes';

export const GithubIcons = () => {
	const { resolvedTheme } = useTheme();

	return resolvedTheme === 'dark' ? <GitHubWhite /> : <GitHub />;
};
