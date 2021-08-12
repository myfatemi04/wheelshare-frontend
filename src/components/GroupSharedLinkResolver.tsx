import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { joinGroup, resolveCode } from './api';
import { GroupPreview } from './GroupJoinerLink';
import UIButton from './UI/UIButton';
import UILink from './UI/UILink';

export default function GroupSharedLinkResolver() {
	const { code } = useParams<{ code: string }>();
	const [group, setGroup] = useState<GroupPreview>();
	const [resolving, setResolving] = useState(false);
	const [joining, setJoining] = useState(false);

	useEffect(() => {
		setResolving(true);
		resolveCode(code)
			.then(setGroup)
			.finally(() => setResolving(false));
	}, [code]);

	const join = useCallback(() => {
		const id = group?.id;
		if (code && id) {
			console.log('Joining a group with the code', code);
			setJoining(true);
			joinGroup(id, code)
				.then(({ status }) => {
					if (status === 'success') {
						window.location.href = '/groups/' + id;
					}
				})
				.finally(() => setJoining(false));
		}
	}, [code, group?.id]);

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			{resolving ? (
				<h1>Searching for group...</h1>
			) : !group ? (
				<h1>No group found</h1>
			) : (
				<>
					<h2>{group.name}</h2>
					{joining ? (
						'Joining...'
					) : (
						<UIButton
							onClick={join}
							style={{
								backgroundColor: '#f3f3f3',
								width: '10ch',
								textAlign: 'center',
							}}
						>
							Join
						</UIButton>
					)}
				</>
			)}
			<br />
			<UILink href="/">Home</UILink>
		</div>
	);
}
