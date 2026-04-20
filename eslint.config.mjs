import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
	...nextVitals,
	...nextTypescript,
	prettier,
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
				},
			],
			'@next/next/no-img-element': 'off',
			'@next/next/no-page-custom-font': 'off',
			'class-methods-use-this': 'off',
			'func-names': 'off',
			'import/no-extraneous-dependencies': 'off',
			'import/no-unresolved': 'off',
			'import/prefer-default-export': 'off',
			'jsx-a11y/anchor-is-valid': 'off',
			'jsx-a11y/click-events-have-key-events': 'off',
			'jsx-a11y/no-static-element-interactions': 'off',
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error'],
				},
			],
			'no-nested-ternary': 'off',
			'no-param-reassign': 'off',
			'no-plusplus': 'off',
			'no-restricted-globals': ['error', 'event', 'fdescribe'],
			'no-return-assign': 'off',
			'no-unused-vars': 'off',
			'object-shorthand': 'off',
			'prefer-template': 'off',
			'react/jsx-filename-extension': [
				'warn',
				{
					extensions: ['.ts', '.tsx'],
				},
			],
			'react/jsx-props-no-spreading': 'off',
			'react/no-unused-state': 'warn',
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
		},
	},
]);
