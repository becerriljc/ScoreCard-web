import { Component, OnInit } from '@angular/core'

//servicios firebase
import { InnovaService } from '../../services/innova.service'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html'
})
export class ReportesComponent implements OnInit {

  filtrado : string
  encuestas : any[]

  constructor(private is : InnovaService) { 
    is.obtEncuestas().subscribe(enc => this.encuestas = enc)
  }

  ngOnInit() {
  }

}
