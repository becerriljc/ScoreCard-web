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
    
    private validaNum: string = '^[1-5]{1}$' 
    
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
    }

    initForm(){
        return this._fb.group({
            titulo : ['', [Validators.required, Validators.minLength(4)]],
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
            valor : ['', Validators.minLength(2)]
        })
    }

    agregarValor(index : number){
        console.log('Index ',index)
        const control = <FormArray>this.askForm.controls.preguntas
        //control.push(this.getValor())
    }

    removerValor(i : number){
        const control = <FormArray>this.askForm.controls['opciones']
        control.removeAt(i)
    }

    guardar(modelo : FormGroup){
       // this.coleccion.push(modelo.value)
       console.log(modelo)
        //this.askForm = this.initForm()
    }

    validaForm() : boolean {
        /*if( (this.askForm.value.tipo != 1) && (this.askForm.value.tipo != 2) ){
            return this.validaCamposVacios()
        } */
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
       // this.coleccion.splice(index,1)
    }

    editarPregunta(index : number){
        console.log(index)
    }

    almacenar(){
       /* if(this.coleccion.length > 0){
            this._is.insertaPreguntas(this.coleccion)
            this.coleccion = []
        }*/
    }

}
