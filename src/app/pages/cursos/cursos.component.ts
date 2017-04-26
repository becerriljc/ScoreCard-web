import { Component, OnInit } from '@angular/core'
import { AppService } from '../../app.service'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  private selectIndex : number = 0

  constructor(private appService: AppService) { 
      appService.getState().topnavTitle = 'Cursos'
  }

  ngOnInit() {
  }

}
