import { NodeType, OperatorValue } from 'src/constants';
import { invariant } from 'src/utils';

import type { IOperator } from './baseOperator';
import type { OperatorNode } from '../type';

export class PlusOperator implements IOperator {
    makeOperatorNode(): OperatorNode {
        return {
            operator: OperatorValue.Plus,
            nodeType: NodeType.Operator,
        };
    }

    calculate(...args) {
        invariant(
            (args[0] || []).length !== 0,
            `Missing parameter when calculate: ${OperatorValue.Plus}`
        );

        const input = args[0];

        let result = input[0];
    
        for (let i = 1; i < input.length; i++) {
            result += input[i];
        }

        return {
            nodeType: NodeType.Operand,
			operand: result
        }
    }
}