import { Component, OnInit } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

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
    forma : FormGroup

    pNumero : string = '[0-9]+(\.[0-9]{1,2})?'

    constructor(
      private dialogRef: MdDialogRef<AplicaCursoComponent>,
      private cs : CursosService,
      private us : UsuarioService,
      private fb : FormBuilder
    ) {
        this.forma = this.initForm()
    }

    ngOnInit() {
        this.cs.detalleCurso(this.key).subscribe(dato => this.curso = dato)
        this.us.obtenerUsuarios().subscribe(users => this.usuarios = users)
    }

    initForm(){
        return this.fb.group({
            idUsuario : ['', [Validators.required]],
            calificacion : ['',[Validators.required, Validators.pattern(this.pNumero)]]
        })
    }

    califica(frm : FormGroup){
        this.cs.addCursoUsuario(this.key, frm.value.idUsuario, this.buscaObjeto(frm.value.idUsuario), frm.value.calificacion)
        this.forma = this.initForm()
    }

    verifica(frm : FormGroup) : boolean{
        return frm.invalid
    }

    buscaObjeto(idBuscar : string){
        var data : any = null
        var i : number = 0
        var found : boolean = false

        while( (i < this.usuarios.length) && !found){
            if(this.usuarios[i].$key == idBuscar){
                data = this.usuarios[i].perfil
                found = true
            }
            i++
        }
        return data
    }


    cerrar(){
        this.dialogRef.close('false')
    }

}
