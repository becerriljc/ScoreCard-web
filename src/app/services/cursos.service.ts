import { Injectable } from '@angular/core'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'


import { ICurso } from '../interface/curso.interface'

@Injectable()
export class CursosService {

    cursos : FirebaseListObservable<ICurso[]>
    usuario_curso : FirebaseObjectObservable<any>

    constructor(private af : AngularFire) { 
        this.cursos = af.database.list('cursos')
    }

    regresaCursos(){
        return this.cursos
    }

    detalleCurso(key : string){
        return this.af.database.object('cursos/' + key)
    }

    eliminaCurso(key : string){
        return this.cursos.remove(key)
    }

    editaCurso(key : string, objeto : any){
        let item = {
            calificacion_min : objeto.calificacion_min,
            timestamp : objeto.fecha_creacion.getTime(),
            nombre : objeto.nombre
        }
        return this.cursos.update(key, item)
    }

    agregarCurso(objeto : any){
        let item = {
            calificacion_min : objeto.calificacion_min,
            timestamp : objeto.fecha_creacion.getTime(),
            nombre : objeto.nombre
        }
        return this.cursos.push(item)
    }

}
