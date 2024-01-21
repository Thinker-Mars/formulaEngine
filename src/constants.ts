/**
 * 所有操作符
 */
export enum Operator {
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

/**
 * 操作符优先级
 */
export const OperatorPrecedence = new Map([
	[Operator.OpenParenthesis, 0],  
    [Operator.Comma, 1],
	[Operator.LogicOR, 4],
	[Operator.LogicAND, 5],
	[Operator.OR, 6],
	[Operator.AND, 8],
	[Operator.EqualTo, 9],
	[Operator.NotEqualTo, 9],
	[Operator.GreaterThan, 10],
	[Operator.LessThan, 10],
	[Operator.GreaterThanOrEqualTo, 10],
	[Operator.LessThanOrEqualTo, 10],
	[Operator.Plus, 12],
	[Operator.Minus, 12],
	[Operator.Multiply, 13],
	[Operator.Divide, 13],
	[Operator.CloseParenthesis, 9999]
]);