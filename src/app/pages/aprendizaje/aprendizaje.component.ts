import { Component, OnInit } from '@angular/core'
import { AppService } from '../../app.service'
import { MdDialog } from '@angular/material'
import { AprendizajeForm } from '../aprendizaje-formulario/aprendizaje.form'

@Component({
    selector: 'lk-aprendizaje',
    templateUrl: './aprendizaje.component.html',
    styleUrls: [
        './aprendizaje.component.scss'
    ]
})

export class Aprendizaje implements OnInit{

    selectedOption: string;
    
    constructor(
        private appService: AppService,
        private dialog: MdDialog
    ){
        appService.getState().topnavTitle = 'Aprendizaje / Innovación';
    }

    ngOnInit(){

    }

    creaFormulario(){
        let dialogRef = this.dialog.open(AprendizajeForm, {
            width: '600px',
            height: '400px'
        })
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        }) 
    }
}
