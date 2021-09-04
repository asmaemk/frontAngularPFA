import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../auth.service';
declare var $ :any;
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})


export class AcceuilComponent implements OnInit {
  TELE: String="";
  registerForm: any;
  loginForm :any;
  public user !: SocialUser ;
  message: any;
  confirm: boolean | undefined;
  EmailExist: boolean | undefined;
  submitted: boolean | undefined;

  constructor(private _auth : AuthService,private _router : Router,private formBuilder: FormBuilder,private authService : SocialAuthService) { }

  //////////////// change tele
  public changeTele(){
    console.log("hi focus")
    //if(this.TELE.length===2) this.TELE+='-';
    if(this.TELE.length===0)this.TELE = '()-';
  }

  public signIn(){
    $('#elegantModalFormRegistre').modal('show');
  }
  //////////////login
  public async loginSubmit(){
    console.log("salam");
    this.submitted = true;
    const {email,password} = this.loginForm.value;
  
    console.log(email,password)
    if (this.loginForm.invalid) {
      console.log(this.f2.email.errors)
          return;
      }
  

    this._auth.loginUser(email,password).subscribe(
        res=> {
          localStorage.removeItem('authorization');
          localStorage.setItem('authorization', res.accessToken);
          this.confirm = true;
          $('#elegantModalForm').modal('hide');
          switch(res.role){
                  case  "admin" :   this._router.navigate(['/admin']); break;
                  case "specialiste" :this._router.navigate(['/specialiste/home']);break;
                  case "client" : this._router.navigate(['/home']);break;
                }
        },
        err=>{
          console.log(err.error);
          this.message = err.error.message;
        }) 
       
  }

  /////////////// registring
  public registreSubmit(){

    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;
    console.log(this.registerForm.invalid);

    const {nom,prenom,sexe,date_naissance,email,tele,profession,niveauScloaire,password} = this.registerForm.value;
    if (this.registerForm.invalid) {
        return;
    }

    this._auth.registreClient(nom,prenom,sexe,date_naissance,email,tele,profession,niveauScloaire,password).subscribe(

      res =>{
        console.log(res.message);
        this.message = res.message;
        this.confirm = true;
        $('#elegantModalFormRegistre').modal('hide');
        $('#elegantModalFormSuccess').modal('show');
        setTimeout(() => {
          $('#elegantModalFormSuccess').modal('hide');
            window.location.href = "http://localhost:4200/acceuil";
        }, 2000);
      },
      err=> {
        if(err.error.code === "ER_DUP_ENTRY"){
          this.EmailExist = true;
        }
        console.log(err)
      }
    )

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
          $('#elegantModalFormRegistre').modal('hide');
          $('#elegantModalForm').modal('hide');
       },
       err=>{
         console.log(err.error);
       }) 
     
   }

get f() { return this.registerForm.controls; }
get f2() { return this.loginForm.controls; }



  ngOnInit(): void {

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
      this.loginForm = this.formBuilder.group({

        email: ['', [Validators.required,]],
        password: ['', [Validators.required,]],
        });
  }

}
