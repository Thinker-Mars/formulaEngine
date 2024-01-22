/**
 * 所有操作符
 */
export enum OperatorValue {
	OpenParenthesis = '(',
	CloseParenthesis = ')',
    Comma = ',',
	Plus = '+',
	Minus = '-',
	Multiply = '*',
	Divide = '/',
	Equal = '=',
	AND = '&',
	OR = '|',
	GreaterThan = '>',
	LessThan = '<',
	EqualTo = '==',
	NotEqualTo = '!=',
	GreaterThanOrEqualTo = '>=',
	LessThanOrEqualTo = '<=',
	LogicAND = '&&',
	LogicOR = '||'
}

export const OperatorSymbol = Object.values(OperatorValue);

/**
 * 操作数类型
 */
export enum OperandValue {
	/**
	 * 表达式
	 */
	LiteExpression = 'LiteExpression',
	/**
	 * 单/双引号
	 */
	Quotation = 'Quotation',
	/**
	 * 数字
	 */
	Number = 'Number',
	/**
	 * 布尔值
	 */
	Boolean = 'Boolean'
}

/**
 * 操作符优先级
 */
export const OperatorValuePrecedence = new Map([
	[OperatorValue.OpenParenthesis, 0],
    [OperatorValue.Comma, 1],
	[OperatorValue.LogicOR, 4],
	[OperatorValue.LogicAND, 5],
	[OperatorValue.OR, 6],
	[OperatorValue.AND, 8],
	[OperatorValue.EqualTo, 9],
	[OperatorValue.NotEqualTo, 9],
	[OperatorValue.GreaterThan, 10],
	[OperatorValue.LessThan, 10],
	[OperatorValue.GreaterThanOrEqualTo, 10],
	[OperatorValue.LessThanOrEqualTo, 10],
	[OperatorValue.Plus, 12],
	[OperatorValue.Minus, 12],
	[OperatorValue.Multiply, 13],
	[OperatorValue.Divide, 13],
	[OperatorValue.CloseParenthesis, 9999]
]);

export enum NodeType {
	/**
	 * 操作符
	 */
	Operator = 'Operator',
	/**
	 * 普通操作数
	 */
	Operand = 'Operand',
	/**
	 * 表达式操作数
	 */
	LiteOperand = 'LiteOperand'
}

export enum StoreKey {
	/**
	 * 模板字段值列表
	 */
	ValueList = 'ValueList',
	/**
	 * 计算结果使用布尔值
	 */
	UseBoolean = 'UseBoolean'
}