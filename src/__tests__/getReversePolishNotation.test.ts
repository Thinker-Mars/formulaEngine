import { NodeType, OperatorValue } from 'src/constants';
import { getReversePolishNotation } from 'src/reversePolishNotation';

describe('Get Currect Reverse Polish Notation', () => {
    it('should handle normal expression', () => {
        const expression = '2 * 5 > 0';

        const result = [
            {
                nodeType: NodeType.Operand,
                operand: 2
            },
            {
                nodeType: NodeType.Operand,
                operand: 5
            },
            {
                operator: OperatorValue.Multiply,
                nodeType: NodeType.Operator,
            },
            {
                nodeType: NodeType.Operand,
                operand: 0
            },
            {
                operator: OperatorValue.GreaterThan,
                nodeType: NodeType.Operator,
            }
        ];

        expect(getReversePolishNotation(expression)).toEqual(result);
    });

    it('should handle lite expression', () => {
        const expression = '${报工.良品数} > 10';

        const result = [
            {
                nodeType: NodeType.LiteOperand,
                operand: '${报工.良品数}',
                stack: [
                    {
                        nodeType: NodeType.Operand,
                        operand: 10
                    },
                    {
                        operator: OperatorValue.GreaterThan,
                        nodeType: NodeType.Operator,
                    }
                ]
            }
        ];

        expect(getReversePolishNotation(expression)).toEqual(result);
    });

    it('should handle complex lite expression', () => {
        const expression = '(${报工.良品数} * 2 - ${报工.不良品数} > 0) && (${报工.字段1} != 0)';

        const result = [
            {
                nodeType: NodeType.LiteOperand,
                operand: '${报工.良品数}',
                stack: [
                    {
                        nodeType: NodeType.Operand,
                        operand: 2
                    },
                    {
                        operator: OperatorValue.Multiply,
                        nodeType: NodeType.Operator,
                    }
                ]
            },
            {
                nodeType: NodeType.LiteOperand,
                operand: '${报工.不良品数}',
                stack: []
            },
            {
                operator: OperatorValue.Minus,
                nodeType: NodeType.Operator,
            },
            {
                nodeType: NodeType.Operand,
                operand: 0
            },
            {
                operator: OperatorValue.GreaterThan,
                nodeType: NodeType.Operator,
            },
            {
                nodeType: NodeType.LiteOperand,
                operand: '${报工.字段1}',
                stack: [
                    {
                        nodeType: NodeType.Operand,
                        operand: 0
                    },
                    {
                        operator: OperatorValue.NotEqualTo,
                        nodeType: NodeType.Operator,
                    }
                ]
            },
            {
                operator: OperatorValue.LogicAND,
                nodeType: NodeType.Operator,
            }
        ];

        expect(getReversePolishNotation(expression)).toEqual(result);
    })
});