export const Loading = ({ className }: { className?: string }) => (
	<svg
		height="1em"
		viewBox="0 0 100 40"
		style={{ verticalAlign: '-0.125em' }}
		className={className}
	>
		<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			<g transform="translate(-100.000000, -71.000000)">
				<g transform="translate(95.000000, 71.000000)">
					<g transform="translate(5.000000, 0.000000)">
						<rect
							fill="currentColor"
							x="20"
							y="16"
							width="8"
							height="8"
							rx="2"
						>
							<animate
								attributeName="y"
								from="16"
								to="16"
								dur="2s"
								begin="0s"
								repeatCount="indefinite"
								values="16; 6; 26; 16; 16"
								keyTimes="0; 0.1; 0.3; 0.4; 1"
								id="circ-anim"
							></animate>
						</rect>
						<rect
							fill="currentColor"
							x="46"
							y="16"
							width="8"
							height="8"
							rx="2"
						>
							<animate
								attributeName="y"
								from="16"
								to="16"
								dur="2s"
								begin="0.2s"
								repeatCount="indefinite"
								values="16; 6; 26; 16; 16"
								keyTimes="0; 0.1; 0.3; 0.4; 1"
								id="circ-anim"
							></animate>
						</rect>
						<rect
							fill="currentColor"
							x="72"
							y="16"
							width="8"
							height="8"
							rx="2"
						>
							<animate
								attributeName="y"
								from="16"
								to="16"
								dur="2s"
								begin="0.4s"
								repeatCount="indefinite"
								values="16; 6; 26; 16; 16"
								keyTimes="0; 0.1; 0.3; 0.4; 1"
								id="circ-anim"
							></animate>
						</rect>
					</g>
				</g>
			</g>
		</g>
	</svg>
);

export const Trash = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		fill="currentColor"
		className="w-6 h-6 mt-1"
		viewBox="0 0 18 18"
	>
		<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
		<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
	</svg>
);

export const GitHub = () => (
	<svg
		className="w-6 h-5"
		width="98"
		height="96"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 98 96"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
			fill="#24292f"
		/>
	</svg>
);
