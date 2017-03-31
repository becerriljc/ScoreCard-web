import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { MdDialogRef } from '@angular/material'
import { MediaChange } from '@angular/flex-layout'

//servicios 
import  { InnovaService } from '../../services/innova.service'
import { FuncionesService } from '../../services/funciones.service'

//Interfaces preguntas
import { Preguntas } from '../../interface/item.interface'

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

    private single : Preguntas = {
        pregunta : '',
        tipo : 0,
        opciones : [{
            valor : ''
        }]
    }

    key : string

    constructor(
        private _fb : FormBuilder,
        public _is : InnovaService,
        public _fs : FuncionesService,
        private dialogRef: MdDialogRef<GeneraForm>){}
    
    ngOnInit(){
        this._is.cargaPreguntas(this.key).subscribe(() => {
            console.log('estamos dentro con ', this.key)
        })
        this.askForm = this.initForm()
    }

    initForm() {
        return this._fb.group({
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
        this.askForm = this.initForm()
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

    remPregunta(index : number){
        this.coleccion.splice(index,1)
    }

    editarPregunta(index : number){
        console.log(index)
    }

    almacenar(){
        if(this.coleccion.length > 0){
            this._is.insertaPreguntas(this.coleccion)
            this.coleccion = []
            this.dialogRef.close('guardar')
        }
    }

    cerrarDialogo(){
        this.dialogRef.close('cerrar')
    }

}