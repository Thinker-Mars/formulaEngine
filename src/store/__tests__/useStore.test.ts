import { useStore, useValue } from '../index';

describe('useStore', () => {
    it('should get correct value', () => {
        const key = 'key';
        const initialValue = [1, 2, 3];

        const [, destory] = useStore(key, initialValue);
        const value = useValue(key);

        expect(value).toEqual(initialValue);

        destory();
    });

    it('should set correct value', () => {
        const key = 'key';
        const updateValue = [1, 2, 3];

        const [setValue, destory] = useStore(key, []);

        setValue(updateValue);

        const value = useValue(key);

        expect(value).toEqual(updateValue);

        destory();
    });

    it('should get undefined if not initialize', () => {
        const value = useValue('key');

        expect(value).toBe(undefined);
    });
});