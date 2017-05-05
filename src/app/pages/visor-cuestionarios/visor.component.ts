import { Component, OnInit } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { MediaChange } from '@angular/flex-layout'

//servicios
import { EncuestasService } from '../../services/encuestas.services'

@Component({
    selector : 'vista-previa',
    templateUrl: './visor.component.html',
    styleUrls: [
        './visor.component.scss'
    ]
})

export class VistaPrevia implements OnInit{

    key : string
    private titulo : string
    private desc : string
    private primitivas : any[] = []
    
    constructor(
        private dialogRef: MdDialogRef<VistaPrevia>,
        private es : EncuestasService
    ){}

    ngOnInit(){
        this.es.obtPreguntas(this.key).subscribe(listado => {
            this.titulo = listado.titulo
            this.desc = listado.descripcion
            this.primitivas = listado.preguntas
        })
    }

    cerrarDialogo(){
        this.dialogRef.close('cerrar')
    }
}
