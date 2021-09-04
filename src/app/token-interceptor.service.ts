import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _auth : AuthService) { console.log('working');}

  intercept(req:any,next:any){

    console.log('working');
    
    let tokenReq = req.clone({
      setHeaders:{
        authorization : `Bearer ${this._auth.loggedToken()}`,
      }
    })
    return next.handle(tokenReq);

  }
}
