import { Injectable } from '@angular/core'

@Injectable()
export class FuncionesService {

    public respuestas = [
        {item : 'Respuesta corta', value: 1},
        {item : 'Parrafo', value: 2},
        {item : 'Opcional', value: 3},
        {item : 'Checkbox', value: 4},
        {item : 'Desplegar', value: 5}
    ]
    
    public transformaTipo(opc : number) : string {
        var resp = ''
        switch(opc){
            case 1 : resp = 'Respuesta corta' 
            break
            case 2 : resp = 'Parrafo' 
            break
            case 3 : resp = 'Opcional' 
            break
            case 4 : resp = 'Checkbox' 
            break
            case 5 : resp = 'Desplegar' 
            break
        }
        return resp
    }
}