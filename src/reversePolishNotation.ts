import { Operand } from './operand/index';
import { Operator } from './operator/index';
import { useStore, useValue } from './store/index';
import { OperatorValue, StoreKey, NodeType } from './constants';
import { replaceBlank, reachInputEnd, invariant } from './utils';

import type { BaseNode, OperatorNode, OperandNode, LiteOperandNode, ValueList } from './type';

const handleLiteOperand = (liteOperandNode: LiteOperandNode, operandStack: BaseNode[], operatorStack: OperatorNode[]) => {
    if (operandStack.length === 0) {
        operandStack.push(liteOperandNode);

        return;
    }

    const lastOperandNode = operandStack[operandStack.length - 1];

    if (lastOperandNode.nodeType === NodeType.Operator || lastOperandNode.nodeType === NodeType.LiteOperand) {
        operandStack.push(liteOperandNode);

        return;
    }

    invariant(
        operatorStack.length !== 0,
        `Missing operator before ${liteOperandNode.operand}`
    );

    liteOperandNode.stack.push(operandStack.pop(), operatorStack.pop());
}

const handleNormalOperand = (normalOperandNode: OperandNode, operandStack: BaseNode[], operatorStack: OperatorNode[]) => {
    if (operandStack.length === 0) {
        operandStack.push(normalOperandNode);

        return;
    }

    const lastOperandNode = operandStack[operandStack.length - 1];

    if (lastOperandNode.nodeType === NodeType.Operand || lastOperandNode.nodeType === NodeType.Operator) {
        operandStack.push(normalOperandNode);

        return;
    }

    if (lastOperandNode.nodeType === NodeType.LiteOperand) {
        const stackIsNotEmpty = (lastOperandNode as LiteOperandNode).stack.length > 0;

        if (stackIsNotEmpty) {
            operandStack.push(normalOperandNode);
    
            return;
        }

        (lastOperandNode as LiteOperandNode).stack.push(normalOperandNode, operatorStack.pop());
    }
}

export const getReversePolishNotation = (input: string): BaseNode[] => {
    /**
     * 操作数栈
     */
    const operandStack: BaseNode[] = [];

    /**
     * 操作符栈
     */
    const operatorStack: OperatorNode[] = [];

    const inputString = replaceBlank(input);

    let start = 0;

    for (let end = 0; end < inputString.length; end++) {
        const section = inputString.slice(start, end + 1);
        const nextSection = inputString.slice(start, end + 2);

        const inTheEnd = reachInputEnd(end, inputString.length);

        if (Operator.isOperator(section)) {

            if (Operator.isOperator(nextSection) && !inTheEnd) {
                continue;
            }

            start = end + 1;

            if (section === OperatorValue.OpenParenthesis) {

                operatorStack.push(Operator.makeOperatorNode(section));

            } else if (section === OperatorValue.CloseParenthesis) {

                let loop = true;

                do {
                    const lastOperatorNode = operatorStack.pop();

                    if (lastOperatorNode) {

                        if (OperatorValue.OpenParenthesis === lastOperatorNode.operator) {
                            loop = false;
                        } else {
                            operandStack.push(lastOperatorNode);
                        }

                    } else {
                        loop = false;
                    }

                } while (loop);

            } else {
                if (operatorStack.length > 0) {
                    let compareLoop = true;

                    do {
                        const lastOperatorNode = operatorStack[operatorStack.length - 1];

                        if (!lastOperatorNode || lastOperatorNode.operator === OperatorValue.OpenParenthesis) {
                            compareLoop = false;

                            continue;
                        }

                        if (Operator.comparePrecedence(section as OperatorValue, lastOperatorNode.operator)) {
                            operandStack.push(operatorStack.pop());
                        } else {
                            compareLoop = false
                        }
                    } while (compareLoop);

                }

                operatorStack.push(Operator.makeOperatorNode(section));
            }

        } else {
            const sectionOperandNode = Operand.makeOperandNode(section);

            if (inTheEnd) {
                invariant(
                    !!sectionOperandNode,
                    `Invalid char: ${section}`
                );

                if (sectionOperandNode.nodeType === NodeType.Operand) {
                    handleNormalOperand(sectionOperandNode as OperandNode, operandStack, operatorStack);
                } else {
                    handleLiteOperand(sectionOperandNode as LiteOperandNode, operandStack, operatorStack);
                }
                
            } else {
                const nextSectionOperandNode = Operand.makeOperandNode(nextSection);

                if (sectionOperandNode && !nextSectionOperandNode) {
                    
                    if (sectionOperandNode.nodeType === NodeType.Operand) {
                        handleNormalOperand(sectionOperandNode as OperandNode, operandStack, operatorStack);
                    } else {
                        handleLiteOperand(sectionOperandNode as LiteOperandNode, operandStack, operatorStack);
                    }

                    start = end + 1;
                }
            }
        }
    }

    operandStack.push(...(operatorStack.reverse()));

    return operandStack;
}

