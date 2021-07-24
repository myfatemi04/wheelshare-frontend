import { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { lightgrey } from '../../lib/colors';
import UIButton from '../UI/UIButton';
import { CarpoolContext } from './Carpool';

function RequestRow({ user }: { user: { id: number; name: string } }) {
	const { acceptRequest, denyRequest } = useContext(CarpoolContext);
	const [pending, setPending] = useState(false);

	const acceptCallback = useCallback(() => {
		if (pending) {
			return;
		}
		setPending(true);
		acceptRequest(user.id)
			.catch(console.error)
			.finally(() => setPending(false));
	}, [acceptRequest, pending, user.id]);

	const denyCallback = useCallback(() => {
		if (pending) {
			return;
		}
		setPending(true);
		denyRequest(user.id)
			.catch(console.error)
			.finally(() => setPending(false));
	}, [denyRequest, pending, user.id]);

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ flex: 2 }}>{user.name}</div>

			<div style={{ flex: 1 }}>
				<UIButton
					onClick={acceptCallback}
					style={{ backgroundColor: lightgrey, padding: '0.5rem' }}
				>
					Accept
				</UIButton>
			</div>

			<div style={{ flex: 1 }}>
				<UIButton
					onClick={denyCallback}
					style={{ backgroundColor: lightgrey, padding: '0.5rem' }}
				>
					Decline
				</UIButton>
			</div>
		</div>
	);
}

export default function RequestList() {
	const { carpool } = useContext(CarpoolContext);
	const requestingUsers = useMemo(() => {
		return Object.keys(carpool.invitations)
			.filter((key) => carpool.invitations[key as unknown as number].isRequest)
			.map((key) => carpool.invitations[key as unknown as number].user);
	}, [carpool.invitations]);

	return (
		<>
			<h1>Requests</h1>
			{requestingUsers.length > 0 ? (
				requestingUsers.map((user) => <RequestRow key={user.id} user={user} />)
			) : (
				<>Nobody's requested to join yet</>
			)}
			<br />
			<br />
		</>
	);
}
