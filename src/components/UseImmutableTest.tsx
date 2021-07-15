import useImmutable from './useImmutable';

export default function UseImmutableTest() {
	const [imm] = useImmutable({
		x: 0,
		y: 0,
		z: { a: 1, b: 2, c: [0, 1, 2] },
	});

	return (
		<div>
			{JSON.stringify(imm)}
			Reset button
			<button onClick={() => imm.z.a++}>Increment</button>
			<button onClick={() => imm.z.c.push(imm.z.c.length)}>Push</button>
		</div>
	);
}
