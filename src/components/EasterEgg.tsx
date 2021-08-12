import { useState } from 'react';
import Konami from 'react-konami';
import UIPressable from './UI/UIPressable';

export default function EasterEgg() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Konami easterEgg={() => setOpen(true)}>{null}</Konami>
			{open && (
				<>
					<UIPressable onClick={() => setOpen(false)}>Close</UIPressable>
					<iframe
						width="956"
						height="538"
						src="https://www.youtube.com/embed/x3dr_VwOaqk"
						title="YouTube video player"
						style={{ margin: '1rem' }}
						// frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</>
			)}
		</>
	);
}
