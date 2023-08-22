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
