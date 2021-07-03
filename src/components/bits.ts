export function setBit(n: number, idx: number, active: boolean) {
	if (idx < 1 || idx > 7 || !isFinite(idx)) {
		throw new Error('invalid idx. idx must be from 1 - 7.');
	}

	const mask = 0b1000_0000 >> idx;

	if (active) {
		return n | mask;
	} else {
		return n & ~mask;
	}
}

export function toggleBit(n: number, idx: number) {
	if (idx < 1 || idx > 7 || !isFinite(idx)) {
		throw new Error('invalid idx. idx must be from 1 - 7.');
	}

	const mask = 0b1000_0000 >> idx;

	return n ^ mask;
}
