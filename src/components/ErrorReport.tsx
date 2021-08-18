import { useCallback, useRef, useState } from 'react';
import { sendErrorReport } from './api';
import UIButton from './UI/UIButton';

export default function ErrorReport() {
	const ref = useRef<HTMLTextAreaElement>(null);
	const [status, setStatus] =
		useState<null | 'pending' | 'resolved' | 'rejected'>(null);
	const submit = useCallback(() => {
		const text = ref.current?.value ?? '';
		if (text.length > 0) {
			setStatus('pending');
			sendErrorReport(text)
				.then(() => setStatus('resolved'))
				.catch(() => setStatus('rejected'));
		}
	}, []);
	return (
		<div>
			<h1>Error Report</h1>
			<textarea ref={ref} cols={80} rows={5} />
			{status === 'pending' ? (
				<>Submitting...</>
			) : status === 'resolved' ? (
				<>Submitted!</>
			) : (
				<>
					{status === 'rejected' && <>Failed to submit.</>}
					<UIButton onClick={submit}>Submit</UIButton>
				</>
			)}
		</div>
	);
}
