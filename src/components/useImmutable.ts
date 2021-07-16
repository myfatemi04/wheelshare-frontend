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
	return new Proxy(value, {
		set: (target, property, value) => {
			if (typeof property === 'number') {
				const set = (next: SetStateAction<T>) => {
					const v = typeof next === 'function' ? next(value) : next;
					const edge = createEdge(v, set);
					setValue((v) => [
						...v.slice(0, property),
						edge,
						...v.slice(property + 1),
					]);
				};

				set(value);
			}
			return true;
		},
		// @ts-expect-error
		get: (target, property: keyof PlainJSArray<T>[]) => {
			if (typeof property === 'number') {
				return target[property];
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

	console.log('rerendered useImmutable');

	return [edge, setValue];
}
