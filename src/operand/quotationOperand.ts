import { NodeType } from 'src/constants';
import { IOperand } from './baseOperand';

import type { OperandNode } from '../type';

export class QuotationOperand implements IOperand {
	private reg: RegExp = /^['|"].*['|"]$/;

	expect(input: string) {
		return this.reg.test(input);
	};

	trim(input: string) {
		return input.replace(/("|')/g, '');
	}

	makeOperandNode(input: string): OperandNode<string> {
		return {
			nodeType: NodeType.Operand,
			operand: this.trim(input)
		}
	}
}