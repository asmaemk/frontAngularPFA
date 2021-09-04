import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../auth.service';

declare var FB : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user !: SocialUser ;

  constructor(private _auth : AuthService,private _router : Router,private formBuilder: FormBuilder,private authService : SocialAuthService) { }
  public message : String = '';
  public confirm = false;
  registerForm: FormGroup = new FormGroup({}) ;
  submitted = false;

 public errorLogin :String = '';
//  private httpHeader : HttpHeaders = new HttpHeaders();

 public async loginSubmit(){
  //  let E = await emailValidator(this.email);
  //  console.log(E);
  console.log("salam")
  this.submitted = true;
  const {nom,prenom,sexe,date_naissance,email,tele,profession,password} = this.registerForm.value;

  if (this.registerForm.invalid) {
        return;
    }

  this._auth.loginUser(email,password).subscribe(
      res=> {
        localStorage.removeItem('authorization');
        localStorage.setItem('authorization', res.accessToken);
        this.confirm = true;
        switch(res.role){
                case  "admin" :   this._router.navigate(['/admin']); break;
                case "specialiste" :this._router.navigate(['/specialiste/home']);break;
                case "client" : this._router.navigate(['/home']);break;
              }
      },
      err=>{
        console.log(err.error);
        this.errorLogin = err.error.message;
      }) 
}

get f() { return this.registerForm.controls; }

async signInFacebook(){
    
  console.log("submit login to facebook");
  // FB.login();
  FB.login((response: { authResponse: any; })=>
      {
        console.log('submitLogin',response);
        if (response.authResponse)
        {
          
         
        }
         else
         {
         console.log('User login failed');
       }
    });
  
}

async signInGoogle(){
    
  await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res=>this.user=res);
   console.log(this.user)
   this._auth.loginUserGoogle(this.user.idToken).subscribe(
     res=> {
       localStorage.removeItem('authorization');
       localStorage.setItem('authorization', res.accessToken);
       this._router.navigate(['/home']);
     },
     err=>{
       console.log(err.error);
     }) 
   
 }
//  signOutGoogle(){
//    console.log(this.user)
//    this.authService.signOut();
//    this.ngOnInit;
//  }

  ngOnInit(): void {

    (window as any).fbAsyncInit = function() {

      this.FB.init({
        appId      : '528161951773275',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
      });
        
      FB.AppEvents.logPageView();   
        
    };
    
    (function(d, s, id){
       var js,
      fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = (<HTMLImageElement>d.createElement(s)); 
       js.id = id;
       js.src = "https://connect.facebook.net/en_US/all.js";
    if(fjs.parentNode)
       fjs.parentNode.insertBefore(js, fjs);
     }
     (document, 'script', 'facebook-jssdk'));

    this.authService.authState.subscribe(
      
      (user) => {
        this.user = user;})

    if(!this.confirm){
    this.registerForm = this.formBuilder.group({
      
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]

  });
}}
  }


