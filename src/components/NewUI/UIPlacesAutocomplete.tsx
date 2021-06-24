import { useRef, useState } from 'react';
import PlacesAutocomplete, { Suggestion } from 'react-places-autocomplete';

type Opts = Parameters<PlacesAutocomplete['props']['children']>['0'];

function SuggestionsList({
	suggestions,
	getSuggestionItemProps,
}: {
	suggestions: readonly Suggestion[];
	getSuggestionItemProps: Opts['getSuggestionItemProps'];
}) {
	return (
		<div
			style={{
				marginTop: '-1em',
				paddingTop: '2em',
				paddingBottom: '1em',
				paddingLeft: '1em',
				paddingRight: '1em',
				borderBottomLeftRadius: '0.5em',
				borderBottomRightRadius: '0.5em',
				backgroundColor: 'white',
				maxWidth: '100%',
				textAlign: 'left',
			}}
		>
			{suggestions.map((suggestion) => (
				<div
					{...getSuggestionItemProps(suggestion)}
					style={{
						cursor: 'pointer',
					}}
					key={suggestion.placeId}
				>
					{suggestion.description}
				</div>
			))}
		</div>
	);
}

export default function UIPlacesAutocomplete({
	onSelected,
	placeholder = 'Enter a location',
	disabled = false,
}: {
	onSelected?: (address: string, placeID: string) => void;
	placeholder?: string;
	disabled?: boolean;
}) {
	const [location, setLocation] = useState('');
	const suggestionsRef = useRef<readonly Suggestion[]>([]);
	return (
		<PlacesAutocomplete
			onChange={(location) => {
				setLocation(location);
				if (onSelected) {
					onSelected(null!, null!);
				}
			}}
			onSelect={(address, placeID) => {
				setLocation(address);
				if (onSelected) {
					onSelected(address, placeID);
				}
			}}
			value={location}
		>
			{({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
				if (!loading) {
					suggestionsRef.current = suggestions;
				}
				return (
					<div
						style={{
							width: '100%',
							maxWidth: '100%',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<input
							{...getInputProps({
								style: {
									marginTop: '0.5em',
									padding: '0.5em',
									fontSize: '1.25rem',
									borderRadius: '0.5em',
									border: '0px',
									zIndex: 1,
								},
								placeholder,
							})}
							disabled={disabled}
						/>
						{suggestionsRef.current.length > 0 && (
							<SuggestionsList
								suggestions={suggestionsRef.current}
								getSuggestionItemProps={getSuggestionItemProps}
							/>
						)}
					</div>
				);
			}}
		</PlacesAutocomplete>
	);
}
