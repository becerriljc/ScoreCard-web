import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { MediaChange } from '@angular/flex-layout'

//servicios 
import  { InnovaService } from '../../services/innova.service'
import { FuncionesService } from '../../services/funciones.service'

//Interfaces preguntas
import { Caracteristica, Preguntas, Conjunto } from '../../interface/item.interface'

@Component({
  selector: 'app-generar-form',
  templateUrl: './generar-form.component.html',
  styleUrls : ['./generar-form.component.scss']
})
export class GenerarFormComponent implements OnInit {
    
    private validaNum: string = '[1-5]{1}$'

    private validaText : string = '[a-zA-Z0-9_].+$'
    
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
        public _fs : FuncionesService){}

    ngOnInit() {
      this._is.cargaPreguntas(this.key).subscribe(() => {
            console.log('estamos dentro con ', this.key)
        })
        this.askForm = this.initForm()
        console.log('Responde: ',localStorage.getItem('user'))
    }

    initForm(){
        return this._fb.group({
            titulo : ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.validaText)]],
            descripcion : ['', Validators.minLength(4)],
            preguntas : this._fb.array([
                this.getPreguntas()
            ])
        })
    }

    getPreguntas(){
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
            valor : ['', [Validators.minLength(2)]]
        })
    }

    accionesOpciones(opc: FormGroup, act : number, index : number){
        const control = <FormArray>opc.controls['opciones']
        if(act == 1){
            control.push(this.getValor())
        }else{
            control.removeAt(index)
        }
    }

    accionesPreguntas(act : number, index : number){
        const control = <FormArray> this.askForm.controls['preguntas']
        if(act == 1){
            control.push(this.getPreguntas())
        }else{
            control.removeAt(index)
        }
    }

    guardar(modelo : FormGroup){
       this._is.addEncuesta(modelo.value)
       this.askForm = this.initForm()
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

    editarPregunta(index : number){
        console.log(index)
    }

    cuentaPreguntas() : boolean {
        var res = false

        if(this.askForm.value.preguntas.length > 1){ res = true }

        return res
    }

}
