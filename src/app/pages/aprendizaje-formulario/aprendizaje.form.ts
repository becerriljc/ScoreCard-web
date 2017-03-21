import { Component, OnInit } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { MediaChange } from '@angular/flex-layout'

@Component({
  templateUrl: './aprendizaje.form.html',
  styleUrls: [
    './aprendizaje.form.scss'
  ]
})
export class AprendizajeForm implements OnInit {

    key : string
    quest : string
    favoriteColor : string 
    tipoRespuesta : string
    showImg1:string = 'hidden'
    showImg2:string = 'hidden'
    obg:boolean = false
    htmlText: string = ''
    z : number = 1

  forms: any = {
    titulo: null,
    descripcion: null,
    preguntas: null
  };

  prototipo : any = {
    pregunta : null,
    respuesta : {
        tipo: '',
        value : {}
    }
  }

  respuestas = [
    {value : 'Respuesta corta', item : 1},
    {value : 'Parrafo', item: 2},
    {value : 'Opcional', item: 3},
    {value : 'Checkbox', item: 4},
    {value : 'Desplegar', item: 5}
  ]

  constructor(
      private dialogRef: MdDialogRef<AprendizajeForm>
      ) {}

  ngOnInit(): void {
    this.quest = "hola"
    this.favoriteColor = "este"
  }

  addRow() {
     this.htmlText = this.htmlText + '<div><p>div inside parent - html builder ' +this. z +' </p></div>'
     this.z += 1
  }

  status(res:boolean): void {
      this.obg = res
  }

    show_quit(n1, n2){
      // n1 refiere a la función muestra (1) u oculta (2)
      // n2 refiere al elemento img1 (1) o img2 (2)
        if(n1 == 1){
            if(n2 == 1){
                this.showImg1 = 'visible'
            }else{
                this.showImg2 = 'visible'
            }
        }else{
            if(n2 == 1){
                this.showImg1 = 'hidden'
            }else{
                this.showImg2 = 'hidden'
            }
        }
    }
}
