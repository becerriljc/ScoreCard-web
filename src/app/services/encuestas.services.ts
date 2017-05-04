import { Injectable } from '@angular/core'
import { AngularFire, FirebaseListObservable } from 'angularfire2'

import { Caracteristica, Preguntas, Conjunto } from '../interface/item.interface'

@Injectable()
export class EncuestasService {

        private datos : {
            uid : string,
            categoria : string
        }

        private gralEncuestas : FirebaseListObservable<any[]>

        constructor(private af : AngularFire){
            this.datos = JSON.parse(localStorage.getItem('user'))
            this.gralEncuestas = af.database.list('encuestas/' + this.datos.uid)

        }

        addEncuesta(encuesta : Caracteristica){
            return this.gralEncuestas.push(encuesta).then(newId => {
                return this.af.database.list('encuestas-cliente').update(newId.key, {
                    preguntas : encuesta.preguntas,
                    titulo : encuesta.titulo
                })
            })
        }

        updEncuesta(forma : Caracteristica, eId : string){
            let path1 = 'encuestas/' + this.datos.uid + '/' + eId
            let path2 = 'encuestas-cliente/' + eId + '/titulo'
            let path3 = 'encuestas-cliente/' + eId + '/preguntas'
            var multipath = {}
            multipath[path1] = forma
            multipath[path2] = forma.titulo
            multipath[path3] = forma.preguntas

            return this.af.database.object('').update(multipath)
        }

        remEncuesta(eId : string){
            return this.gralEncuestas.remove(eId).then(_ => {
                return this.af.database.list('encuestas-cliente/').remove(eId)
            })
        }

        obtEncuestas(){
            return this.gralEncuestas
        }

        cargaEncuesta(eId : string){
            var data : any = null
            this.af.database.object('encuestas/' + this.datos.uid + '/' + eId).forEach(item => {
                data = item
            })
            return data
        }
}