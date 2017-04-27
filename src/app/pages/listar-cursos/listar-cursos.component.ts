import { Component, OnInit } from '@angular/core'
import { CursosService } from '../../services/cursos.service'

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.scss']
})
export class ListarCursosComponent implements OnInit {

    cursosAplicados : any[] = []
    filtrado : string

    constructor(private cs : CursosService) { 
      cs.regresaCursosUsuario().subscribe(cursos => {
          this.cursosAplicados = cursos
      })
    }

    ngOnInit() {}

    convertirFecha(dato : number){
        return new Date(dato)
    }

}
