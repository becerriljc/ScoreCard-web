import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { AppService } from '../../app.service'
import { MdDialog } from '@angular/material'
import { AprendizajeForm } from '../aprendizaje-formulario/aprendizaje.form'
import { GeneraForm } from '../apps-forms/form.component'
import { VistaPrevia } from '../visor-cuestionarios/visor.component'
import { NotificacionesComponent } from '../../shared/dialog/notificaciones/notificaciones.component'
import { Router } from '@angular/router'

//import {GenerarFormComponent } from '../generar-form/generar-form.component'

//servicios firebase
import { EncuestasService } from '../../services/encuestas.services'

@Component({
  selector: 'app-lista-form',
  templateUrl: './lista-form.component.html',
  styleUrls : [ './lista-form.component.scss' ]
})
export class ListaFormComponent implements OnInit {

    filtrado : string
    encuestas : any[] = []

    constructor(
        private appService: AppService,
        private dialog: MdDialog,
        public es : EncuestasService, 
        private router : Router
    ){
        appService.getState().topnavTitle = 'Aprendizaje / Innovación';
        this.es.obtEncuestas().subscribe(enc => this.encuestas = enc)
    }

    ngOnInit(){ }

    accion(obj : any, act : number){
        let llave : string = obj.$key
        switch(act){
            case 1 :  this.creaFormulario(llave)
            break
            case 2 : this.vistaPrevia(llave)
            break
            case 3: this.eliminaItem(llave)
            break
        }
    } 

    eliminaItem(llave : string){
        this.abrirDialogo(3, llave)
    }

    creaFormulario(llave : string ){
        let dialogRef = this.dialog.open(GeneraForm, {
            width: '900px',
            height: '600px'
        })
        dialogRef.componentInstance.key = llave
        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
        }) 
    }

    vistaPrevia(llave : string){
        let dialogRef = this.dialog.open(VistaPrevia, {
            width: '900px',
            height: '600px'
        })
        dialogRef.componentInstance.key = llave
        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
        }) 
    }

    abrirDialogo(opc : number, key : string){
        let dialogRef = this.dialog.open(NotificacionesComponent, {
            width: '350px',
            height: '200px'
        })
        dialogRef.componentInstance.opcion = opc
        dialogRef.afterClosed().subscribe(result => {
            if(result == 'true'){
                this.es.remEncuesta(key).then(_ => {
                    console.log('eliminado')
                })
            }
        })
    }

    ir_a(obj : string){
        this.router.navigate(['/aplicarEncuesta', obj])
    }
}
