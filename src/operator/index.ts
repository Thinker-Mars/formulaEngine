import { DivideOperator } from './divideOperator';
import { EqualOperator } from './equalOperator';
import { EqualToOperator } from './equalToOperator';
import { GreaterThanOperator } from './greaterThanOperator';
import { GreaterThanOrEqualToOperator } from './greaterThanOrEqualToOperator';
import { LessThanOperator } from './lessThanOperator';
import { LessThanOrEqualToOperator } from './lessThanOrEqualToOperator';
import { LogicANDOperator } from './logicANDOperator';
import { LogicOROperator } from './logicOROperator';
import { MinusOperator } from './minusOperator';
import { MultiplyOperator } from './multiplyOperator';
import { NotEqualToOperator } from './notEqualToOperator';
import { PlusOperator } from './plusOperator';
import { OpenParenthesisOperator } from './openParenthesisOperator';

import { OperatorValue, OperatorSymbol, OperatorValuePrecedence } from 'src/constants';
import { invariant } from 'src/utils';

import type { IOperator } from './baseOperator';

export class Operator {
    private static operatorMap = new Map<OperatorValue, IOperator>([
        [OperatorValue.Divide, new DivideOperator()],
        [OperatorValue.Equal, new EqualOperator()],
        [OperatorValue.EqualTo, new EqualToOperator()],
        [OperatorValue.GreaterThan, new GreaterThanOperator()],
        [OperatorValue.GreaterThanOrEqualTo, new GreaterThanOrEqualToOperator()],
        [OperatorValue.LessThan, new LessThanOperator()],
        [OperatorValue.LessThanOrEqualTo, new LessThanOrEqualToOperator()],
        [OperatorValue.LogicAND, new LogicANDOperator()],
        [OperatorValue.LogicOR, new LogicOROperator()],
        [OperatorValue.Minus, new MinusOperator()],
        [OperatorValue.Multiply, new MultiplyOperator()],
        [OperatorValue.NotEqualTo, new NotEqualToOperator()],
        [OperatorValue.Plus, new PlusOperator()],
        [OperatorValue.OpenParenthesis, new OpenParenthesisOperator()]
    ]);

    static isOperator(input: string) {
        return OperatorSymbol.includes(input as OperatorValue);
    }

    static makeOperatorNode(input: string) {
        const operator = this.operatorMap.get(input as OperatorValue);

        return operator.makeOperatorNode();
    }

    /**
     * 比较操作符的优先级
     * @param beforeOperator 左侧操作符
     * @param afterOperator 右侧操作符
     * @returns true表示左侧操作符的优先级小于右侧操作符的优先级
     */
    static comparePrecedence(beforeOperator: OperatorValue, afterOperator: OperatorValue) {
        const beforePrecedence = OperatorValuePrecedence.get(beforeOperator);
        const afterPrecedence = OperatorValuePrecedence.get(afterOperator);

        invariant(
            beforePrecedence !== undefined,
            `Precedence is not defined: ${beforeOperator}`
        );

        invariant(
            afterPrecedence !== undefined,
            `Precedence is not defined: ${afterOperator}`
        );

        return beforePrecedence - afterPrecedence <= 0;
    }

    static calculate(operator: OperatorValue, ...args) {
        return this.operatorMap.get(operator).calculate(...args);
    }
}