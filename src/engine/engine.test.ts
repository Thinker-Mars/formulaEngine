import { FormulaEngine } from './index';

import type { ValueList } from 'src/type';

describe('FormulaEngine', () => {
    it('should handle normal expression', () => {
        const input = '3 * 5 > 0';

        const engine = new FormulaEngine();

        expect(engine.getResult(input)).toBe(true);
    });

    it('should handle normal lite expression', () => {
        const input = '${报工.良品数} > 20';
        
        const valueList: ValueList = [
            {
                label: '${报工.良品数}',
                value: 30
            }
        ];
        
        const engine = new FormulaEngine();

        expect(engine.getResult(input, { valueList })).toBe(true);
    });

    it('should handle complex lite expression', () => {
        const input = '${登录用户} == "管理员" && ${报工.不良品数} > 0';

        const valueList: ValueList = [
            {
                label: '${登录用户}',
                value: '管理员'
            },
            {
                label: '${报工.不良品数}',
                value: 20
            }
        ];

        const engine = new FormulaEngine();

        expect(engine.getResult(input, { valueList })).toBe(true);
    });

    it('should return boolean when set `useBoolean`', () => {
        const input = '3 * 5 && 6';

        const engine = new FormulaEngine();

        expect(engine.getResult(input, { useBoolean: true })).toBe(true);
    });

    it('should return logic value when not set `useBoolean`', () => {
        const input = '3 * 5 && 6';

        const engine = new FormulaEngine();

        expect(engine.getResult(input)).toBe(6);
    });
});