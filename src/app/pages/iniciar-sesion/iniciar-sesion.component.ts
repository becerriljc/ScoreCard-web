import { Component, OnInit } from '@angular/core'
import { InnovaService } from '../../services/innova.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls : ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  public  sesionForm : FormGroup

  constructor(
    public is : InnovaService,
    private _fb : FormBuilder,
    private router : Router) { }

  ngOnInit() {
    this.sesionForm = this.initForm()
  }

  initForm(){
    return this._fb.group({
             usuario : ['', [Validators.required, Validators.minLength(4), Validators.email]],
             clave_ingreso : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  logeo(){
    this.is.iniciarSesion(this.sesionForm.value.usuario, this.sesionForm.value.clave_ingreso)
    .then((data) => {
        localStorage.setItem('user', JSON.stringify(data))
    } )
  }

  validarForm() : boolean{
    return this.sesionForm.invalid
  }

}
