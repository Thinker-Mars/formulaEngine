import { NodeType, OperatorValue } from 'src/constants';
import { invariant } from 'src/utils';

import type { IOperator } from './baseOperator';
import type { OperatorNode } from '../type';

export class EqualOperator implements IOperator {
    makeOperatorNode(): OperatorNode {
        return {
            operator: OperatorValue.Equal,
            nodeType: NodeType.Operator,
        };
    }

    calculate(...args) {
        invariant(
            false,
            `Can't use ${OperatorValue.Equal}, Did you mean: ${OperatorValue.EqualTo} ?`
        );

        let never: any;
    
        return never;
    }
}