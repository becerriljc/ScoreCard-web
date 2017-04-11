import { Injectable } from '@angular/core'
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseObjectObservable } from 'angularfire2'
import { Encabezado } from '../interface/encabezado.interface'
import { Caracteristica, Preguntas, Conjunto } from '../interface/item.interface'

@Injectable()
export class InnovaService {

    // observador de las encuestas
    items: FirebaseListObservable<any[]> 
    //observador de clientes
    clientes : FirebaseListObservable<any[]>

    root : string = 'encuestas/' + localStorage.getItem('user')

    constructor( public af : AngularFire ) { }

    cargaEvaluacion(llave : string){
        var data : any = null
        this.af.database.object(this.root  + '/' + llave).forEach(item => {
                data = item
        })
        return data
    }

    clientesTodos(){
        this.clientes =  this.af.database.list('clientes')
        return this.clientes
    }

    cargaEncuesta(){
        this.items = this.af.database.list(this.root, {
            query : {
                limitToLast: 20,
                orderByKey: true
            }
        })
        return this.items
    }

    actualizarEncuesta(ref : Caracteristica, llave: string){
        return this.af.database.object(this.root  + '/' + llave).set(ref)
    }

    eliminaEncuesta(llave : string ){
        return this.items.remove(llave)
    }

    addEncuesta(encuesta : Caracteristica){
        return this.items.push( encuesta )
    }

}
