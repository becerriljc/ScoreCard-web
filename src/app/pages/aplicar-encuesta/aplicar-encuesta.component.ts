import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

//services
import { InnovaService } from '../../services/innova.service'

@Component({
  selector: 'app-aplicar-encuesta',
  templateUrl: './aplicar-encuesta.component.html'
})
export class AplicarEncuestaComponent implements OnInit {

    private primitiva : any
    private primitivas : any[] = []
    private cliente : any
    
    constructor(
        private router : Router,
        private route : ActivatedRoute,
        private is : InnovaService
    ) { }

    ngOnInit() {
        this.cliente = this.is.clientesTodos()
        let idEncuesta = this.route.snapshot.params['idEncuesta']
        this.primitiva = this.is.cargaEvaluacion(idEncuesta)
        if(typeof this.primitiva.preguntas !== 'undefined'){
            Object.keys(this.primitiva.preguntas).map((key) => {
                this.primitivas.push(this.primitiva.preguntas[key])
            })
        }
   }

    ir_a(){
        this.router.navigate(['/aprendizaje',1])
    }

}
