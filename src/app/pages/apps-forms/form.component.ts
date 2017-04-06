import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { MdDialogRef } from '@angular/material'
import { MediaChange } from '@angular/flex-layout'

//servicios 
import  { InnovaService } from '../../services/innova.service'
import { FuncionesService } from '../../services/funciones.service'
import { FormulariosService } from '../../services/formularios.service'

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
    
    constructor(
        private _fb : FormBuilder,
        public _is : InnovaService,
        public _fs : FuncionesService,
        private dialogRef: MdDialogRef<GeneraForm>,
        private sForm : FormulariosService){
        }
    
    ngOnInit(){
        this.initVal = this._is.cargaEvaluacion(this.key)
        this.forma = this.sForm.initFormEncuestas()
        for(var t = 1; t < this.initVal.preguntas.length; t++) {
            this.sForm.accionesControls(this.forma, 1, 'preguntas', null)
        }
        this.sForm.venga(this.forma.controls['preguntas'], this.initVal.preguntas)
        this.forma.setValue(this.initVal)
    }

    update(){
        this.dialogRef.close('true')
    }

    algo(){
        console.log('es algo haber que pasa')
    }

    cerrarDialogo(){
        this.dialogRef.close('false')
    }

    cargaValor(ini : number, ref : number ): number{
        if(ini === 0){ return ref }
        return ini
    }

    verificar(cad : string, valor : number) : string {
        console.log(valor)
        return cad
    }

}