import { Store } from '../store';

describe('Store', () => {
    it('should get correct value', () => {
        const initialValue = 1;

        const store = new Store(initialValue);

        expect(store.state).toBe(initialValue);
    });

    it('should set correct value', () => {
        const initialValue = 1;
        const updateValue = 2;

        const store = new Store(initialValue);
        store.setState(updateValue);

        expect(store.state).toBe(updateValue);
    });
});