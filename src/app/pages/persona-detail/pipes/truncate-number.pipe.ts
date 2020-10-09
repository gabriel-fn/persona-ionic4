import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateNumber'
})
export class TruncateNumberPipe implements PipeTransform {
  
  result: number;

  transform(value: number, args?: any): string {
    this.result = Math.floor(value);

    if(this.result < 0){
      return `${this.result}`;
    }else{
      return `+${this.result}`;
    }
  }

}
