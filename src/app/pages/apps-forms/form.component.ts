import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { MdDialogRef } from '@angular/material'
import { MediaChange } from '@angular/flex-layout'

//Interfaces preguntas
import { Preguntas } from '../../interface/pregunta.interface'

@Component({
    selector : 'form-preguntas',
    templateUrl: './form.component.html',
    styleUrls: [
        './form.component.scss'
    ]
})

export class GeneraForm implements OnInit {

    private validaNum: string = '^[1-5]{1}$' 
    
    public  askForm : FormGroup

    private coleccion : Preguntas[] = []

    key : string
    
    respuestas = [
        {item : 'Respuesta corta', value: 1},
        {item : 'Parrafo', value: 2},
        {item : 'Opcional', value: 3},
        {item : 'Checkbox', value: 4},
        {item : 'Desplegar', value: 5}
    ]

    constructor(private _fb : FormBuilder){}
    
    ngOnInit(){
        this.askForm = this._fb.group({
            pregunta : ['', [Validators.required, Validators.minLength(4)]],
            tipo : [0, [Validators.required, Validators.pattern(this.validaNum)]],
            opciones : this._fb.array([
                this.getValor()
            ])
        })
    }

    getValor(){
        return this._fb.group({
            valor : ['', Validators.minLength(2)]
        })
    }

    agregarValor(){
        const control = <FormArray>this.askForm.controls['opciones']
        control.push(this.getValor())
    }

    removerValor(i : number){
        const control = <FormArray>this.askForm.controls['opciones']
        control.removeAt(i)
    }

    guardar(modelo : FormGroup){
        this.coleccion.push(modelo.value)
    }

    validaForm() : boolean {
        if( (this.askForm.value.tipo != 1) && (this.askForm.value.tipo != 2) ){
            return this.validaCamposVacios()
        }
        return this.askForm.invalid
    }

    validaCamposVacios() : boolean {
        /**
         * Si la opción es distinta a 1 ó 2 entonces verifico que los campos no esten vacíos
         */
        var i = 0
        var result = false;

        while( (i < this.askForm.value.opciones.length) && !result ){
            if( this.askForm.value.opciones[i].valor == ""){
                result = true
            }else{
                i++
            }
        }
        return result
    }

    guardarDB(){
    }

    remPregunta(index : number){
        this.coleccion.splice(index,1)
    }

    transformaTipo(opc : number) : string {
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