import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSpecialisteGuardGuard implements CanActivate {

  
  constructor(private _auth : AuthService,private _router : Router){};

  private async test(){

    return new Promise(async (resolve,reject)=>{

      if(!(!!localStorage.getItem('authorization'))){
        resolve(false)
      }
      
      (await this._auth.getInformation()).subscribe(
        res => {
          if(res.role ==='specialiste'){
            resolve(true);
          }
        else resolve(false)},
        err => {
          if(err instanceof HttpErrorResponse){
            resolve(false)
          }
        }
      )
    })
  }
 async canActivate(
    route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Promise<boolean>{
      let a = await this.test();
      // console.log(a);
      let b = !! a;
      // console.log(b);
      return b;
  }
  
}
