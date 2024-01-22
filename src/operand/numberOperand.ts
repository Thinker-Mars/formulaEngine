import { NodeType } from 'src/constants';
import { IOperand } from './baseOperand';

import type { OperandNode } from 'src/type';

export class NumberOperand implements IOperand {
	private reg = /^[0-9]*$/;

	expect(input) {
		return this.reg.test(input);
	}

	makeOperandNode(input: string): OperandNode<number> {
		return {
			nodeType: NodeType.Operand,
			operand: Number(input)
		}
	}
}