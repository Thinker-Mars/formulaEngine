import type { Store } from './store';

type Stores = {
    [key: string]: Store
}

export class Storage {
    static stores: Stores = {};

    static set(key: string, value: Store) {
        const store = Storage.stores[key];

        if (!store) {
            Storage.stores[key] = value;
        }
    }

    static get<S = any>(key: string): Store<S> {
        return Storage.stores[key];
    }

    static delete(key: string) {
        delete Storage.stores[key];
    }
}