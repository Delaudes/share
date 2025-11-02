import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amount'
})
export class AmountPipe implements PipeTransform {
    transform(value: number | undefined): string {
        if (!value) {
            return '0.00';
        }
        return value.toFixed(2);
    }
}
