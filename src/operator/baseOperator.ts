import type { OperatorNode, OperandNode } from '../type';

export interface IOperator {
    /**
     * 构造操作符节点
     */
    makeOperatorNode: () => OperatorNode;
    /**
     * 计算结果
     * @param args 输入参数
     */
    calculate: (...args) => OperandNode;
}