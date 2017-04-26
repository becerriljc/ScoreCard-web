import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros',
  pure: false
})
export class FiltrosPipe implements PipeTransform {

  transform(values: any[], args?: string): any {
      if(!args){
          return values;
      }
      return values.filter(value => 
        value.nombre.indexOf(args) !== -1
      )
  }

}
