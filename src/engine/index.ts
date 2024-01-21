import { isFunction } from './utils';

import type { EngineConfig, Engine } from './type';

class EngineImpl implements Engine {
    private config: EngineConfig = {};

    constructor(config?: EngineConfig) {
        const { template = [], globalFunction = [] } = config || {};

        this.config = {
            template: [...template],
            globalFunction: [...globalFunction]
        }
    }

    registerFunction(input: Function) {
        this.config.globalFunction.push(input);
    }

    useFunction(input: Function) {
        if (input instanceof Function) {
            this.registerFunction(input);
        }

        return this;
    }

    useFunctionList(inputList: Function[])  {
        if (Array.isArray(inputList) && inputList.length > 0) {

            inputList.forEach((input) => {

                if (isFunction(input)) {
                    this.registerFunction(input);
                }

            });

        }

        return this;
    };

    getResult: (expression: string, valueList?: { label: string; value: unknown; }[]) => unknown;
}