import { Component, OnInit } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { MediaChange } from '@angular/flex-layout'

//servicios
import  { InnovaService } from '../../services/innova.service'
import { FuncionesService } from '../../services/funciones.service'

@Component({
    selector : 'vista-previa',
    templateUrl: './visor.component.html',
    styleUrls: [
        './visor.component.scss'
    ]
})

export class VistaPrevia implements OnInit{

    key : string
    private primitiva : any
    private primitivas : any[] = []
    
    constructor(
        private dialogRef: MdDialogRef<VistaPrevia>,
        private is : InnovaService,
        private fs : FuncionesService
    ){}

    ngOnInit(){
        this.primitiva = this.is.cargaEvaluacion(this.key)
        if(typeof this.primitiva.preguntas !== 'undefined'){
            Object.keys(this.primitiva.preguntas).map((key) => {
                this.primitivas.push(this.primitiva.preguntas[key])
            })
        }
    }

    cerrarDialogo(){
        this.dialogRef.close('cerrar')
    }
}
