import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sexIdentify'
})
export class SexIdentifyPipe implements PipeTransform {
    /**
     * 判断性别
     */
    transform(value: string | number | boolean): string {
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number') {
            switch (value) {
                case 1:
                    return `男`;
                case 2:
                    return `女`;
                case -1:
                    return `未知`;
            }
        }
        if (typeof value === 'boolean') {
            if (value) {
                return `男`;
            } else {
                return `女`;
            }
        }
    }
}
