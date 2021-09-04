import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { GestionClientService } from '../gestion-client.service';
import { GestionSpecialisteServiceService } from '../gestion-specialiste-service.service';
declare var $ :any;
@Component({
  selector: 'app-admin-specialiste-side',
  templateUrl: './admin-specialiste-side.component.html',
  styleUrls: ['./admin-specialiste-side.component.css']
})
export class AdminSpecialisteSideComponent implements OnInit {
  submitted: boolean | undefined;
  public profile = "../assets/img/contact.png";
  public user = {date_naissance : '', email: '',id: 0,nom: '',numero_tele: '',prenom: '',specialite: '',adresse: '',role: '',picture: ''
  };
  public specialiste = {
    date_naissance: '',id : 0,email: '',nom: '',numero_tele: '',prenom: '',specialite: '',adresse: '',sexe:'',role: '',picture:'',niveauScolaire:'',password:''
  };
  public static specialistes : Array<any> = [];
  public filterSearch : string ='';
  updateForm: any;
  private fileDeplome: any;
  private fileCV: any;
  message: any;
  addForm: any;
  constructor(private _Specialiste : GestionSpecialisteServiceService,private _auth : AuthService,private _router : Router,private formBuilder: FormBuilder,private http: HttpClient) { }

  
  selectDeplome(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.fileDeplome = input.files[0];
    console.log(this.fileDeplome);
  }
  selectCV(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
    this.fileCV = input.files[0];
    console.log(this.fileCV);
  }

  public deleteSpecialiste(id:number){

    this._Specialiste.deleteSpecialiste(id).subscribe(
      res=> {
        console.log(res);
        this.ngOnInit();

      },
      err=>{console.log(err)})
  }

  public updateSpecialiste(id:number){
    this.specialiste = AdminSpecialisteSideComponent.specialistes.find((specialiste)=>specialiste.id===id)
    console.log(this.specialiste.specialite)
    this.updateForm = this.formBuilder.group({
      nom: [this.specialiste.nom, Validators.required],
      prenom: [this.specialiste.prenom, Validators.required],
      email: [this.specialiste.email, [Validators.required, Validators.email]],
      tele: [this.specialiste.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
      sexe : [this.specialiste.sexe, [Validators.required]],
      date_naissance : [this.specialiste.date_naissance.split('T')[0], [Validators.required]],
      adresse : [this.specialiste.adresse, [Validators.required]],
      password:[this.specialiste.password, [Validators.required]],
      specialite : [this.specialiste.specialite, [Validators.required]] },{
        // validator: this.MustMatch('password', 'confirmPassword')
      }); 
    $('#elegantModalFormUpdate').modal('show');

  }
  public updateSubmit(id:number) {
    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;
    const { nom, prenom, sexe, date_naissance, email, tele, specialite,adresse, password } = this.updateForm.value;

    if (this.updateForm.invalid) {
      console.log(this.updateForm.value)
      return;
    }
    const formDataDeplome = new FormData();
    formDataDeplome.append('file', this.fileDeplome);
    console.log(formDataDeplome);
    const formDataCV = new FormData();
    formDataCV.append('file', this.fileCV);
    console.log(formDataCV);
    this._Specialiste.updateSpecialiste(id,nom,prenom,sexe,date_naissance,email,tele,specialite,adresse,password).subscribe(
      res =>{
        if(this.fileDeplome){
          console.log("filedepolome"+this.fileDeplome)
        this._auth.uploadFileDeplome(id,formDataDeplome).subscribe(
          res => {
            console.log('upload success');
          },
          err => console.log(err)
        )
        }
        if(this.fileCV){
        this._auth.uploadFileCV(id,formDataCV).subscribe(
              res => {
                console.log('upload success');
              },
              err => console.log(err)
            )
        }
        this.message = res.message;
        console.log(res.message);
        $('#myModal').modal('show');
        $('#elegantModalFormUpdate').modal('hide');
        setTimeout(()=>{
          $('#myModal').modal('hide');
          window.location.href = "http://localhost:4200/admin/specialiste-side";
        },5000)
      },
      err=> console.log(err)
    )
    }


  public specialistesValue(){
    return AdminSpecialisteSideComponent.specialistes
  }

  ajouter(){
    $('#elegantModalFormRegistre').modal('show');
  }


  public registreSubmit() {
    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;
    const { nom, prenom, sexe, date_naissance, email, tele, specialite, password } = this.addForm.value;
    if (this.addForm.invalid) {
      return;
    }
    const formDataDeplome = new FormData();
    formDataDeplome.append('file', this.fileDeplome);
    console.log(formDataDeplome);
    const formDataCV = new FormData();
    formDataCV.append('file', this.fileCV);
    console.log(formDataCV);
    var id : number = 0;
 
    this._auth.registreSpecialiste(nom, prenom, sexe, date_naissance, email, tele, specialite, password).subscribe(
      res => {
        id = res.id;
        this._auth.uploadFileDeplome(id,formDataDeplome).subscribe(
          res => {
            console.log('upload success');
          },
          err => console.log(err)
        )
          this._auth.uploadFileCV(id,formDataCV).subscribe(
            res => {
              console.log('upload success');
            },
            err => console.log(err)
          )
        console.log(res.message);
        this.message = res.message;
        $('#myModal').modal('show');
        $('#elegantModalFormRegistre').modal('show');
        setTimeout(()=>{
          $('#myModal').modal('hide');
          window.location.href = "http://localhost:4200/admin/specialiste-side";
        },5000)
      },
      err => console.log(err)
    )
  }

  get f() { return this.updateForm.controls; }
  get f2() { return this.addForm.controls; }
  ngOnInit(): void {

   this._Specialiste.getSpecialistes().subscribe(
      res=> {
        console.log(res);

        AdminSpecialisteSideComponent.specialistes = res;
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
        nom: [this.specialiste.nom, Validators.required],
        prenom: [this.specialiste.prenom, Validators.required],
        email: [this.specialiste.email, [Validators.required, Validators.email]],
        tele: [this.specialiste.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
        sexe : [this.specialiste.sexe, [Validators.required]],
        date_naissance : [this.specialiste.date_naissance.split('T')[0], [Validators.required]],
        adresse : [this.specialiste.adresse, [Validators.required]],
        password:[this.specialiste.password, [Validators.required]],
        specialite : [this.specialiste.specialite, [Validators.required]] },{
        });  
        this.addForm = this.formBuilder.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          tele: ['', [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
          sexe : ['', [Validators.required]],
          date_naissance : ['', [Validators.required]],
          adresse : ['', [Validators.required]],
          password:['', [Validators.required]],
          passwordConfirm:['', [Validators.required]],
          specialite : ['', [Validators.required]] },{
          });  
        
  }

}
