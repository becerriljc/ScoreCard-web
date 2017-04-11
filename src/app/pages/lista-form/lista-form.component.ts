import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { AppService } from '../../app.service'
import { MdDialog } from '@angular/material'
import { AprendizajeForm } from '../aprendizaje-formulario/aprendizaje.form'
import { GeneraForm } from '../apps-forms/form.component'
import { VistaPrevia } from '../visor-cuestionarios/visor.component'
import { NotificacionesComponent } from '../../shared/dialog/notificaciones/notificaciones.component'
import { Router } from '@angular/router'

import {GenerarFormComponent } from '../generar-form/generar-form.component'

//servicios firebase
import { InnovaService } from '../../services/innova.service'

@Component({
  selector: 'app-lista-form',
  templateUrl: './lista-form.component.html',
  styleUrls : [ './lista-form.component.scss' ]
})
export class ListaFormComponent implements OnInit {

    constructor(
        private appService: AppService,
        private dialog: MdDialog,
        public _is : InnovaService, 
        private router : Router
    ){
        appService.getState().topnavTitle = 'Aprendizaje / Innovación';
        this._is.cargaEncuesta()
        .subscribe(() => {
            console.log('mensajes cargados...')
        })
    }

    ngOnInit(){ }

    accion(obj : any, act : number){
        var llave : string = obj.$key
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
                 this._is.eliminaEncuesta(key)
            }
        })
    }

    ir_a(obj : string){
        this.router.navigate(['/aplicarEncuesta', obj])
    }
}
