import { CSSProperties } from '@material-ui/styles';
import { useCallback, useMemo } from 'react';

export type AvailabilityKind =
	| 'going/can-bring-someone'
	| 'going/cannot-bring-someone'
	| 'interested'
	| 'not-interested';

const availabilityNames: Record<AvailabilityKind, string> = {
	'going/can-bring-someone': 'Going; Can bring someone',
	'going/cannot-bring-someone': "Going; Can't bring someone",
	interested: 'Interested',
	'not-interested': 'Not interested',
};

const optionStyle: CSSProperties = {
	height: '3rem',
	backgroundColor: 'white',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
};

function Option({
	bind,
	current,
	onSelected,
}: {
	bind: AvailabilityKind;
	current: AvailabilityKind;
	onSelected: (kind: AvailabilityKind) => void;
}) {
	const style = useMemo(
		() =>
			current === bind
				? { ...optionStyle, backgroundColor: '#5080f0', color: 'white' }
				: optionStyle,
		[bind, current]
	);

	const select = useCallback(() => {
		onSelected(bind);
	}, [onSelected, bind]);

	return (
		<div style={style} onClick={select}>
			{availabilityNames[bind]}
		</div>
	);
}

export default function Availability({
	selected,
	onSelected,
}: {
	selected: AvailabilityKind;
	onSelected: (kind: AvailabilityKind) => void;
}) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				borderRadius: '0.5rem',
				border: '1px solid lightgrey',
				overflow: 'hidden',
				marginTop: '1rem',
				marginBottom: '1rem',
			}}
		>
			<Option
				bind="going/can-bring-someone"
				current={selected}
				onSelected={onSelected}
			/>
			<Option
				bind="going/cannot-bring-someone"
				current={selected}
				onSelected={onSelected}
			/>
			<Option bind="interested" current={selected} onSelected={onSelected} />
			<Option
				bind="not-interested"
				current={selected}
				onSelected={onSelected}
			/>
		</div>
	);
}
