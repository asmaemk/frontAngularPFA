import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { GestionClientService } from '../gestion-client.service';
declare var $ :any;
@Component({
  selector: 'app-admin-client-side',
  templateUrl: './admin-client-side.component.html',
  styleUrls: ['./admin-client-side.component.css']
})
export class AdminClientSideComponent implements OnInit {

  submitted: boolean | undefined;
  public profile = "../assets/img/contact.png";
  public user = { date_naissance : '',email: '',id: 0,nom: '',numero_tele: '',prenom: '',profession: '',adresse: '',role: '',picture: ''
  };
  public client = {
    date_naissance: '',id : 0,email: '',nom: '',numero_tele: '',prenom: '',profession: '',adresse: '',sexe:'',role: '',picture:'',niveauScolaire:'',password:''
  };
  public static clients : Array<any> = [];
  public filterSearch : string ='';
  updateForm: any;
  message: any;
  addForm: any;
  EmailExist: boolean | undefined;
  public TELE: String="";
  constructor(private _Client : GestionClientService,private _auth : AuthService,private _router : Router,private formBuilder: FormBuilder,private http: HttpClient) { }

  public deleteClient(id:number){

    this._Client.deleteClient(id).subscribe(
      res=> {
        console.log(res);
        this.ngOnInit();
      },
      err=>{console.log(err)})
  }

  public updateClient(id:number){
    this.client = AdminClientSideComponent.clients.find((client)=>client.id===id)
    this.updateForm = this.formBuilder.group({
      nom: [this.client.nom, Validators.required],
      prenom: [this.client.prenom, Validators.required],
      email: [this.client.email, [Validators.required, Validators.email]],
      tele: [this.client.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
      sexe : [this.client.sexe, [Validators.required]],
      date_naissance : [this.client.date_naissance?.split('T')[0], [Validators.required]],
      niveauScolaire : [this.client.niveauScolaire, [Validators.required]],
      adresse : [this.client.adresse, [Validators.required]],
      password:[this.client.password, [Validators.required]],
      profession : [this.client.profession, [Validators.required]] },{
        // validator: this.MustMatch('password', 'confirmPassword')
      });
    $('#elegantModalFormUpdate').modal('show');

  }
  public updateSubmit(id:number){
    this.submitted = true;
    

    const {nom,prenom,sexe,date_naissance,email,tele,profession,adresse,niveauScolaire,password} = this.updateForm.value;
    if (this.updateForm.invalid) {
        return;
    }
    console.log(id);

    this._Client.updateClient(id,nom,prenom,sexe,date_naissance,email,tele,profession,adresse,niveauScolaire,password).subscribe(
      res =>{
        console.log(res.message);
        this.message = res.message;
        $('#myModal').modal('show');
        $('#elegantModalFormUpdate').modal('hide');
        setTimeout(()=>{
          $('#myModal').modal('hide');
          window.location.href = "http://localhost:4200/admin/client-side";
        },1000)
      },
      err=> console.log(err) 
    )

  }

  public clientsValue(){
    
    return AdminClientSideComponent.clients
  }
  

  public SpecialistesValue(){
    return AdminClientSideComponent.clients
  }
  public changeTele(){
    console.log("hi focus")
    if(this.TELE.length===0)this.TELE = '()-';
  }

  ajouter(){
    $('#elegantModalFormRegistre').modal('show');
  }
  public registreSubmit(){

    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;

    const {nom,prenom,sexe,date_naissance,email,tele,profession,niveauScolaire,password} = this.addForm.value;
    if (this.addForm.invalid) {
      console.log(this.addForm.value);
        return;
    }

    this._auth.registreClient(nom,prenom,sexe,date_naissance,email,tele,profession,niveauScolaire,password).subscribe(

      res =>{
        console.log(res.message);
        this.message = res.message;
        $('#elegantModalFormRegistre').modal('hide');
        $('#elegantModalFormSuccess').modal('show');
        setTimeout(() => {
          $('#elegantModalFormSuccess').modal('hide');
          window.location.href = "http://localhost:4200/admin/client-side";
        }, 6000);
      },
      err=> {
        if(err.error.code === "ER_DUP_ENTRY"){
          this.EmailExist = true;
        }
        console.log(err)
      }
    )
  }
  
  get f() { return this.updateForm.controls; }
  get f2() { return this.addForm.controls; }
 
  ngOnInit(): void {

   this._Client.getClients().subscribe(
      res=> {
        AdminClientSideComponent.clients = res;
        console.log(AdminClientSideComponent.clients);
      },
      err=>{console.log(err)})
      this._auth.getInformation().subscribe(
        res => {
          console.log(res);
          this.user = res;
        },
        err => {
          if(err instanceof HttpErrorResponse){
             console.log(err)
          }
        }
      ) 
      this.updateForm = this.formBuilder.group({
        nom: [this.client.nom, Validators.required],
        prenom: [this.client.prenom, Validators.required],
        email: [this.client.email, [Validators.required, Validators.email]],
        tele: [this.client.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
        sexe : [this.client.sexe, [Validators.required]],
        date_naissance : [this.client.date_naissance?.split('T')[0], [Validators.required]],
        niveauScolaire : [this.client.niveauScolaire, [Validators.required]],
        adresse : [this.client.adresse, [Validators.required]],
        password:[this.client.password, [Validators.required]],
        profession : [this.client.profession, [Validators.required]] },{
          // validator: this.MustMatch('password', 'confirmPassword')
        }); 
        this.addForm = this.formBuilder.group({
          nom: ["", Validators.required],
          prenom: ["", Validators.required],
          email: ["", [Validators.required, Validators.email]],
          tele: ["", [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
          sexe : ["", [Validators.required]],
          date_naissance : ["", [Validators.required]],
          niveauScolaire : ["", [Validators.required]],
          // adresse : ["", [Validators.required]],
          password:["", [Validators.required]],
          passwordConfirm:["", [Validators.required]],
          profession : ["", [Validators.required]] },{
            // validator: this.MustMatch('password', 'confirmPassword')
          }); 
  }  

}
