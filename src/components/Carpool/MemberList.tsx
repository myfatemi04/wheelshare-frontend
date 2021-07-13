import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function MemberList({
	members,
}: {
	members: {
		id: number;
		name: string;
	}[];
}) {
	return (
		<div className="MemberList">
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h3 style={{ marginBlockEnd: '0' }}>Members</h3>
				{members.length > 0 ? (
					<div>
						{members.map((member, index) => {
							return index < 2 ? (
								<div
									className="member"
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									{}
									<AccountCircleIcon />
									<div key={member.id}>{member.name}</div>
								</div>
							) : (
								''
							);
						})}
						{members.length > 2
							? members.length - 2 == 1
								? members.length - 2 + ' other...'
								: members.length - 2 + ' others...'
							: ''}{' '}
					</div>
				) : (
					'This carpool has no members.'
				)}
			</div>
		</div>
	);
}
