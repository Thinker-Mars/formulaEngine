import { Storage } from './storage';
import { Store } from './store';

export function useStore<S = any>(key: string, initialValue?: S): [(pendingValue: S) => void, () => void] {
    const memoizedStore = Storage.get(key);

    if (!memoizedStore) {
        Storage.set(key, new Store<S>(initialValue));
    }

    const newStore = Storage.get(key);

    const setValue = (pendingValue: S) => {
        newStore.setState(pendingValue);
    }

    const destory = () => {
        Storage.delete(key);
    }

    return [setValue, destory];
}

export function useValue<Value = any>(key: string): Value {
    return Storage.get(key)?.state;
}