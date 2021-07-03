import { useCallback } from 'react';

const baseStyle = {
	marginTop: '0.5em',
	padding: '0.5em',
	fontFamily: 'Inter',
	fontSize: '1.25rem',
	borderRadius: '0.5em',
	border: '0px',
};

export default function UIDateInput({
	onChangedDate,
	disabled = false,
}: {
	onChangedDate: (date: Date | null) => void;
	disabled?: boolean;
}) {
	const onChange = useCallback(
		(e) => {
			// YYYY-MM-DD or "" (empty string)
			const dateAsString = e.target.value as string;
			if (typeof dateAsString !== 'string' || dateAsString.length === 0) {
				onChangedDate(null);
			}
			const year = dateAsString.slice(0, 4);
			const month = dateAsString.slice(5, 7);
			const day = dateAsString.slice(8, 10);

			// Midnight in the timezone of the user
			const date = new Date(`${year}-${month}-${day}T00:00:00`);
			onChangedDate(date);
		},
		[onChangedDate]
	);
	return (
		<input
			style={baseStyle}
			type="date"
			disabled={disabled}
			onChange={onChange}
		/>
	);
}
