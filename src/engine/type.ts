type TemplateValue = {
    /**
     * 模板的名称
     */
    label: string;
    /**
     * 模板的值
     */
    value: unknown;
}

export interface Engine {
    /**
     * 注册本次计算用到的函数
     */
    useFunction: (input: Function) => Engine;
    /**
     * 注册本次计算用到的一组函数
     */
    useFunctionList: (inputList: Function[]) => Engine;
    /**
     * 根据表达式计算结果
     * @param expression 表达式
     * @param valueList 模板的值
     */
    getResult: (expression: string, valueList?: TemplateValue[]) => unknown;
}

export type EngineConfig = {
    /**
     * 匹配表达式中自定义的文本
     */
    template?: RegExp[];
    /**
     * 全局可以使用的函数
     */
    globalFunction?: Function[];
}