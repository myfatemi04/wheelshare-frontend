import { useCallback } from 'react';

const baseStyle = {
	marginTop: '0.5em',
	padding: '0.5em',
	fontFamily: 'Inter',
	fontSize: '1.25rem',
	borderRadius: '0.5em',
	border: '0px',
};

export default function UIDatetimeInput({
	onChangedDate,
	disabled = false,
}: {
	onChangedDate: (date: Date | null) => void;
	disabled?: boolean;
}) {
	const onChange = useCallback(
		(e) => {
			const number = e.target.valueAsNumber;
			if (!isNaN(number)) {
				const date = new Date(number);
				onChangedDate(date);
			}
		},
		[onChangedDate]
	);
	return (
		<input
			style={baseStyle}
			type="datetime-local"
			disabled={disabled}
			onChange={onChange}
		/>
	);
}
