import { CSSProperties } from '@material-ui/styles';
import { MouseEventHandler, useCallback, useState } from 'react';

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
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	transition: 'background-color 100ms cubic-bezier',
	userSelect: 'none',
	position: 'relative',
	fontWeight: 'normal',
};

const selectedOptionStyle = {
	...optionStyle,
	fontWeight: 600,
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
	const selected = current === bind;

	const select: MouseEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			onSelected(bind);
		},
		[onSelected, bind]
	);

	return (
		<div style={selected ? selectedOptionStyle : optionStyle} onClick={select}>
			{availabilityNames[bind]}
		</div>
	);
}

export default function Availability({
	selected,
	onSelected: onSelectedInner,
}: {
	selected: AvailabilityKind;
	onSelected: (kind: AvailabilityKind) => void;
}) {
	const [focused, setFocused] = useState(false);
	const onSelected = useCallback(
		(kind: AvailabilityKind) => {
			setFocused(false);
			onSelectedInner(kind);
		},
		[onSelectedInner]
	);
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
			tabIndex={0}
			onBlur={() => setFocused(false)}
		>
			{focused ? (
				<>
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
					<Option
						bind="interested"
						current={selected}
						onSelected={onSelected}
					/>
					<Option
						bind="not-interested"
						current={selected}
						onSelected={onSelected}
					/>
				</>
			) : (
				<Option
					bind={selected}
					current={selected}
					onSelected={() => setFocused(true)}
				/>
			)}
		</div>
	);
}
