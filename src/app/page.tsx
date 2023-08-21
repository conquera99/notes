import InitializeDB from '@/components/initialize';

export default function Splash() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="px-4 text-3xl">NOTES.</h1>
				<small>Conquera99</small>

				<InitializeDB />
			</div>
		</div>
	);
}
