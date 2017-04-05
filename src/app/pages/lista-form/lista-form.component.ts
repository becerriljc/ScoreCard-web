import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { AppService } from '../../app.service'
import { MdDialog } from '@angular/material'
import { AprendizajeForm } from '../aprendizaje-formulario/aprendizaje.form'
import { GeneraForm } from '../apps-forms/form.component'
import { VistaPrevia } from '../visor-cuestionarios/visor.component'
import { NotificacionesComponent } from '../../shared/dialog/notificaciones/notificaciones.component'

import {GenerarFormComponent } from '../generar-form/generar-form.component'

//servicios firebase
import { InnovaService } from '../../services/innova.service'

@Component({
  selector: 'app-lista-form',
  templateUrl: './lista-form.component.html',
  styleUrls : [ './lista-form.component.scss' ]
})
export class ListaFormComponent implements OnInit {

    selectedOption: string
    htmlForm : string = ''

    constructor(
        private appService: AppService,
        private dialog: MdDialog,
        public _is : InnovaService
    ){
        appService.getState().topnavTitle = 'Aprendizaje / Innovación';
        this._is.cargaResult()
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

    titulo : string = ''
    descripcion : string = ''

    eliminaItem(llave : string){
        this.abrirDialogo(3, llave)
    }

    agregarForm(){
        var _tit = this.titulo.trim()
        var _desc = this.descripcion.trim()
        if(_tit.length == 0 || _desc.length == 0){
            return
        }
        this._is.agregarEncuesta(_tit, _desc)
        .then( () => {
            this.titulo = ''
            this.descripcion = ''
        })
        .catch( (err) => console.error(err))
    }

    creaFormulario(llave : string ){
        let dialogRef = this.dialog.open(GeneraForm, {
            width: '800px',
            height: '550px'
        })
        dialogRef.componentInstance.key = llave
        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
        }) 
    }

    vistaPrevia(llave : string){
        let dialogRef = this.dialog.open(VistaPrevia, {
            width: '850px',
            height: '550px'
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
}
