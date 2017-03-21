import { Injectable } from '@angular/core'
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2'
import { EncabezadoProceso } from '../interface/proto.evaluacion'
import { PreguntaInterface } from '../interface/pregunta.interface'

@Injectable()
export class InnovaService {

    items: FirebaseListObservable<any[]>
    preguntas : FirebaseListObservable<any[]>

    constructor( private af : AngularFire ) { }

    cargaPreguntas(llave : string){
        this.preguntas = this.af.database.list('/iQOtBOgCQTagAxU7UF836H8OR9t2/procesos/' + llave + '/preguntas')
        return this.preguntas
    }

    cargaResult(){
        this.items = this.af.database.list('/iQOtBOgCQTagAxU7UF836H8OR9t2/procesos', {
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
        let encuesta : EncabezadoProceso = {
            titulo: _titulo,
            descripcion : _desc
        }

        return this.items.push( encuesta )
    }

    agregarPregunta(_clave : string, valor : any ){
        let pregunta : PreguntaInterface = {
            clave : _clave
        }
        return this.preguntas.push(pregunta)
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

}
