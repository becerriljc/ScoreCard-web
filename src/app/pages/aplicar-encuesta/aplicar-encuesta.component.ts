import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NgForm } from '@angular/forms'

//services
import { InnovaService } from '../../services/innova.service'
import { GeneralService } from '../../services/gral.services'
import { EncuestasService } from '../../services/encuestas.services'
import { ClientesService } from '../../services/clientes.services'

@Component({
  selector: 'app-aplicar-encuesta',
  templateUrl: './aplicar-encuesta.component.html'
})
export class AplicarEncuestaComponent implements OnInit {

    private idEncuesta : string = ''
    private clientes : any[] = []
    private encuestaNom : string = ''
    private encuestaDesc : string = '' 
    private preguntas : any[] = []
    
    constructor(
        private router : Router,
        private route : ActivatedRoute,
        private is : InnovaService,
        private gral : GeneralService,
        private es : EncuestasService,
        private cs : ClientesService
    ) {
        cs.obtClientes().subscribe(listado => {
            this.clientes = listado
        })
        this.idEncuesta = this.route.snapshot.params['idEncuesta']
        es.obtPreguntas(this.idEncuesta).subscribe(encuesta => {
            this.encuestaNom = encuesta.titulo
            this.encuestaDesc = encuesta.descripcion
            this.preguntas = encuesta.preguntas
        })
    }

    ngOnInit() {}

    ir_a(){
        this.router.navigate(['/aprendizaje',1])
    }

    guardarEncuesta(todo : NgForm){
        let forma = todo.value
        let cliente = this.clientes[forma.idCliente].perfil
        let clienteId = this.clientes[forma.idCliente].$key
        var arreglo = {}
        for(let key in forma){
            if(forma.hasOwnProperty(key)){
                if(key != 'idCliente'){
                    let punto = key.indexOf('.')
                    if(punto != -1){
                        let index = key.substring(0, punto)
                        if(typeof arreglo[index] == 'undefined'){
                            arreglo[index]  = []
                        }
                        let data = forma[key]
                        if(data != false && data != null){
                            let opc = key.substring((punto + 1), key.length) 
                            let res = this.preguntas[index].opciones[opc].valor
                            arreglo[index].push(res)
                        }
                    }else{
                        arreglo[key] = forma[key]
                    }
                }
            }
        }
        this.es.aplicarEncuesta(arreglo, this.idEncuesta, clienteId, cliente).then(_ => {
            this.gral.abrirDialogo(1)
            todo.reset()
        }).catch(err => {
            this.gral.abrirDialogo(2)
        })
    }
}
