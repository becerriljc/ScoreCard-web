import { Component, OnInit } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { MediaChange } from '@angular/flex-layout'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'

//
import { Preguntas } from '../../interface/pregunta.interface'
import { Conjunto } from '../../interface/conjunto.pregunta'

@Component({
    selector : 'add-preguntas',
    templateUrl: './aprendizaje.form.html',
    styleUrls: [
        './aprendizaje.form.scss'
    ]
})

export class AprendizajeForm implements OnInit {

    forma: FormGroup

    key : string
    quest : string
    favoriteColor : string 
    obg:boolean = false
    z : number = 1
    preguntas : any[] = []

    iPregunta : Preguntas = {
        pregunta : null,
        tipo : null,
        opciones : null
    }

    conjunto : string[] = []
    
    respuestas = [
        {item : 'Respuesta corta', value: 1},
        {item : 'Parrafo', value: 2},
        {item : 'Opcional', value: 3},
        {item : 'Checkbox', value: 4},
        {item : 'Desplegar', value: 5}
    ]

    constructor(
        private dialogRef: MdDialogRef<AprendizajeForm>
        ) {
            this.forma = new FormGroup({
                'pregunta' : new FormControl(this.iPregunta.pregunta, [
                    Validators.required,
                    Validators.minLength(3)
                ]),
                'tipo' : new FormControl(this.iPregunta.tipo, [
                    Validators.required
                ])
            })
    }

    ngOnInit(): void {
        this.quest = "hola"
        this.favoriteColor = "este"
        console.log("La llave es: ", this.key)
    }

    status(res:boolean): void {
        this.obg = res
    }

    agregaPregunta(){
        console.log('esto es lo que estoy enviando')
    }

    guardar(){
        console.log(this.forma)
        this.preguntas.push(this.forma.value)
        //this.forma.reset()
    }
    
    getValor(opc : number) : string {
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

    validaForm() : boolean {
        return this.forma.invalid
    }

    remPregunta(index : number){
        this.preguntas.splice(index,1)
    }

    agregarRespuesta(){
        this.forma.addControl
        console.log('Forma add resp', this.forma)
    }
}
