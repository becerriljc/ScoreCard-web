import { Component, OnInit } from '@angular/core'
import { AppService } from '../../app.service'
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms'

import { Preguntar } from '../../interface/ejemplo.interface'

@Component({
    selector: 'app-serv',
    templateUrl : 'serv.component.html',
    styleUrls: [
        './serv.component.scss'
    ]
})

export class ServPrueba implements OnInit  {

    private validaNum: string = '^[1-5]{1}$' 

    public preguntasForm : FormGroup

    respuestas = [
        {item : 'Respuesta corta', value: 1},
        {item : 'Parrafo', value: 2},
        {item : 'Opcional', value: 3},
        {item : 'Checkbox', value: 4},
        {item : 'Desplegar', value: 5}
    ]

    constructor(
        private appService: AppService,
        private _fb : FormBuilder){
        appService.getState().topnavTitle = 'Pruebas'
    }

    ngOnInit(){
        this.preguntasForm = this._fb.group({
            pregunta : ['', [Validators.required, Validators.minLength(5)]],
            tipo : ['', [Validators.required, Validators.pattern(this.validaNum)]],
            opciones: this._fb.array([
                this.getHijo()
            ])
        })
    }

    getHijo(){
        return this._fb.group({
            valor : ['', Validators.minLength(2)]
        })
    }

    guardar(modelo : Preguntar){
       
        console.log(modelo)
    }

    agregarHijo(){
        const control = <FormArray>this.preguntasForm.controls['opciones']
        control.push(this.getHijo())
    }

    removerHijo(i : number){
        const control = <FormArray>this.preguntasForm.controls['opciones']
        control.removeAt(i)
    }
}