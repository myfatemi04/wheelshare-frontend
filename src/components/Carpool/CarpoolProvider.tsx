import { createContext, ReactNode, useMemo, useState } from 'react';
import * as immutable from 'immutable';
import { useEffect } from 'react';
import { getCarpool } from '../api';

class Member extends immutable.Record({
	id: 0,
	name: '',
}) {}

class Invitation extends immutable.Record({
	user: new Member(),
	isRequest: false,
}) {}

class CarpoolState extends immutable.Record({
	id: 0,
	name: '',
	members: immutable.List<Member>(),
	invitations: immutable.List<Invitation>(),
}) {}

type Subscriber = (state: CarpoolState) => void;

class CarpoolSDK {
	private _state = new CarpoolState();
	get state() {
		return this._state;
	}
	set state(state: CarpoolState) {
		this._state = state;
	}
	private subscribers: Subscriber[] = [];
	subscribe(subscriber: Subscriber) {
		this.subscribers.push(subscriber);
		return () => {
			this.subscribers = this.subscribers.filter((s) => s !== subscriber);
		};
	}
}

export const CarpoolContext = createContext({
	sdk: new CarpoolSDK(),
	carpool: new CarpoolState(),
});

export default function CarpoolProvider({
	id,
	children,
}: {
	id: number;
	children: ReactNode;
}) {
	const [carpool, setCarpool] = useState(new CarpoolState());
	const sdk = useMemo(() => new CarpoolSDK(), []);

	useEffect(() => {
		getCarpool(id).then((carpool) => {});
	}, [id]);

	useEffect(() => {
		const remove = sdk.subscribe(setCarpool);

		return () => remove();
	}, [sdk]);

	return (
		<CarpoolContext.Provider value={{ sdk, carpool }}>
			{children}
		</CarpoolContext.Provider>
	);
}
