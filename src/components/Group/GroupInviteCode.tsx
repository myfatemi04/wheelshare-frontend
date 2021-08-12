import { useMemo } from 'react';
import { useCallback, useContext, useState } from 'react';
import { lightgrey } from '../../lib/colors';
import { generateCode, resetCode } from '../api';
import { useMe } from '../hooks';
import UIButton from '../UI/UIButton';
import { GroupContext } from './Group';

export default function GroupInviteCode() {
	const { group } = useContext(GroupContext);

	const me = useMe();

	const isAdmin = useMemo(
		() => group.admins.some((a) => a.id === me?.id),
		[group.admins, me?.id]
	);

	const [shown, setShown] = useState(false);

	const generateJoinCode = useCallback(() => {
		generateCode(group.id).then((code) => {
			group.joinCode = code;
		});
	}, [group]);

	const resetJoinCode = useCallback(() => {
		resetCode(group.id).then((code) => {
			group.joinCode = null;
		});
	}, [group]);

	if (group.joinCode) {
		return (
			<>
				<span style={{ userSelect: 'none' }}>
					Join this group with the code{' '}
					<code
						style={{ userSelect: 'text' }}
						onClick={() => setShown((shown) => !shown)}
					>
						{shown ? group.joinCode : 'XXXXXX'}
					</code>{' '}
					(click to show/hide)
				</span>
				{isAdmin && (
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<UIButton
							onClick={resetJoinCode}
							style={{
								backgroundColor: lightgrey,
								margin: '0.5rem',
								flex: 1,
							}}
						>
							Reset
						</UIButton>
						<UIButton
							onClick={generateJoinCode}
							style={{
								backgroundColor: lightgrey,
								margin: '0.5rem',
								flex: 1,
							}}
						>
							Regenerate
						</UIButton>
						<UIButton onClick={() => {navigator.clipboard.writeText("https://www.wheelshare.app/join/"+group.joinCode)}} style={{
								backgroundColor: lightgrey,
								margin: '0.5rem',
								flex: 1,
							}}>
							Copy Link
						</UIButton>
					</div>
				)}
			</>
		);
	} else {
		return (
			<>
				This group has no way for new members to join.
				{isAdmin ? (
					<UIButton
						onClick={generateJoinCode}
						style={{
							backgroundColor: lightgrey,
							marginTop: '0.5rem',
							marginBottom: '0.5rem',
						}}
					>
						Generate a code
					</UIButton>
				) : (
					'Contact an admin to create a code'
				)}
			</>
		);
	}
}
