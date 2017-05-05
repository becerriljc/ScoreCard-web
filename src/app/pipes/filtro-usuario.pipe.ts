import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuario'
})
export class FiltroUsuarioPipe implements PipeTransform {

    transform(values: any, args?: string): any {
      if(!args){
            return values;
        }
        return values.filter(value => 
          value.nombre.indexOf(args) !== -1
        )
    }

}
