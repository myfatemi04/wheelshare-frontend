import { useEffect, useState } from 'react';

export type UpdateListener<T> = (newValue: StoreValue<T> | null) => void;

export type ValueFetcher<T> = (key: string) => Promise<T | null>;

export type StoreValue<T> = { value: T } | { error: any };

/**
 * This is a general-purpose, subscribable key-value store for content like posts, groups, and spaces.
 */
export class Store<T> {
	/**
	 * Stores the internal data. If the value is `null`, then we attempted to fetch the data, but it did not exist.
	 */
	private data = new Map<string, StoreValue<T> | null>();
	private listeners = new Map<string, Set<UpdateListener<T>>>();

	constructor(private fetcher: ValueFetcher<T>) {}

	/**
	 *
	 * @param key The key to get the data for
	 * @param forceRefresh If the data already exists, fetch it again anyway
	 */
	get(key: string, forceRefresh = false): StoreValue<T> | null {
		if (!this.data.has(key) || forceRefresh) {
			this.fetcher(key)
				.then((value) => {
					this.set(key, value ? { value } : null);
				})
				.catch((error) => {
					this.set(key, { error });
				});

			return null;
		}

		return this.data.get(key) ?? null;
	}

	set(key: string, value: StoreValue<T> | null) {
		if (this.listeners.has(key)) {
			this.listeners.get(key)?.forEach((callback) => {
				callback(value);
			});
		}

		return this.data.set(key, value);
	}

	subscribe(key: string, listener: UpdateListener<T>) {
		if (!this.listeners.has(key)) {
			this.listeners.set(key, new Set());
		}

		this.listeners.get(key)?.add(listener);
	}

	unsubscribe(key: string, listener: UpdateListener<T>) {
		if (this.listeners.has(key)) {
			if (this.listeners.get(key)?.has(listener)) {
				this.listeners.get(key)?.delete(listener);
				return;
			}
		}

		console.warn(
			'Unsubscribed from',
			key,
			'but listener does not exist: ',
			listener
		);
	}
}

export function useStoredValue<T>(store: Store<T>, key: string) {
	const [value, setValue] = useState<StoreValue<T> | null>(store.get(key));

	useEffect(() => {
		const callback = (value: StoreValue<T> | null) => setValue(value);
		store.subscribe(key, callback);

		return () => store.unsubscribe(key, callback);
	}, [key, store]);

	return value;
}
