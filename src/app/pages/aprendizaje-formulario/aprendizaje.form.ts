import { Component, OnInit } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { MediaChange } from '@angular/flex-layout'
import { Preguntas } from '../../interface/pregunta.interface'
import { Conjunto } from '../../interface/conjunto.pregunta'
import { FormGroup, FormControl, Validators } from '@angular/forms'

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
    showImg1 : string = 'hidden'
    showImg2 : string = 'hidden'
    showImg3 : string = 'hidden'
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

    show_quit(n1, n2){
      // n1 refiere al elemento (1) pregunta (2) opcional (3) Checkbox
      // n2 refiere al estado (1) muestra (2) oculta
      switch(n1){
          case 1: 
            if(n2 == 1){
                this.showImg1 = 'visible'
            }else{
                this.showImg1 = 'hidden'
            }
          break
          case 2: 
            if(n2 == 1){
                this.showImg2 = 'visible'
            }else{
                this.showImg2 = 'hidden'
            }
          break
          case 3: 
            if(n2 == 1){
                this.showImg3 = 'visible'
            }else{
                this.showImg3 = 'hidden'
            }
          break
      }
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
}
