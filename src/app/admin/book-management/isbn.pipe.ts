import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbnPipe',
  standalone: false
})
export class IsbnPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): unknown {
    let isbn: string = `${value}`;
    isbn = isbn.replaceAll("-", "");
    return isbn.slice(0,3) + "-" + isbn.slice(3,5) + "-" + isbn.slice(5,10) + "-" + isbn.slice(10,12) + "-" +isbn.slice(12);
  }

}