const getOperandValue = (operandNode: OperandNode) => {
    if (operandNode.nodeType === NodeType.LiteOperand) {
        const valueList = useValue<ValueList>(StoreKey.ValueList);

        invariant(
            (valueList || []).length > 0,
            `You should provider valueList when have LiteExpression: ${operandNode.operand}`
        );

        const position = valueList.findIndex(({ label }) => label === operandNode.operand);

        invariant(
            position !== -1,
            `Missing parameter in valueList: ${operandNode.operand}`
        );

        return valueList[position].value;
    }

    return operandNode.operand;
}

const getResult = (rightOperandNode: OperandNode, leftOperandNode: OperandNode, operatorNode: OperatorNode) => {
    invariant(
        rightOperandNode && rightOperandNode.nodeType === NodeType.Operand,
        `Invalid operand: ${rightOperandNode?.operand}`
    );

    invariant(
        leftOperandNode && leftOperandNode.nodeType === NodeType.Operand,
        `Invalid operand: ${leftOperandNode?.operand}`
    );

    invariant(
        operatorNode && operatorNode.nodeType === NodeType.Operator,
        `Invalid operator: ${operatorNode}`
    );

    return Operator.calculate(operatorNode.operator, [getOperandValue(leftOperandNode), getOperandValue(rightOperandNode)]);
}

const getLiteOperandResult = (liteOperand: LiteOperandNode) => {
    const [operandNode, operatorNode] = liteOperand.stack;

    return Operator.calculate((operatorNode as OperatorNode).operator, [getOperandValue(liteOperand), getOperandValue(operandNode as OperandNode)]);
}

export const calculateReversePolishNotation = (input: BaseNode[]): unknown => {
    const [, destoryValueList] = useStore(StoreKey.ValueList);
    const [, destoryUseBoolean] = useStore(StoreKey.UseBoolean);

    const useBoolean = useValue<boolean>(StoreKey.UseBoolean);

    const unit: OperandNode[] = [];

    for (let end = 0; end < input.length; end++) {
        const node = input[end];

        if (node.nodeType === NodeType.Operand) {
            unit.push(node as OperandNode);

            continue;
        }

        if (node.nodeType === NodeType.LiteOperand) {
            const stackIsEmpty = (node as LiteOperandNode).stack.length === 0;

            if (stackIsEmpty) {
                unit.push(node as LiteOperandNode);

                continue;
            }

            unit.push(getLiteOperandResult(node as LiteOperandNode));

            continue
        }

        if (node.nodeType === NodeType.Operator) {
            const result = getResult(unit.pop(), unit.pop(), node as OperatorNode);
            unit.push(result);
        }
    }

    invariant(
        unit.length === 1,
        `It looks like there's a problem with the FormulaEngine, please report the expression`
    );

    destoryValueList();
    destoryUseBoolean();

    if (useBoolean) {
        return !!unit[0].operand;
    }

    return unit[0].operand;
}