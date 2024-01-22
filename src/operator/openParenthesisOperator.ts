import { NodeType, OperatorValue } from 'src/constants';

import type { IOperator } from './baseOperator';
import type { OperatorNode } from '../type';

export class OpenParenthesisOperator implements IOperator {
    makeOperatorNode(): OperatorNode {
        return {
            operator: OperatorValue.OpenParenthesis,
            nodeType: NodeType.Operator,
        };
    }

    calculate(...args) {
        let never: any;
        return never;
    }
}