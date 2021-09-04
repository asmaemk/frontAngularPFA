import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
declare var FB : any;
declare var $ :any;
@Component({
  selector: 'app-registre-client',
  templateUrl: './registre-client.component.html',
  styleUrls: ['./registre-client.component.css'],
})
export class RegistreClientComponent implements OnInit {

  public user !: SocialUser ;
  public TELE : String='';
  

  constructor(private _auth : AuthService,private _router : Router,private formBuilder: FormBuilder,private authService : SocialAuthService) { }
  public message : String = '';
  public confirm = false;
  registerForm: FormGroup = new FormGroup({}) ;
  submitted = false;
  public EmailExist = false;
 
  // name, prenom, sexe, date_naissance, email, numero_tele, profession, PWD,false
public changeTele(){
  console.log("hi focus")
  //if(this.TELE.length===2) this.TELE+='-';
  if(this.TELE.length===0)this.TELE = '()-';
}
   
  public registreSubmit(){

    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;
    console.log(this.f.prenom.errors);

    const {nom,prenom,sexe,date_naissance,email,tele,profession,niveauScloaire,password} = this.registerForm.value;
    if (this.registerForm.invalid) {
        return;
    }
    // console.log(this.registerForm.value);

    this._auth.registreClient(nom,prenom,sexe,date_naissance,email,tele,profession,niveauScloaire,password).subscribe(

      res =>{
        console.log(res.message);
        this.message = res.message;
        this.confirm = true;
        $('#exampleModalCenter').modal('show');
      },
      err=> {
        if(err.error.code === "ER_DUP_ENTRY"){
          this.EmailExist = true;
        }
        console.log(err)
      }
    )
    $('#exampleModalCenter').on('hidden.bs.modal',  () => {
      window.location.href = "http://localhost:4200/acceuil";
     });
  }
  
  async signInGoogle(){
    
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res=>this.user=res);
     console.log(this.user)
     this._auth.loginUserGoogle(this.user.idToken).subscribe(
       res=> {
        console.log("registre google account")
         localStorage.removeItem('authorization');
         localStorage.setItem('authorization', res.accessToken);
         console.log("registre google account")
          this._router.navigate(['/home']);
      
         
       },
       err=>{
         console.log(err.error);
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
    
    // this.authService.authState.subscribe(
      
    //   (user) => {
    //     this.user = user;})

        
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tele: ['', [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      sexe : ['', [Validators.required]],
      date_naissance : ['', [Validators.required]],
      niveauScolaire : ['', [Validators.required]],
      profession : ['', [Validators.required]] },{
        // validator: this.MustMatch('password', 'confirmPassword')
      });

  }
   

}



