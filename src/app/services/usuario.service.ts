import { Injectable } from '@angular/core'
import {AngularFire } from 'angularfire2'

@Injectable()
export class UsuarioService {

    private datos : {
      uid : string,
      categoria : string
    }
    constructor(private af : AngularFire ) { 
      this.datos = JSON.parse(localStorage.getItem('user'))
    }

    obtenerUsuarios(){
      return this.af.database.list('usuarios')
    }

    detUsuario(uid : string){
      return this.af.database.object('usuarios/' + uid)
    }

    obtDatos(){
      return this.datos
    }

    obtUsuarios(){
      return this.af.database.object(this.datos.categoria + '/' + this.datos.uid)
    }
    

}
