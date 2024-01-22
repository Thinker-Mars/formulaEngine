import type { OperandNode } from 'src/type';

export interface IOperand {
    /**
	 * 是否命中操作数
	 * @param input 原始输入
	 * @returns true表示命中
	 */
    expect?: (input: string) => boolean;
    /**
     * 构造操作数节点
     * @param input 原始输入
     */
    makeOperandNode: (input: string) => OperandNode;
}