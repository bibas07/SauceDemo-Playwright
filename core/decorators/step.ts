import { test } from '@playwright/test';
import Logger from 'js-logger';

export function step(stepName?: string) {
    return function decorator(target: Function, context: ClassMethodDecoratorContext) {
        return async function (this: any, ...args: any[]) {
            const name = stepName || `${this.constructor.name}.${String(context.name)}`;
            return await test.step(name, async () => {
                Logger.info(`Step: ${name}`);
                return target.apply(this, args);
            });
        };
    };
}