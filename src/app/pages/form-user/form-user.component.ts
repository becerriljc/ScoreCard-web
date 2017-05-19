import { Component, OnInit, Output } from '@angular/core'
import { NgForm } from '@angular/forms'
import { FileUploader } from 'ng2-file-upload'
import * as firebase from 'firebase'

/**
 * Sube un archivo al Storage de Firebase
 */

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({url: 'https://evening-anchorage-3159.herokuapp.com/api/'});

    private roles = [
      {tipo: 'gerente', value : 'gerente'},
      {tipo: 'supervisor', value : 'supervisor'},
      {tipo: 'vendedor', value : 'vendedor'}
    ]

    rol : string = ''
    img : File = null
    nombre : string = ''

    constructor() {}

    ngOnInit() {}

    guardarUsuario(forma : NgForm){
      let file : any
      var storageRef = firebase.storage().ref('/hola.jpg')
      storageRef.put(file)
    }

}
