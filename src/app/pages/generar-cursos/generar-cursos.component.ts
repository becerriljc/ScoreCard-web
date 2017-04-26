import { Component, OnInit } from '@angular/core'
import { MdDialog } from '@angular/material'
import { CursosService } from '../../services/cursos.service'
import { NuevoCursoComponent } from '../../shared/dialog/nuevo-curso/nuevo-curso.component'
import { AplicaCursoComponent } from '../../shared/dialog/aplica-curso/aplica-curso.component'
import { NotificacionesComponent } from '../../shared/dialog/notificaciones/notificaciones.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-generar-cursos',
  templateUrl: './generar-cursos.component.html',
  styleUrls: ['./generar-cursos.component.scss']
})
export class GenerarCursosComponent implements OnInit {

    item : any
    todosCursos : any[] = []

    constructor(
        private cs : CursosService,
        private dialog : MdDialog,
        private router : Router) {
        cs.regresaCursos().subscribe(c => {
            this.todosCursos = c
        })
    }

  ngOnInit() {
  }

   abrirDialogo(opc : number){
        let dialogRef = this.dialog.open(NuevoCursoComponent, {
            width: '550px',
            height: '400px'
        })
        dialogRef.componentInstance.opcion = opc
        dialogRef.afterClosed().subscribe(result => {
        })
    }

    ir_a(idCurso : string){
        let dialogRef = this.dialog.open(AplicaCursoComponent, {
            width: '550px',
            height: '400px'
        })
        dialogRef.componentInstance.key = idCurso
    }

    convertirFecha(dato : number){
        var fecha = new Date(dato)
        return fecha
    }

    editarCurso(key : string, opc : number){
        let dialogRef = this.dialog.open(NuevoCursoComponent, {
            width: '550px',
            height: '400px'
        })
        dialogRef.componentInstance.opcion = opc
        dialogRef.componentInstance.llave = key
        dialogRef.afterClosed().subscribe(result => {
        })
    }

    borrarCurso(key : string){
        let dialogRef = this.dialog.open(NotificacionesComponent, {
            width: '350px',
            height: '200px'
        })
        dialogRef.componentInstance.opcion = 3
        dialogRef.afterClosed().subscribe(result => {
            if(result == 'true'){
                this.cs.eliminaCurso(key)
            }
        })
    }

}
