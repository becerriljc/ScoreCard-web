import { Component, OnInit } from '@angular/core'
import { XmlHttpRequestService } from '../../services/xmlhttprequest.service'

@Component({
  selector: 'app-pruebas-web-service',
  templateUrl: './pruebas-web-service.component.html',
  styleUrls: ['./pruebas-web-service.component.scss']
})
export class PruebasWebServiceComponent implements OnInit {

    private elementos : any[] = []

    constructor(private http : XmlHttpRequestService ) { }

    ngOnInit() {
      let url = ' http://74.208.149.17:8080/samx24abr/ws/dal/BusinessPartner?where=customer=true&includeChildren=false&firstResult10&maxResult=50'
      let erl = 'http://74.208.149.17:8080/samx24abr/ws/dal/BusinessPartner'

      this.http.gets(url).subscribe(result => {
        this.elementos = result['BusinessPartner']
        console.log(this.elementos)
      })
    }
}
