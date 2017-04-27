import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroReportes'
})
export class FiltroReportesPipe implements PipeTransform {

  transform(values: any, args?: any): any {
    if(!args){
          return values;
      }
      return values.filter(value => 
        value.titulo.indexOf(args) !== -1
      )
  }

}
