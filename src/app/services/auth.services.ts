import { Injectable } from '@angular/core'
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2'
import * as firebase from 'firebase'

import { Credenciales } from '../interface/credencial.interface'

@Injectable()
export class AuthServices {
        constructor(private af : AngularFire){}

        login(obj : Credenciales ) {
            return this.af.auth.login({
                email : obj.usuario,
                password : obj.clave_acceso
            },{
                provider : AuthProviders.Password,
                method : AuthMethods.Password
            })
        }

        logout(){
            return this.af.auth.logout()
        }
}