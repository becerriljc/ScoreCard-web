import { Component, OnInit } from '@angular/core'

//servicios firebase
import { InnovaService } from '../../services/innova.service'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html'
})
export class ReportesComponent implements OnInit {

  constructor(private is : InnovaService) { }

  ngOnInit() {
  }

}
