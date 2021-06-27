class LRUCache<K, V> {
	private cap: number;
	private map: Map<K, V>;
	constructor(capacity: number) {
		this.cap = capacity;
		this.map = new Map();
	}
	set(key: K, value: V) {
		this.map.delete(key);
		this.map.set(key, value);

		if (this.map.size > this.cap) {
			const next = this.map.keys().next();
			if (!next.done) this.map.delete(next.value);
		}
	}
	get(key: K) {
		var value = this.map.get(key);

		if (value != null) {
			this.map.delete(key);
			this.map.set(key, value);
		}

		return value;
	}
	has(key: K) {
		return this.map.has(key);
	}
	delete(key: K) {
		this.map.delete(key);
	}
	size() {
		return this.map.size;
	}
	capacity() {
		return this.cap - this.map.size;
	}
	clear() {
		this.map.clear();
	}
}

export function create(capacity: number) {
	return new LRUCache(capacity);
}
