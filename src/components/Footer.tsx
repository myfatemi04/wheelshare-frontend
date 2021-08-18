export default function Footer() {
	return (
		<div
			style={{
				position: 'absolute',
				bottom: '0.5rem',
				fontSize: '0.75rem',
				textAlign: 'center',
				left: 0,
				right: 0,
			}}
		>
			Made by <a href="https://linkedin.com/in/michaelfatemi">Michael Fatemi</a>
			,{' '}
			<a href="https://www.linkedin.com/in/joshua-hsueh-984435b8/">
				Joshua Hsueh
			</a>
			,{' '}
			<a href="https://www.linkedin.com/in/nkanchinadam/">Nitin Kanchinadam</a>.
			Code:{' '}
			<a href="https://github.com/myfatemi04/wheelshare-frontend">frontend</a>,{' '}
			<a href="https://github.com/myfatemi04/wheelshare-altbackend">backend</a>{' '}
			<a href="/error-report">Report an error</a>{' '}
			<a
				href="https://ko-fi.com/michaelfatemi"
				target="_blank"
				rel="noopener noreferrer"
				style={{
					display: 'inline-block',
					position: 'relative',
					backgroundColor: 'rgb(255, 56, 96)',
					borderRadius: '0.5rem',
					padding: '0.5em',
					color: 'white',
					textDecoration: 'none',
					marginTop: '0.5rem',
				}}
			>
				<img
					src="https://ko-fi.com/img/cup-border.png"
					alt=""
					style={{ height: '1em' }}
				/>
				Donate
			</a>
		</div>
	);
}
