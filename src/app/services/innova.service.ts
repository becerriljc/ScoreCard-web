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

    // observador para ejecutar acciones DML
    acciones: FirebaseObjectObservable<any>
    encuestas : FirebaseListObservable<any[]>
    encuestados : FirebaseObjectObservable<any>

    reportePregunta : FirebaseObjectObservable<any>
    reporteRespuesta : FirebaseObjectObservable<any>
    valores : FirebaseObjectObservable<any>

    root : string = 'encuestas/' + localStorage.getItem('user')

    private arrayEncuesta : any[] = []

    constructor( public af : AngularFire ) {
        this.encuestas = af.database.list(this.root, {
            query : {
                orderByKey: true
            }
        })
        this.valores = af.database.object('encuestas', {preserveSnapshot : true})
    }

    regresaEncuestas() {
        return this.arrayEncuesta
    }

    regresaEncuestados(llave : string){
        var listado : { nombre : string }[] = []
        this.encuestados = this.af.database.object('clientes', {preserveSnapshot : true})
        this.encuestados.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                var aprobado = false
                snapshot.forEach(snapshott => {
                    if(snapshott.key == 'encuestas'){
                        snapshott.forEach(snapshotd => {
                            if(snapshotd.key == llave){
                                aprobado = true
                            }
                        })
                    }
                    if(snapshott.key == 'perfil' && aprobado){
                        listado.push({nombre : snapshott.val().nombre})
                    }
                })
            })
        })
        return listado
    }

    establecerUid(uid : string){
        this.reportePregunta = this.af.database.object('encuestas/' + uid, {preserveSnapshot : true})
        this.reporteRespuesta = this.af.database.object('clientes', {preserveSnapshot : true})
    }

    establecerPreguntas(){
        var vector : {llave : string, valor : string}[] = []
        var todo : string = ''
        var titulo : string = ''
        var llave : string = ''
        var respuestas : string = ''
        var cont = 0
        this.reportePregunta.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                todo = "Nombre cliente"
                titulo = 'Encuesta:'
                cont = 0
                llave = snapshot.key
                var elemento = {llave : snapshot.key, valor : ''}
                snapshot.forEach(snapshotd => {
                    if(snapshotd.key == 'preguntas'){
                        snapshotd.forEach(item => {
                            todo += ',' + item.val().pregunta
                        })
                        cont++
                        todo += '\r\n'
                    }
                    if(snapshotd.key == 'titulo'){
                        titulo += ',' + snapshotd.val() + '\r\n'
                        cont++
                    }
                    if(cont == 2){
                        elemento.valor = titulo + todo
                        vector.push(elemento)
                    }
                })
            })
        })
        return vector
    }

    establecerRespuesta(eid : string){
        var completo : string = ''
        this.reporteRespuesta.subscribe(clientes => {
            clientes.forEach(cliente => {
                var x : number = 0
                var name : string = ''
                var texto : string = ''
                cliente.forEach(items => {
                    if(items.key == 'encuestas'){
                        items.forEach(encuesta => {
                            if(encuesta.key == eid){
                                encuesta.forEach(res => {
                                    if(typeof res.val() == 'object'){
                                        var sub = ''
                                        res.forEach(valores => {
                                            sub += valores.val().dato + ' '
                                        })
                                        texto += ',' + sub
                                    }else{
                                        texto += ',' + res.val()
                                    }
                                })
                                x++
                            }
                        })
                    }
                    if(items.key == 'perfil'){
                        name = items.val().nombre
                        x++
                    }
                    if(x == 2){
                        completo += name + texto + '\r\n'
                    }
                })
            })
        })
        return completo
    }


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

    capturaClientes(){
        this.valores = this.af.database.object('encuestas', {preserveSnapshot : true})
    }

    cargaEncuesta(){
        this.items = this.af.database.list(this.root, {
            query : {
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

    guardaEvaluacion(datos : any, encuestaId : string, clienteId : string){
        let path = 'clientes/' + clienteId + '/encuestas/' + encuestaId
        this.acciones = this.af.database.object(path)
        return this.acciones.set(datos)
    }

    async encuentraValor(idEncuesta : string, keyPregunta : string, keyOpcion){
        var result : string = ''
        await this.valores.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                snapshot.forEach(items => {
                    if(items.key == idEncuesta){
                        items.forEach(item => {
                            if(item.key == 'preguntas'){
                                item.forEach(pregunta => {
                                    if(pregunta.key == keyPregunta){
                                        pregunta.forEach(res =>{
                                            if(res.key == 'opciones'){
                                                res.forEach(value => {
                                                    if(value.key == keyOpcion){
                                                        result = value.val().valor
                                                        
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            })
        })
        return result
    }
}
