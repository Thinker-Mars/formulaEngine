import type { NodeType, OperatorValue } from './constants';

export type ValueList = {
    /**
     * 模板的名称
     */
    label: string;
    /**
     * 模板的值
     */
    value: unknown;
}[];

export interface BaseNode {
    /**
     * 节点类型
     */
    nodeType: NodeType;
}

/**
 * 操作符节点
 */
export interface OperatorNode extends BaseNode {
    /**
     * 操作符
     */
    operator: OperatorValue;
}

/**
 * 操作数节点
 */
export interface OperandNode<ValueType = any> extends BaseNode {
    /**
     * 操作数的值
     */
    operand: ValueType;
}
export interface LiteOperandNode extends OperandNode {
    /**
     * 这个节点的后缀表达式
     */
    stack: BaseNode[];
}

export type GetResultConfig = {
    /**
     * 模板值列表
     */
    valueList?: ValueList;
    /**
     * 计算使用布尔值
     */
    useBoolean?: boolean;
}

export interface Engine {
    /**
     * 根据表达式计算结果
     * @param expression 表达式
     * @param config 相关配置
     */
    getResult: (expression: string, config?: GetResultConfig) => unknown;

}