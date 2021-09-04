import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
// import '~ngx-toastr/toastr';

// // bootstrap style toast
// // or import a bootstrap 4 alert styled design (SASS ONLY)
// // should be after your bootstrap imports, it uses bs4 variables, mixins, functions
// import '~ngx-toastr/toastr-bs4-alert';

// // if you'd like to use it without importing all of bootstrap it requires
// import '~bootstrap/scss/functions';
// import '~bootstrap/scss/variables';
// import '~bootstrap/scss/mixins';
// import '~ngx-toastr/toastr-bs4-alert';
declare var FB : any;
@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})

export class LoginGoogleComponent implements OnInit {

  public user !: SocialUser ;

  

  constructor(private authService : SocialAuthService,private _auth : AuthService,private _router : Router, public toastr : ToastrService) {
   }

  //  private FB : any;

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
 }(document, 'script', 'facebook-jssdk'));

  }

  // isLogged(){
  //   return !! this.user;
  // }

  async signInGoogle(){
    
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
  signOutGoogle(){
    console.log(this.user)
    this.authService.signOut();
    this.ngOnInit;
  }

}


