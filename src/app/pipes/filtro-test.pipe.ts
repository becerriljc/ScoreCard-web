import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTest'
})
export class FiltroTestPipe implements PipeTransform {

  transform(values: any, args?: string): any {
    if(!args){
          return values;
      }
      return values.filter(value => 
        value.titulo.indexOf(args) !== -1
      )
  }

}
