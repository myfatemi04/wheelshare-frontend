import GroupCreator from './GroupCreator';
import useToggle from '../useToggle';

export default function GroupCreatorLink() {
	const [open, toggle] = useToggle(false);

	return (
		<div style={{ width: '100%', textAlign: 'center' }}>
			<div
				style={{
					cursor: 'pointer',
					userSelect: 'none',
				}}
				onClick={toggle}
			>
				Create Group
			</div>
			{open && (
				<>
					<br />
					<GroupCreator />
				</>
			)}
		</div>
	);
}
