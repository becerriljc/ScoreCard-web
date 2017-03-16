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

  quest : string
  favoriteColor : string 
  tipoRespuesta : string

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
    {value : 'RESPUESTA CORTA', item : 1},
    {value : 'PARRAFO', item: 2},
    {value : 'OPCIONAL', item: 3},
    {value : 'CHECKBOX', item: 4}
  ]

  constructor(private dialogRef: MdDialogRef<AprendizajeForm>) {
  }

  ngOnInit(): void {
    this.quest = "hola"
    this.favoriteColor = "este"
  }

  
}
