import { Component, OnInit } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { MediaChange } from '@angular/flex-layout'
import  { InnovaService } from '../../services/innova.service'

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
    
    constructor(
        private dialogRef: MdDialogRef<VistaPrevia>,
        private is : InnovaService
    ){}

    ngOnInit(){
        this.primitiva = this.is.cargaEvaluacion(this.key)
    }

    cerrarDialogo(){
        this.dialogRef.close('cerrar')
    }
}