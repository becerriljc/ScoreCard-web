import { Component, OnInit } from '@angular/core'
import { MdDialogRef } from '@angular/material'

//service
import { CursosService } from '../../../services/cursos.service'
import { UsuarioService } from '../../../services/usuario.service'

@Component({
  selector: 'app-aplica-curso',
  templateUrl: './aplica-curso.component.html',
  styleUrls: ['./aplica-curso.component.scss']
})
export class AplicaCursoComponent implements OnInit {

    curso : any
    usuarios : any[]
    key : string

    constructor(
      private dialogRef: MdDialogRef<AplicaCursoComponent>,
      private cs : CursosService,
      private us : UsuarioService
    ) {
        this.cs.detalleCurso(this.key).subscribe(dato => this.curso = dato)
        this.us.obtenerUsuarios().subscribe(users => this.usuarios = users)
    }

    ngOnInit() {}

    cerrar(){
        this.dialogRef.close('false')
    }

}
