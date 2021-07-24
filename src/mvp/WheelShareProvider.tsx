import { useDebugValue } from 'react';
import { useEffect } from 'react';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Event } from './types';
import WheelShareContext from './WheelShareContext';

const getToken = () => localStorage.getItem('token');
const requestedEventUrl = window.location.pathname.slice(1);

export default function WheelShareProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [event, setEvent] = useState<Event | null>(null);

	const fetchEvent = useCallback(async function fetchEvent() {
		const res = await fetch('//localhost:5000/events/' + requestedEventUrl, {
			headers: { Authorization: 'Bearer ' + getToken() },
		});
		const json = await res.json();
		const { status, event } = json;
		if (status !== 'success') {
			console.error({ json });
			setEvent(null);
			localStorage.removeItem('token');
			window.location.reload();
		} else {
			setEvent(event);
		}
	}, []);

	useEffect(() => {
		const token = getToken();

		if (!token) {
			return;
		}

		fetchEvent();
	}, [fetchEvent]);

	const signup = useCallback(
		async (email: string, password: string, name: string) => {
			const result = await fetch(
				`//localhost:5000/events/${requestedEventUrl}/signup`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name,
						email,
						password,
					}),
				}
			);

			if (result.status !== 200) {
				throw new Error(`Failed to signup: ${result.status}`);
			}

			const { token } = await result.json();

			localStorage.setItem('token', token);

			window.location.reload();
		},
		[]
	);

	const signin = useCallback(async (email: string, password: string) => {
		const result = await fetch(
			`//localhost:5000/events/${requestedEventUrl}/signin`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					password,
				}),
			}
		);

		if (result.status !== 200) {
			throw new Error(`Failed to signup: ${result.status}`);
		}

		const { token } = await result.json();

		localStorage.setItem('token', token);

		console.log(result);

		window.location.reload();
	}, []);

	const joinEvent = useCallback(
		async (placeId: string) => {
			const result = await fetch(
				`//localhost:5000/events/${requestedEventUrl}/join`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${getToken()}`,
					},
					body: JSON.stringify({
						placeId,
					}),
				}
			);
			if (result.status !== 200) {
				throw new Error(`Failed to join event: ${result.status}`);
			}

			await fetchEvent();
		},
		[fetchEvent]
	);

	const createEvent = useCallback(
		async (
			name: string,
			startTime: Date,
			endTime: Date,
			moderatorCode: string,
			placeId: string
		) => {
			const result = await fetch(`//localhost:5000/events`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					startTime,
					endTime,
					moderatorCode,
					placeId,
				}),
			});

			if (result.status !== 200) {
				throw new Error(`Failed to create event: ${result.status}`);
			}

			const { eventId, token } = await result.json();

			localStorage.setItem('token', token);

			return { eventId };
		},
		[]
	);

	const setDriving = useCallback(
		async (driving: boolean) => {
			const result = await fetch(
				`//localhost:5000/events/${requestedEventUrl}/set_driving`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${getToken()}`,
					},
					body: JSON.stringify({
						driving,
					}),
				}
			);
			if (result.status !== 200) {
				throw new Error(`Failed to join event: ${result.status}`);
			}

			await fetchEvent();
		},
		[fetchEvent]
	);

	const value = useMemo(
		() => ({
			api: {
				signup,
				signin,
				joinEvent,
				createEvent,
				setDriving,
			},
			event,
			authenticated: !!getToken(),
		}),
		[createEvent, event, joinEvent, setDriving, signin, signup]
	);

	useDebugValue(value);

	return (
		<WheelShareContext.Provider value={value}>
			{children}
		</WheelShareContext.Provider>
	);
}
