import { Dispatch, SetStateAction, useMemo, useState } from 'react';

type Primitive = bigint | boolean | null | number | string | symbol | undefined;

type PlainJS = Primitive | PlainJSObject | PlainJSArray;

interface PlainJSObject {
	[key: string]: PlainJS;
}

interface PlainJSArray<Item extends PlainJS = PlainJS> extends Array<Item> {}

function createEdgeForObject<T extends PlainJSObject>(
	value: T,
	setValue: Dispatch<SetStateAction<T>>
): T {
	// @ts-ignore
	const edges: Record<keyof T, any> = {};

	return new Proxy(value, {
		set: (target, property, value) => {
			setValue((v) => ({ ...v, [property]: value }));

			return true;
		},
		// @ts-expect-error
		get: (target, property: keyof T) => {
			if (property in edges) {
				// @ts-ignore
				return edges[property];
			}

			const keyValue = target[property];
			const set = (next: SetStateAction<typeof keyValue>) => {
				const v = typeof next === 'function' ? next(keyValue) : next;
				setValue((value) => ({ ...value, [property]: v }));
			};

			const edge = createEdge(keyValue, set);
			edges[property] = edge;
			return edge;
		},
		deleteProperty: (target, property) => {
			setValue((v) => {
				const newValue = { ...v };
				// @ts-ignore
				delete newValue[property];
				return newValue;
			});

			return true;
		},
	});
}

const inPlaceArrayOperations = [
	'fill',
	'reverse',
	'push',
	'pop',
	'shift',
	'unshift',
];

function createEdgeForArray<T extends PlainJS>(
	value: PlainJSArray<T>,
	setValue: Dispatch<SetStateAction<PlainJSArray<T>>>
) {
	const edges = {} as Record<number, T>;

	const set = (property: number, next: SetStateAction<T>) => {
		const current = value[property];
		const nextValue = typeof next === 'function' ? next(current) : next;
		setValue((value) => [
			...value.slice(0, property),
			nextValue,
			...value.slice(property + 1),
		]);
	};

	return new Proxy(value, {
		set: (target, property, value) => {
			if (typeof property === 'number') {
				set(property, value);
			}
			return true;
		},
		// @ts-expect-error
		get: (target, property: keyof PlainJSArray<T>[]) => {
			if (
				typeof property === 'number' ||
				(typeof property === 'string' && /\d+/.test(property))
			) {
				property = +property;
				if (property in edges) {
					return edges[property];
				}

				const item = target[property];
				const setThis = set.bind(null, property);
				const edge = createEdge(item, setThis);
				edges[property] = edge;
				return edge;
			} else {
				// @ts-ignore
				if (inPlaceArrayOperations.includes(property)) {
					return function () {
						const newValue = [...value];
						const method = newValue[property];
						// @ts-expect-error
						const result = method.apply(newValue, arguments);
						setValue(newValue);
						return result;
					};
				} else if (typeof target[property] === 'function') {
					return function () {
						// @ts-ignore
						return target[property].apply(target, arguments);
					};
				}

				return target[property];
			}
		},
	});
}

function createEdge<T extends PlainJS>(
	value: T,
	setValue: Dispatch<SetStateAction<T>>
): T {
	if (Array.isArray(value)) {
		// @ts-expect-error
		return createEdgeForArray(value, setValue) as T;
	} else if (typeof value === 'object' && value !== null) {
		// @ts-expect-error
		return createEdgeForObject(value, setValue) as T;
	} else {
		return value;
	}
}

export default function useImmutable<T extends PlainJS>(
	initial: T
): [T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState(initial);

	const edge = useMemo(() => createEdge(value, setValue), [value]);

	return [edge, setValue];
}
