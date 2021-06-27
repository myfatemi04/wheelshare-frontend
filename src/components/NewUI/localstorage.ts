const KEY = 'ws.addresslist';

interface Address {
	placeId: string;
	formattedAddress: string;
	latitude: string;
	longitude: string;
}

type AddressBook = Map<string, Address>;

function load(): AddressBook {
	const string = localStorage.getItem(KEY);
	if (string) {
		const object = JSON.parse(string);
		const map = new Map<string, Address>(Object.entries(object));
		return map;
	}
	localStorage.setItem(KEY, '{}');
	return new Map();
}

function save(map: AddressBook) {
	const object = Object.fromEntries(map);
	const string = JSON.stringify(object);
	localStorage.setItem(KEY, string);
}

class LocalStorageManager {
	private internalValue: AddressBook;
	constructor(capacity = 5) {
		this.internalValue = load();
	}
	addAddress(address: Address) {
		this.internalValue.set(address.placeId, address);
		save(this.internalValue);
	}
	getAddresses() {
		return Object.values(this.internalValue);
	}
}

const WheelshareLocalStorage = new LocalStorageManager();

export default WheelshareLocalStorage;
