import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthServices } from '../../services/auth.services'
import { AppService } from '../../app.service'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls : ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit, OnDestroy {

  public  sesionForm : FormGroup
  private error : string = ''

  constructor(
    private appService : AppService,
    public as : AuthServices,
    private _fb : FormBuilder,
    private router : Router) { 
        appService.getState().topnavTitle = "Iniciar Sesión"
        appService.getState().pageFullscreen = true
    }

    ngOnInit() {
      this.sesionForm = this.initForm()
    }

    ngOnDestroy(){
        this.appService.getState().pageFullscreen = false
    }

    initForm(){
      return this._fb.group({
              usuario : ['', [Validators.required, Validators.minLength(4), Validators.email]],
              clave_acceso : ['', [Validators.required, Validators.minLength(6)]]
      })
    }

    iniciarSesion(){
      this.as.login(this.sesionForm.value).then( (res) => {
          this.router.navigate([''])
          localStorage.setItem('user', res.uid)
      }).catch( (err) => {
          this.error = 'El usuario y/o contraseña  incorrecto.'
          console.error('HUBO UN ERROR', err)
      })
    }

    validarForm() : boolean{
      return this.sesionForm.invalid
    }
}
