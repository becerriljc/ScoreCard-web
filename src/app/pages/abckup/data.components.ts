import { FormGroup, FormControl, Validators } from '@angular/forms'

export class DataComponent {
    forma : FormGroup

    constructor(){
        this.forma = new FormGroup({
            //asignar cada uno de estos campos a un formControlName en los campos del formulario
            'nombre' : new FormControl('JuanC', [Validators.required]), 
             'apellido' : new FormControl('Becerril', [Validators.required]),
              'correo' : new FormControl('algo@algo.com', [
                  Validators.required, 
                  Validators.pattern("^abc$")
                  ])
        })
    }
}


/*
<form [FormGroup]="forma" (ngSubmit)="guardar()" novalidate>
</form>
*/ 