import { Injectable } from '@angular/core'
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'

//interfaces
import { Caracteristica, Preguntas, Conjunto } from '../interface/item.interface'

@Injectable()
export class FormulariosService {

    private validaText : string = '[a-zA-Z0-9_].+$'
    private validaNum: string = '[1-5]{1}$'

    constructor(
      public fb : FormBuilder
    ) {}

    initFormEncuestas() : FormGroup {
        return this.fb.group({
            titulo : ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.validaText)]],
            descripcion : ['', Validators.minLength(4)],
            preguntas : this.fb.array([
                this.getPreguntas()
            ])
        })
    }

    getPreguntas(){
        return this.fb.group({
            pregunta : ['', [Validators.required, Validators.minLength(4)]],
            tipo : [0, [Validators.required, Validators.pattern(this.validaNum)]],
            opciones : this.fb.array([
                this.getValor()
            ])
        })
    }

    getValor(){
        return this.fb.group({
            valor : ['', [Validators.minLength(2)]]
        })
    }

    cuentaPreguntas(forma : FormGroup) : boolean {
        var res = false

        if(forma.value.preguntas.length > 1){ res = true }

        return res
    }

    accionesControls(opc: FormGroup, act : number, ctrl : string,  index : number){
        const control = <FormArray>opc.controls[ctrl]
        var fg : FormGroup = this.getPreguntas()
        if(ctrl == 'opciones'){
            fg = this.getValor()
        }
        if(act == 1){
            control.push(fg)
        }else{
            control.removeAt(index)
        }
    }

    venga(ref : Object, valor : Preguntas){
        const control = <FormArray>ref
        for(var u = 0; u < control.controls.length; u++){
            if( (valor[u].tipo != 1) && (valor[u].tipo != 2) ){
                for(var r = 1; r < valor[u].opciones.length; r++){
                    this.accionesControls(<FormGroup>control.controls[u], 1, 'opciones', null)
                }
            }
        }
    }
}
