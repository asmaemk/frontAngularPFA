import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminClientSideComponent } from '../admin-client-side/admin-client-side.component';
import { AdminComponent } from '../admin/admin.component';
import { AuthService } from '../auth.service';
import { GestionClientService } from '../gestion-client.service';
import { HomeComponent } from '../home/home.component';

declare var $ :any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  public profile = "../assets/img/contact.png";
  public user = {
    date_naissance: '',
    id : 0,
  email: '',
  nom: '',
  numero_tele: '',
  prenom: '',
  profession: '',
  adresse: '',
  sexe: '',
  password: '',
  };
  // public client : any;
  private id : any = this.route.snapshot.paramMap.get('id');
  
  selectedFile = null;

  public message : String = '';
  public confirm = false;
  registerForm: FormGroup = new FormGroup({}) ;
  submitted = false;

  constructor(private route : ActivatedRoute,private _gestionClient : GestionClientService,private _router : Router,private _auth : AuthService,private formBuilder: FormBuilder) {}

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
    let clientt = HomeComponent.clients.findIndex(client => client.id == this.user.id);
    return HomeComponent.clients[clientt];
  }

  public registreSubmit(){

    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;

    const {nom,prenom,sexe,date_naissance,email,tele,profession,adresse,password} = this.registerForm.value;
    if (this.registerForm.invalid) {
        return;
    }
    // console.log(this.registerForm.value);

    this._gestionClient.updateClient2(this.id,nom,prenom,sexe,date_naissance,email,tele,profession,adresse).subscribe(
      res =>{
        console.log(res.message);
        // this.message = res.message;
        // this.confirm = true;
        setTimeout(()=>{
          this._router.navigate(['/home']);
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
      // this.client = res;
    },
    err => {
      if(err instanceof HttpErrorResponse){
         console.log(err)
      }
    }
  )
     let client = HomeComponent.clients.find( client => client.id == this.id );
    console.log(this.id);
    console.log(client);
    console.log(HomeComponent.clients);
    this.registerForm = this.formBuilder.group({
     nom: [client.nom],
      prenom: [client.prenom],
      email: [client.email],
      tele: [client.numero_tele],
      password: [client.PWD],
      passwordConfirm: [client.PWD],
      sexe : [client.sexe],
      date_naissance : [client.date_naissance.split('T')[0]],
      profession : [client.profession],
      adresse: [client.adresse],

  });

  }
}
