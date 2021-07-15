import { useCallback, useContext } from 'react';
import { lightgrey } from '../../lib/colors';
import { generateCode, resetCode } from '../api';
import UIButton from '../UI/UIButton';
import { GroupContext } from './Group';

export default function GroupInviteCodeGenerator() {
	const { group } = useContext(GroupContext);

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
				<span>
					Join this group with the code{' '}
					<b>
						<code>{group.joinCode}</code>
					</b>
				</span>
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
				</div>
			</>
		);
	} else {
		return (
			<>
				This group has no way for new members to join.
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
			</>
		);
	}
}
