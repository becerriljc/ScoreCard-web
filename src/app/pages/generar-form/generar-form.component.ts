import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { MediaChange } from '@angular/flex-layout'
import { MdDialog } from '@angular/material'

import { NotificacionesComponent } from '../../shared/dialog/notificaciones/notificaciones.component'

//servicios 
import  { InnovaService } from '../../services/innova.service'
import { FuncionesService } from '../../services/funciones.service'
import { FormulariosService } from '../../services/formularios.service'

//Interfaces preguntas
import { Caracteristica, Preguntas, Conjunto } from '../../interface/item.interface'

@Component({
  selector: 'app-generar-form',
  templateUrl: './generar-form.component.html',
  styleUrls : ['./generar-form.component.scss']
})
export class GenerarFormComponent implements OnInit {
    
    public  askForm : FormGroup

    private encuesta : Caracteristica = null

    private single : Caracteristica = {
        titulo: '',
        descripcion : '',
        preguntas : [{
            pregunta : '',
            tipo : 0,
            opciones : [{
                valor : ''
            }]
        }]
    }

    key : string

    constructor(
        private _fb : FormBuilder,
        public _is : InnovaService,
        public _fs : FuncionesService,
        private dialog : MdDialog,
        private sform : FormulariosService){}

    ngOnInit() {
      this._is.cargaPreguntas(this.key).subscribe(() => {
            console.log('estamos dentro con ', this.key)
        })
        this.askForm = this.sform.initFormEncuestas()
    }

    accionesOpciones(opc: FormGroup, act : number, index : number){
        const control = <FormArray>opc.controls['opciones']
        if(act == 1){
            control.push(this.sform.getValor())
        }else{
            control.removeAt(index)
        }
    }

    accionesPreguntas(act : number, index : number){
        const control = <FormArray> this.askForm.controls['preguntas']
        if(act == 1){
            control.push(this.sform.getPreguntas())
        }else{
            control.removeAt(index)
        }
    }

    guardar(){
       this._is.addEncuesta(this.askForm.value).then((res) =>{
           this.abrirDialogo(1)
           this.askForm = this.sform.initFormEncuestas()
       }).catch((err) => {
            this.abrirDialogo(2)
       })
    }

    validaForm() : boolean {
        return this.validaCamposVacios()
    }

    validaCamposVacios() : boolean {
        /**
         * Si la opción es distinta a 1 ó 2 entonces verifico que los campos no esten vacíos
         */
        var i = 0
        var result = false
        while( (i < this.askForm.value.preguntas.length) && !result){
            if ( this.askForm.value.preguntas[i].tipo == 0){
                result = true
            }else{
                if( (this.askForm.value.preguntas[i].tipo != 1) && (this.askForm.value.preguntas[i].tipo != 2)){
                    var j = 0
                    while( (j < this.askForm.value.preguntas[i].opciones.length) && !result ){
                        if(this.askForm.value.preguntas[i].opciones[j].valor.trim() == ""){
                            result = true
                        }else{
                            j++
                        }
                    }
                }
            }
            i++
        }
        
        return (result || this.askForm.invalid)
    }

    cuentaPreguntas() : boolean {
        var res = false
        if(this.askForm.value.preguntas.length > 1){ res = true }
        return res
    }

    abrirDialogo(opc : number){
        let dialogRef = this.dialog.open(NotificacionesComponent, {
            width: '350px',
            height: '200px'
        })
        dialogRef.componentInstance.opcion = opc
    }
}
