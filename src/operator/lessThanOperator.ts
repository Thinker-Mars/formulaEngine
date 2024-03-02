import { NodeType, OperatorValue } from 'src/constants';
import { invariant } from 'src/utils';

import type { IOperator } from './baseOperator';
import type { OperatorNode } from '../type';

export class LessThanOperator implements IOperator {
    makeOperatorNode(): OperatorNode {
        return {
            operator: OperatorValue.LessThan,
            nodeType: NodeType.Operator,
        };
    }

    calculate(...args) {
        invariant(
            (args[0] || []).length === 2,
            `Missing parameter when calculate: ${OperatorValue.LessThan}`
        );
    
        const [left, right] = args[0];

        return {
            nodeType: NodeType.Operand,
			operand: left < right
        }
    }
}