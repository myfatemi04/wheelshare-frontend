export default function UIDialogShell({
	children,
	onClose,
}: {
	children: React.ReactNode;
	onClose: () => void;
}) {
	return (
		<div
			style={{
				position: 'fixed',
				zIndex: 100,
				inset: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onClick={onClose}
		>
			{children}
		</div>
	);
}
