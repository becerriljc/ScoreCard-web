import { Injectable } from '@angular/core'
import {AngularFire } from 'angularfire2'

@Injectable()
export class UsuarioService {

    constructor(private af : AngularFire ) { }

    obtenerUsuarios(){
      return this.af.database.list('usuarios')
    }

    detUsuario(uid : string){
      return this.af.database.object('usuarios/uid')
    }
    

}
