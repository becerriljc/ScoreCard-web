import { Component, OnInit } from '@angular/core'
import { AppService } from '../../app.service'

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  constructor(private appService: AppService) { 
    appService.getState().topnavTitle = 'Personal'
  }

  ngOnInit() {
  }

}
