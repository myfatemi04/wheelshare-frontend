import useImmutable from './useImmutable';

export default function UseImmutableTest() {
	const [imm] = useImmutable({
		index: 0,
		array: [{ count: 0 }, { count: 1 }, { count: 2 }],
	});

	return (
		<div>
			{JSON.stringify(imm)}
			<br />
			<button onClick={() => imm.index--}>Previous</button>
			<button onClick={() => imm.index++}>Next</button>
			<button onClick={() => imm.array[imm.index].count++}>Increment</button>
			<button onClick={() => imm.array[imm.index].count--}>Decrement</button>
		</div>
	);
}
