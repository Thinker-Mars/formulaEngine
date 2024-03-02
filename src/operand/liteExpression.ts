import { NodeType } from 'src/constants';
import { IOperand } from './baseOperand';

import type { LiteOperandNode } from '../type';

export class LiteExpressionOperand implements IOperand {
	private reg: RegExp = /^\${.*}$/;

	expect(input: string) {
		return this.reg.test(input);
	};

	makeOperandNode(input: string): LiteOperandNode {
		return {
			nodeType: NodeType.LiteOperand,
			operand: input,
			stack: []
		}
	}
}