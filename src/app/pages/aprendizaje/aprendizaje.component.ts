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

    private selectIndex : number = 1

    constructor(
        private appService: AppService,
        private route : ActivatedRoute,
        private is : InnovaService
    ){
        appService.getState().topnavTitle = 'Aprendizaje / Innovación'
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
        var texto : string = ''
        for(var x = 0; x < info.length; x++){
            texto +=  info[x].valor + this.is.establecerRespuesta(info[x].llave)
        }
        saveAs(new Blob([texto], options), filename)
     }
}
