import { Component, OnInit } from '@angular/core'
import { saveAs } from 'file-saver'

//servicios firebase
import { EncuestasService } from '../../services/encuestas.services'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html'
})
export class ReportesComponent implements OnInit {

  filtrado : string
  encuestas : any[] = []

  constructor( private es : EncuestasService ) {
    es.obtEncuestasUser().subscribe(listado => {
      let keys = Object.keys(listado)
      es.obtEncuestasClientes().subscribe(lista => {
          lista.forEach(encuesta => {
              if(keys.indexOf(encuesta.$key) != -1){
                this.encuestas.push(encuesta)
              }
          })
      })
    })
  }

    ngOnInit() {}

    generaReporteIndividual(uid : string){
      this.es.obtEncuestaReporte(uid).subscribe(encuesta => {
        var texto : string = ''
        if(typeof encuesta.aplicados != 'undefined'){
            texto+= 'Nombre,Contacto'
            for(var x = 0; x < encuesta.preguntas.length; x++){
                texto+= ',' + encuesta.preguntas[x].pregunta
            }
            texto+= '\r\n'
            for(var index in encuesta.aplicados){
                let temp = encuesta.aplicados[index]
                texto += temp.perfil.nombre + ',"' + temp.perfil.contacto + '"'
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
                    texto += ',' + resp
                }
                texto += '\r\n'
            }
        }
        if(texto.length > 0){
          let options = { 
            type: 'text/csv;charset=utf-8' 
          }
          let fecha = new Date()
          let filename = 'reporte-individual-' + encuesta.titulo + '-' + fecha + '.csv'
          saveAs(new Blob([texto], options), filename)
        }
      })
    }
}
