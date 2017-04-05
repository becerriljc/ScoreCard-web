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
    initVal : any
    key : string
    forma : FormGroup 
    private validaText : string = '[a-zA-Z0-9_].+$'
    constructor(
        private _fb : FormBuilder,
        public _is : InnovaService,
        public _fs : FuncionesService,
        private dialogRef: MdDialogRef<GeneraForm>){
            this.initVal = this._is.cargaEvaluacion(this.key)
        }
    
    ngOnInit(){
        this.initVal = this._is.cargaEvaluacion(this.key)
        console.log(this.initVal.titulo)
        this.forma = this.formInit()
    }

    formInit(){
        return this._fb.group({
            titulo : ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.validaText)]],
        })
    }
}