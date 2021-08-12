export default function Footer() {
	return (
		<div
			style={{
				position: 'absolute',
				bottom: '0.5rem',
				fontSize: '0.75rem',
				textAlign: 'center',
				width: '100%',
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
			<a href="https://github.com/myfatemi04/wheelshare-altbackend">backend</a>
		</div>
	);
}
