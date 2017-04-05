import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material'

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

    opcion : number
    private titulo : string
    private mensaje : string
    private txtBtn1 : string
    private txtBtn2 : string

    constructor(private dialogRef: MdDialogRef<NotificacionesComponent>) {
     }

    ngOnInit() {
      switch(this.opcion){
        case 1 : this.titulo = 'Datos guardados'
                      this.mensaje = 'Sus datos fueron almacenados exitosamente.'
                      this.txtBtn2 = 'Aceptar'
                      break
        case 2: this.titulo = 'Error'
                      this.mensaje = 'Se produjo un error al almacenar los datos, favor de contactar a su administrador.'
                      this.txtBtn2 = 'Aceptar'
                      break
        case 3: this.titulo = 'Eliminar elemento'
                      this.mensaje = '¿Desea eliminar el elemento seleccionado?'
                      this.txtBtn1 = 'No'
                      this.txtBtn2 = 'Si'
                      break              
        default : break
      }
    }

    cerrar(){
      this.dialogRef.close('true')
    }

    cancelar(){
      this.dialogRef.close('false')
    }

}
