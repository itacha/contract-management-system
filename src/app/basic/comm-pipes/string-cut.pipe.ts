import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringCut'
})
export class StringCutPipe implements PipeTransform {
    /**
     * 按长度截取字符串
     * @param str;
     * @param lenght
     */
    transform(str: string, lenght: number | 10): string {
        if (typeof str !== 'string') {
            return str;
        }
        if (typeof str === 'string') {
            if (str.length > lenght) {
                return str.substring(lenght, 0) + '...';
            } else {
                return str;
            }
        }
    }
}
