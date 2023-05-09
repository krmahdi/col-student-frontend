import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], field: string, order:string): any[] {
    if (!value || !field || !order) {
      return value;
    }
  
    return value.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
  
      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  

}
