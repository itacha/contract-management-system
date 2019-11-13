import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trueOrfalse'
})
export class TrueFalsePipe implements PipeTransform {
    /**
     * 输出是或否
     * @param value 
     */
    transform(value: string | number | boolean): string {
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number') {
            if (value !== 0) {
                return `是`;
            } else {
                return `否`;
            }
        }
        if (typeof value === 'boolean') {
            if (value) {
                return `是`;
            } else {
                return `否`;
            }
        }
        if (!value) return value;
    }
}
