import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NgForm } from '@angular/forms'

//services
import { InnovaService } from '../../services/innova.service'
import { GeneralService } from '../../services/gral.services'

@Component({
  selector: 'app-aplicar-encuesta',
  templateUrl: './aplicar-encuesta.component.html'
})
export class AplicarEncuestaComponent implements OnInit {

    private idEncuesta : string
    private primitiva : any
    private primitivas : any[] = []
    private cliente : any
    
    constructor(
        private router : Router,
        private route : ActivatedRoute,
        private is : InnovaService,
        private gral : GeneralService
    ) { }

    ngOnInit() {
        this.cliente = this.is.clientesTodos()
        this.idEncuesta = this.route.snapshot.params['idEncuesta']
        this.primitiva = this.is.cargaEvaluacion(this.idEncuesta)
        if(typeof this.primitiva.preguntas !== 'undefined'){
            Object.keys(this.primitiva.preguntas).map((key) => {
                this.primitivas.push(this.primitiva.preguntas[key])
            })
        }
   }

    ir_a(){
        this.router.navigate(['/aprendizaje',1])
    }

    guardarEncuesta(todo : NgForm){
        var forma = todo.value
        var clienteId : string = ''
        var arreglo = {}
        for(let key in forma){
            if(forma.hasOwnProperty(key)){
                if(key == 'idCliente'){
                    clienteId = forma[key]
                }else{
                    let punto = key.indexOf('.')
                    if(punto != -1){
                        let index = key.substring(0, punto)
                        if(typeof arreglo[index] == 'undefined'){
                            arreglo[index]  = []
                        }
                        var data = forma[key]
                        if(data == ""){
                            data = false
                        }
                        var valor = {'dato' : data}
                        arreglo[index] .push(valor)
                    }else{
                        arreglo[key] = (forma[key])
                    }
                }
            }
        }
        this.is.guardaEvaluacion(arreglo, this.idEncuesta, clienteId).then(_ => {
            this.gral.abrirDialogo(1)
            todo.reset()
        }).catch(err => {
            console.error(err)
            this.gral.abrirDialogo(2)
        })
    }


}
