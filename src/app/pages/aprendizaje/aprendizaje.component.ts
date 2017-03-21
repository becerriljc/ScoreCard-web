import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { AppService } from '../../app.service'
import { MdDialog } from '@angular/material'
import { AprendizajeForm } from '../aprendizaje-formulario/aprendizaje.form'
import { InnovaService } from '../../services/innova.service'

@Component({
    selector: 'lk-aprendizaje',
    templateUrl: './aprendizaje.component.html',
    styleUrls: [
        './aprendizaje.component.scss'
    ]
})

export class Aprendizaje implements OnInit{

    selectedOption: string
    htmlForm : string = ''

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

    titulo : string = ''
    descripcion : string = ''

    vistaPrevia(llave : string){
        console.log('vista previa')
    }

    eliminaItem(llave : string){
        this._is.eliminaEncuesta(llave)
    }

    agregarForm(){
        var _tit = this.titulo.trim()
        var _desc = this.descripcion.trim()
        console.log('Titulo', _tit.length, 'Descripción', _desc.length)
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
        let dialogRef = this.dialog.open(AprendizajeForm, {
            width: '700px',
            height: '500px'
        })
        dialogRef.componentInstance.key = llave
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        }) 
    }
}
