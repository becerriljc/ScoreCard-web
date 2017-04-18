import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { AppService } from '../../app.service'
import { saveAs } from 'file-saver'

//servicios
import { InnovaService } from '../../services/innova.service'

@Component({
    selector: 'lk-aprendizaje',
    templateUrl: './aprendizaje.component.html',
    styleUrls: [
        './aprendizaje.component.scss'
    ]
})

export class Aprendizaje implements OnInit{

    selectIndex: number = 2

    constructor(
        private appService: AppService,
        private route : ActivatedRoute,
        private is : InnovaService
    ){
        appService.getState().topnavTitle = 'Aprendizaje / Innovación';
    }

    ngOnInit(){
        let pestana = this.route.snapshot.params['idPestana']
        if(pestana != 'undefined'){
            this.selectIndex = pestana
        }
     }

     crearCSV(){
        var options = { 
            type: 'text/csv;charset=utf-8' 
        }
        var fecha = new Date()
        var filename = btoa(fecha.toString()) + '.csv'
        this.is.establecerUid(localStorage.getItem('user'))

        var info = this.is.establecerPreguntas()
        //saveAs(new Blob([info], options), filename)
     }
}
