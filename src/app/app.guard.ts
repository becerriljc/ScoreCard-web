import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AngularFire } from 'angularfire2'

@Injectable()
export class VerificaAuth implements CanActivate {
        
        constructor(private router : Router, private af : AngularFire){}

        canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){
            this.af.auth.subscribe( (auth) => {
                if(auth){
                    return true
                }else{
                    this.router.navigate(['/login'], {queryParams : { returnUrl : state.url }})
                    return false
                }
            })

            return true
        }
}