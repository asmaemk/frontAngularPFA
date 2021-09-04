import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { GestionClientService } from '../gestion-client.service';
// import { ClientRequest } from 'http';
declare var $ :any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public profile = "../assets/img/contact.png";
  public user = {
    date_naissance: '',id : 0,email: '',nom: '',numero_tele: '',prenom: '',profession: '',adresse: '',sexe:'',role: '',picture:'',niveauScolaire:''
  };
  submitted: boolean | undefined;
  selectedFile = null;
  public static clients : Array<any> = [];
  client = 0; 
  public static clt : any;
  clt= this.clientsValue();
  registerForm: any;

  constructor(private _auth : AuthService,private _gestionClient : GestionClientService,private _router : Router,private formBuilder: FormBuilder,private http: HttpClient) {}
 
  private image: File = new File(["foo"], "foo.txt");
  public charged = true;

  selectImg(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.image = input.files[0];
    this.charged = false;
    console.log(this.image);
  }
  
  public changePhoto(){

    console.log("click")
    const formDataProfile = new FormData();
    formDataProfile.append('file', this.image);
    this._auth.uploadProfile(this.user.id,formDataProfile).subscribe(
      
      res=>{
        // console.log("hhhhhhh")
        console.log(res.src);
        (document.getElementById('myImage3') as HTMLFormElement).src = res.src;
        window.location.href = "http://localhost:4200/home";
      },err=>{console.log(err)}
      );
    

  }

  public editPhoto(){
    $('#exampleModalCenter').modal('show');
  }
  public addPhoto(){
    $('#exampleModalCenter').modal('hide');
    $('#addPhoto').modal('show');
  }

    public clientsValue(){
      return this.user;
    }
    updateUser(){
      $('#elegantModalFormUpdate').modal('show');
    }

    public registreSubmit(){

      // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
      this.submitted = true;
  
      const {nom,prenom,sexe,date_naissance,email,tele,profession,adresse} = this.registerForm.value;
      if (this.registerForm.invalid) {
          return;
      }

  
      this._gestionClient.updateClient2(this.user.id,nom,prenom,sexe,date_naissance,email,tele,profession,adresse).subscribe(
        res =>{
          console.log(res.message);
          $('#myModal').modal('show');
          $('#elegantModalFormUpdate').modal('hide');
          setTimeout(()=>{
            $('#myModal').modal('hide');
            window.location.href = "http://localhost:4200/home";
          },1000)
        },
        err=> console.log(err)
      )
    }

    get f() { return this.registerForm.controls; }
    
    ngOnInit(): void {
      this._auth.getInformation().subscribe(
        res => {
          console.log(res);
          this.user = res;

            console.log(this.registerForm.value)
        },
        err => {
          if(err instanceof HttpErrorResponse){
             console.log(err)
          }})

         setTimeout(() => {
          this.registerForm = this.formBuilder.group({
            nom: [this.user.nom, Validators.required],
            prenom: [this.user.prenom, Validators.required],
            email: [this.user.email, [Validators.required, Validators.email]],
            tele: [this.user.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
            sexe : [this.user.sexe, [Validators.required]],
            date_naissance : [this.user.date_naissance.split('T')[0], [Validators.required]],
            niveauScolaire : [this.user.niveauScolaire, [Validators.required]],
            adresse : [this.user.adresse, [Validators.required]],
            profession : [this.user.profession, [Validators.required]] },{
              // validator: this.MustMatch('password', 'confirmPassword')
            });
            let date = this.user.date_naissance.split('T')[0];
            console.log(date)
         }, 3000);


          this.registerForm = this.formBuilder.group({
            nom: [this.user.nom, Validators.required],
            prenom: [this.user.prenom, Validators.required],
            email: [this.user.email, [Validators.required, Validators.email]],
            tele: [this.user.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
            sexe : [this.user.sexe, [Validators.required]],
            date_naissance : [ this.user.date_naissance, [Validators.required]],
            niveauScolaire : [this.user.niveauScolaire, [Validators.required]],
            adresse : [this.user.adresse, [Validators.required]],
            profession : [this.user.profession, [Validators.required]] },{
              // validator: this.MustMatch('password', 'confirmPassword')
            });
    }
    
  }
    
