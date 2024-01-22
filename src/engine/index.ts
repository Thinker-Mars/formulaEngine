import { invariant } from 'src/utils';
import { useStore, useValue } from 'src/store/index';
import { StoreKey } from 'src/constants';
import { getReversePolishNotation, calculateReversePolishNotation } from 'src/reversePolishNotation';

import type { Engine, GetResultConfig } from 'src/type';

class EngineImpl implements Engine {
    private reset() {
        const [, destoryValueList] = useStore(StoreKey.ValueList);
        const [, destoryUseBoolean] = useStore(StoreKey.UseBoolean);

        destoryValueList();
        destoryUseBoolean();
    }

    getResult(expression: string, config?: GetResultConfig) {
        invariant(!!expression, 'Invalid expression');

        try {
            
            if (config && typeof config === 'object') {
                const { valueList, useBoolean = false } = config;

                if (valueList && valueList.length > 0) {
                    useStore(StoreKey.ValueList, valueList);
                }

                if (useBoolean) {
                    useStore(StoreKey.UseBoolean, useBoolean);
                }
            }

            return calculateReversePolishNotation(getReversePolishNotation(expression));

        } catch (error) {
            const useBoolean = useValue<boolean>(StoreKey.UseBoolean);

            console.error(error);

            this.reset();

            if (useBoolean) {
                return false;
            }

            return null;
        }
    }
}

export { EngineImpl as FormulaEngine };