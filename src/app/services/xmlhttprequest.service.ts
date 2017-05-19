import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import * as X2JS  from 'x2js'

/**
 * Ejemplo de Web Services 
 */

@Injectable()
export class XmlHttpRequestService {
    
    constructor(){}
 

    gets(url : string){
        return Observable.fromPromise(new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, true, 'tracking', 'tracking')
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa('tracking:tracking'))
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        let strXML = new XMLSerializer().serializeToString(xhr.responseXML)
                        let json = new X2JS().xml2js(strXML)
                        resolve(json['Alendum'])
                    }else{
                        reject(xhr.response)
                    }
                }
            }
            xhr.send(null)
        })) 
    }

}