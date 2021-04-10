export default function Home() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h1>Home</h1>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<a href="/signin" className="mx-2">
					Sign In
				</a>
				<a href="/signup" className="mx-2">
					Sign Up
				</a>
			</div>
		</div>
	);
}
