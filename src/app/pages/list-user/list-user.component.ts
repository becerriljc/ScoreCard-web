import { Component, OnInit } from '@angular/core'

//servicios
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

    private filtrado : string
    private usuarios : any[] = []
    
    constructor(
      private us : UsuarioService
    ) { 
      let categoriaU = us.obtDatos().categoria
      if( (categoriaU == 'gerentes') || (categoriaU == 'supervisores') ){
          us.obtUsuarios().subscribe(user => {
              var keys = []
              var gerente = false
              if(categoriaU == 'gerentes'){
                keys = Object.keys(user.supervisores)
                for(let j in user.supervisores){
                  let interno = user.supervisores[j]
                  if(typeof interno.vendedores != 'undefined'){
                    keys = keys.concat(Object.keys(interno.vendedores))
                  }
                }
              }
              if(categoriaU == 'supervisores'){
                keys = Object.keys(user.vendedores)
              }
              us.obtenerUsuarios().subscribe(us => {
                us.forEach(usuario => {
                  if(keys.indexOf(usuario.$key) != -1){
                    this.usuarios.push(usuario)
                  }
                })
              })
          })
      }
    }

    accion(uid : any){
      console.log('El user es: ',uid)
    }

    ngOnInit() {
    }

}
