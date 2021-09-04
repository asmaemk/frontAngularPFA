import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $ :any;

@Component({
  selector: 'app-nav-bar-test',
  templateUrl: './nav-bar-test.component.html',
  styleUrls: ['./nav-bar-test.component.css']
})
export class NavBarTestComponent implements OnInit {

  public isLogged : boolean = true;
 public home : String = '/login';
 private role : String="";

  constructor(private _router : Router,private _auth : AuthService) {
    console.log(this.isLogged)
    // this.ngOnInit();
  }

  public signUp(){
    $('#elegantModalFormRegistre').modal('show');
  }
  public signIn(){
    $('#elegantModalForm').modal('show');
  }
  public profile(){


    switch(this.role){
      case 'client' :    this._router.navigate(['/home']); break;
      case 'specialiste' :    this._router.navigate(['/specialiste/home']);
       break;
       case 'admin':this._router.navigate(['/admin']);break;
    }
  }
  public log_out(){

    localStorage.removeItem('authorization');
    this._router.navigate(['/acceuil']);
    this.ngOnInit();
    // this.isLogged = false;

  }

  public log_in(){
    this._router.navigate(['/login']);
  }

  public registring(){

    this._router.navigate(['/registre/client']);

  }

  async ngOnInit(): Promise<void> {

    (await this._auth.getInformation()).subscribe(
      res => {
        console.log(res.role)
        this.role = res.role;
      },
      err => {
        if(err instanceof HttpErrorResponse){
           console.log(err)
        }})


    this.isLogged =  !!localStorage.getItem('authorization');
    console.log(this.isLogged)
    if(this.isLogged){
      this.home='/home';
    }
    else{
      this.home='/login';
    }

  }
 
}
