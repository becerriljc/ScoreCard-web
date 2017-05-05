import { Injectable } from '@angular/core'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'


import { ICurso } from '../interface/curso.interface'

@Injectable()
export class CursosService {

    cursos : FirebaseListObservable<ICurso[]>
    cursos_usuario : FirebaseListObservable<any[]>

    constructor(private af : AngularFire) { 
        this.cursos = af.database.list('cursos')
        this.cursos_usuario = af.database.list('cursos-usuario')
    }

    regresaCursos(){
        return this.cursos
    }

    regresaCursosUsuario(){
        return this.cursos_usuario
    }

    detalleCurso(key : string){
        return this.af.database.object('cursos/' + key)
    }

    eliminaCurso(key : string){
        return this.cursos.remove(key).then(_ => {
            this.af.database.list('cursos-usuario').remove(key)
        })
    }

    editaCurso(key : string, objeto : any){
        let item = {
            calificacion_min : objeto.calificacion_min,
            timestamp : objeto.fecha_creacion.getTime(),
            nombre : objeto.nombre
        }
        return this.cursos.update(key, item).then(_ => {
            this.af.database.list('cursos-usuario').update(key, {info : item})
        })
    }

    agregarCurso(objeto : any){
        let item = {
            calificacion_min : objeto.calificacion_min,
            timestamp : objeto.fecha_creacion.getTime(),
            nombre : objeto.nombre
        }
        return this.cursos.push(item).then(val => {
            this.af.database.list('cursos-usuario').update(val.key, {info: item})
        })
    }

    addCursoUsuario(idCurso : string, uid : string, dtUser : any, _calificacion : string){
        let path = 'cursos-usuario/' + idCurso + '/asistentes/'
        let data = {
            perfil : dtUser,
            calificacion : _calificacion
        }
        return this.af.database.list(path).update(uid, data)
    }

}
