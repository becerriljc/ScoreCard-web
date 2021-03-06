import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthServices } from '../../services/auth.services'
import { UsuarioService } from '../../services/usuario.service'
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
    public us : UsuarioService,
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
          this.us.detUsuario(res.uid).subscribe(resp => {
              let dato = {
                  uid : res.uid,
                  categoria : this.obtCategoria(resp.rol)
              }
              localStorage.setItem('user', JSON.stringify(dato))
              this.router.navigate([''])
          })
      }).catch( (err) => {
          this.error = 'El usuario y/o contraseña  incorrecto.'
          console.error('HUBO UN ERROR', err)
      })
    }

    validarForm() : boolean{
      return this.sesionForm.invalid
    }

    obtCategoria(rol : string) : string {
        var categoria : string = ''
        switch(rol){
            case 'supervisor' : categoria = 'supervisores'; break
            case 'gerente' : categoria = 'gerentes'; break
            case 'vendedor' : categoria = 'vendedores'; break
        }
        return categoria

    }
}
