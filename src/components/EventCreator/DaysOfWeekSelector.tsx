import { Dispatch, SetStateAction, useCallback } from 'react';
import { toggleBit } from '../bits';
import { green, lightgrey } from '../colors';

const DAY_NAMES = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export default function DaysOfWeekSelector({
	daysOfWeek,
	update,
	disabled = false,
}: {
	daysOfWeek: number;
	update: Dispatch<SetStateAction<number>>;
	disabled?: boolean;
}) {
	const toggleDayOfWeek = useCallback(
		function (idx: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
			update((daysOfWeek) => toggleBit(daysOfWeek, idx));
		},
		[update]
	);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				margin: '1rem auto',
			}}
		>
			{DAY_NAMES.map((name, idx) => {
				const mask = 0b1000_0000 >> (idx + 1);
				const active = (daysOfWeek & mask) !== 0;
				return (
					<div
						style={{
							borderRadius: '100%',
							cursor: 'pointer',
							backgroundColor: active
								? disabled
									? // lighter version of green
									  'rgba(96, 247, 96, 0.5)'
									: green
								: disabled
								? // lighter version of lightgrey
								  'rgba(224, 224, 224, 0.5)'
								: lightgrey,
							color: active
								? 'white'
								: disabled
								? 'rgba(0, 0, 0, 0.5)'
								: 'black',
							userSelect: 'none',
							width: '2em',
							height: '2em',
							margin: '0.5rem',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						onClick={() => {
							if (!disabled) {
								toggleDayOfWeek(
									// @ts-ignore
									idx + 1
								);
							}
						}}
						key={name}
					>
						{name.charAt(0)}
					</div>
				);
			})}
		</div>
	);
}
