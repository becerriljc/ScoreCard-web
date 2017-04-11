import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { AppService } from '../../app.service'

@Component({
    selector: 'lk-aprendizaje',
    templateUrl: './aprendizaje.component.html',
    styleUrls: [
        './aprendizaje.component.scss'
    ]
})

export class Aprendizaje implements OnInit{

    selectIndex: number = 0

    constructor(
        private appService: AppService,
        private route : ActivatedRoute
    ){
        appService.getState().topnavTitle = 'Aprendizaje / Innovación';
    }

    ngOnInit(){
        let pestana = this.route.snapshot.params['idPestana']
        if(pestana != 'undefined'){
            this.selectIndex = pestana
        }
     }
}
