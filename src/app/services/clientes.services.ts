import { Injectable } from '@angular/core'
import { AngularFire } from 'angularfire2'

@Injectable()
export class ClientesService {

    private datos : {
        uid: string,
        categoria : string
    }

    constructor(private af : AngularFire){
        this.datos = JSON.parse(localStorage.getItem('user'))
    }

    obtDatos(){
        return this.datos
    }

    obtClientes(){
        return this.af.database.list('clientes')
    }

    obtClientesPropios(){
        return this.af.database.list(this.datos.categoria + '/' + this.datos.uid + '/clientes')
    }

    obtClientesSupervisor(){
        return this.af.database.list(this.datos.categoria + '/' + this.datos.uid + '/supervisores')
    }

    obtClientesVendedor(){
        return this.af.database.list(this.datos.categoria + '/' + this.datos.uid + '/vendedores')
    }
}