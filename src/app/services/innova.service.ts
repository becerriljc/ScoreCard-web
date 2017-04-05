import { Injectable } from '@angular/core'
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseObjectObservable } from 'angularfire2'
import { Encabezado } from '../interface/encabezado.interface'
import { Caracteristica, Preguntas, Conjunto } from '../interface/item.interface'

@Injectable()
export class InnovaService {

    items: FirebaseListObservable<any[]>
    preguntas : FirebaseListObservable<any[]>

    item : FirebaseListObservable<any[]>

    editar : any

    constructor( public af : AngularFire ) { }

    iniciarSesion(user : string, pass : string){
        return this.af.auth.login({
            email: user,
            password: pass
            }, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        })
    }

    cerrarSesion(){
        return this.af.auth.logout()
    }

    cargaPreguntas(llave : string){

        var text = localStorage.getItem('user') + '/procesos/' + llave + '/preguntas'
        this.preguntas = this.af.database.list(text)
        return this.preguntas
    }

    cargaEvaluacion(llave : string){
        var text = localStorage.getItem('user') + '/procesos/' + llave
        var data : any = null
        this.af.database.object(text).forEach(item => {
            data = item
        })
        return data
    }

    cargaResult(){
        this.items = this.af.database.list(localStorage.getItem('user') + '/procesos', {
            query : {
                limitToLast: 20,
                orderByKey: true
            }
        })
        return this.items
    }

    eliminaEncuesta(llave : string ){
        return this.items.remove(llave)
    }

    agregarEncuesta(_titulo : string, _desc : string){
        let encuesta : Encabezado = {
            titulo: _titulo,
            descripcion : _desc
        }

        return this.items.push( encuesta )
    }

    addEncuesta(encuesta : Caracteristica){
        return this.items.push( encuesta )
    }

    agregarPregunta(obj : Preguntas){       
        return this.preguntas.push(obj)
    }

    login(_email : string, _password : string) {
        this.af.auth.login({
            email: _email,
            password: _password,
        },{
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
        })
    }

    logout() {
        this.af.auth.logout()
    }

    insertaPreguntas(coleccion : any[]){
        for(var i = 0; i < coleccion.length; i++){
            this.preguntas.push(coleccion[i])
        }
    }

    resultadoVector(llave : string){
        var data : any[] = []
        var text = localStorage.getItem('user') + '/procesos/' + llave + '/preguntas'
        this.af.database.list(text).forEach(result => {
            data.push(result)
        })
        return data[0]
    }
}
