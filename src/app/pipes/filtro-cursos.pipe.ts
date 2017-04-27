import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCursos',
  pure : false
})
export class FiltroCursosPipe implements PipeTransform {

    transform(values: any, args?: any): any {
      if(!args){
          return values;
      }
      return values.filter(value => 
        value.info.nombre.indexOf(args) !== -1
      )
    }

}
