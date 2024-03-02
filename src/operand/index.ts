import { QuotationOperand } from './quotationOperand';
import { NumberOperand } from './numberOperand';
import { LiteExpressionOperand } from './liteExpression';

import type { IOperand } from './baseOperand';
import type { BaseNode } from '../type';

class Operand {
    private static operandList: IOperand[] = [
        new QuotationOperand(),
        new NumberOperand(),
        new LiteExpressionOperand()
    ];

    static makeOperandNode(input: string) {
        let operandNode: BaseNode;
        let match = false;

        for (const operand of this.operandList) {
            match = operand.expect(input);

            if (match) {
                operandNode = operand.makeOperandNode(input);
                break;
            }
        }

        return operandNode;
    }
}

export { Operand };