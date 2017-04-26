import { Component, OnInit } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { CursosService } from '../../../services/cursos.service'
import { ICurso } from '../../../interface/curso.interface'

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.scss']
})
export class NuevoCursoComponent implements OnInit {

    opcion : number
    llave : string
    valores : any
    forma : FormGroup
    pNombre : string = '[A-Za-z][ |a-zA-Z0-9]+'
    pNumero : string = '[0-9]+(\.[0-9]{1,2})?'
    btnAccion : string ="Agregar curso"

    original = {
        nombre : '',
        calificacion: '',
        fecha: new Date()
    }

    constructor(private dialogRef: MdDialogRef<NuevoCursoComponent>,
                          private fb : FormBuilder,
                          private cs : CursosService
                        ) { }

    ngOnInit() {
        if(this.opcion == 2){
            this.btnAccion = 'Actualizar curso'
            this.cs.detalleCurso(this.llave).subscribe(curso => this.valores = curso)
            this.forma = this.initFormCurso(this.valores)
        }else{
            this.forma = this.initFormCurso()
        }
    }

    initFormCurso(objeto? : any){
        if(objeto){
            this.original.nombre = objeto.nombre
            this.original.calificacion = objeto.calificacion_min
            this.original.fecha = new Date(objeto.timestamp)
        }
        return this.fb.group({
            nombre : [this.original.nombre, [Validators.required, Validators.minLength(4), Validators.pattern(this.pNombre)]],
            calificacion_min : [this.original.calificacion, [Validators.required, Validators.pattern(this.pNumero)]],
            fecha_creacion : [this.original.fecha, [Validators.required, Validators.minLength(8)]]    
        })
    }

    validaForma(forma : FormGroup){
      return forma.invalid
    }

    accion(forma : FormGroup){
      if(this.opcion == 1){
          this.cs.agregarCurso(forma.value).then(_ => {
              this.forma = this.initFormCurso()
          }).catch(err => {
              console.error(err)
          })
      }else{
          this.cs.editaCurso(this.llave, forma.value).then(_ => {
              this.original.nombre = forma.value.nombre
              this.original.calificacion = forma.value.calificacion_min
              this.original.fecha = forma.value.fecha_creacion
              this.forma = this.initFormCurso()
          }).catch(err => {
              console.error(err)
          })
      }
    }
    
    cerrar(){
        this.dialogRef.close('cerrar')
    }   

}
