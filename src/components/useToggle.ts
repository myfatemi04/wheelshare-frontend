import { useCallback, useState } from 'react';

export default function useToggle(initial: boolean) {
	const [value, setValue] = useState(initial);
	const toggle = useCallback(() => setValue((v) => !v), []);
	return [value, toggle] as const;
}
