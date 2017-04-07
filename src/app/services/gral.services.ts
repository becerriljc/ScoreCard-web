import { Injectable } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { FormulariosService } from './formularios.service'

//interfaces
import { Caracteristica } from '../interface/item.interface'

import { InnovaService } from './innova.service'

@Injectable()
export class GeneralService {   

    constructor(
        private sForm : FormulariosService,
        private is : InnovaService){}

    update(forma : Caracteristica, llave : string){
        return this.is.actualizarEncuesta(forma, llave)
    }

    accionesPreguntas(act : number, index : number, forma : FormGroup){
        const control = <FormArray> forma.controls['preguntas']
        if(act == 1){
            control.push(this.sForm.getPreguntas())
        }else{
            control.removeAt(index)
        }
    }

    accionesOpciones(opc: FormGroup, act : number, index : number){
        const control = <FormArray>opc.controls['opciones']
        if(act == 1){
            control.push(this.sForm.getValor())
        }else{
            control.removeAt(index)
        }
    }
    
    cargaValor(ini : number, ref : number ): number{
        if(ini === 0){ return ref }
        return ini
    }

    verificar(cad : string, valor : number) : string {
        console.log(valor)
        return cad
    }

    validaForm(forma : FormGroup) : boolean {
        return this.validaCamposVacios(forma)
    }

    validaCamposVacios(forma : FormGroup) : boolean {
        /**
         * Si la opción es distinta a 1 ó 2 entonces verifico que los campos no esten vacíos
         */
        var i = 0
        var result = false
        while( (i < forma.value.preguntas.length) && !result){
            if ( forma.value.preguntas[i].tipo == 0){
                result = true
            }else{
                if( (forma.value.preguntas[i].tipo != 1) && (forma.value.preguntas[i].tipo != 2)){
                    var j = 0
                    while( (j < forma.value.preguntas[i].opciones.length) && !result ){
                        if(forma.value.preguntas[i].opciones[j].valor.trim() == ""){
                            result = true
                        }else{
                            j++
                        }
                    }
                }
            }
            i++
        }
        
        return (result || forma.invalid)
    }

}