import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { AppService } from '../../app.service'
import { saveAs } from 'file-saver'

//servicios
import { EncuestasService } from '../../services/encuestas.services'

@Component({
    selector: 'lk-aprendizaje',
    templateUrl: './aprendizaje.component.html',
    styleUrls: [
        './aprendizaje.component.scss'
    ]
})

export class Aprendizaje implements OnInit{

    private selectIndex : number = 1
    private text : string = ''

    constructor(
        private appService: AppService,
        private route : ActivatedRoute,
        private es : EncuestasService
    ){
        appService.getState().topnavTitle = 'Aprendizaje / Innovación'
        let pestana = this.route.snapshot.params['idPestana']
        if(pestana != 'undefined'){
            this.selectIndex = pestana
        }
        es.obtEncuestasUser().subscribe(listado => {
            let keys = Object.keys(listado)
            es.obtEncuestasClientes().subscribe(lista => {
                lista.forEach(encuesta => {
                    if(keys.indexOf(encuesta.$key) != -1){
                        if(typeof encuesta.aplicados != 'undefined'){
                            this.text += 'Encuesta,Nombre,Contacto'
                            for(var x = 0; x < encuesta.preguntas.length; x++){
                                this.text += ',' + encuesta.preguntas[x].pregunta
                            }
                            this.text += '\r\n'
                            for(var index in encuesta.aplicados){
                                this.text += encuesta.titulo
                                let temp = encuesta.aplicados[index]
                                this.text += ',' + temp.perfil.nombre +',"' + temp.perfil.contacto + '"'
                                for(var tt = 0; tt < temp.respuestas.length; tt++){
                                    var resp = ''
                                    if(typeof temp.respuestas[tt] == 'object'){
                                        let ot = temp.respuestas[tt]
                                        for(var tm = 0; tm < ot.length; tm++){
                                            if(tm == 0){
                                                resp = ot[tm]
                                            }else{
                                                resp += ' | ' + ot[tm]
                                            }
                                        }
                                    }else{
                                        resp = temp.respuestas[tt]
                                    }
                                    this.text += ',' + resp
                                }
                                this.text += '\r\n'
                            }
                        }
                    }
                })
            })
        })
    }

    ngOnInit(){}

     crearCSV(){
         if(this.text.length > 0){
            let options = { 
                type: 'text/csv;charset=utf-8' 
            }
            let fecha = new Date()
            let filename = btoa(fecha.toString()) + '.csv'
            saveAs(new Blob([this.text], options), filename)
         }
     }
}
