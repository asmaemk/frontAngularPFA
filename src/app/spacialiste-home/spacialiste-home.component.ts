import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionSpecialisteServiceService } from '../gestion-specialiste-service.service';
import { AdminSpecialisteSideComponent } from '../admin-specialiste-side/admin-specialiste-side.component';
declare var $ :any;


@Component({
  selector: 'app-spacialiste-home',
  templateUrl: './spacialiste-home.component.html',
  styleUrls: ['./spacialiste-home.component.css']
})
export class SpacialisteHomeComponent implements OnInit {
public titleCase = "abdo"
 private id : any = this.route.snapshot.paramMap.get('id');
  public message: String = '';
  public confirm = false;
  public TELE : String='';
  submitted = false;
  private fileDeplome: File = new File(["foo"], "foo.txt");
  private fileCV: File = new File(["foo"], "foo.txt");
  public profile = "../assets/img/contact.png";
  uploading : boolean = true;
  public user = {date_naissance: '',id : 0,email: '',nom: '',numero_tele: '',sexe:'',prenom: '',specialite: '',adresse: '',role: '',picture:'',};
  selectedFile = null;
  specialiste = 0; 
  public static specialistes : Array<any> = [];
  public static clt : any;
  clt= this.specialistesValue();
  registerForm: any;

  constructor(private route : ActivatedRoute,private _auth : AuthService,private _gestionSpecialiste : GestionSpecialisteServiceService, private _router: Router, private formBuilder: FormBuilder) { }

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
    this._auth.uploadProfileSpecialiste(this.user.id,formDataProfile).subscribe(
      
      res=>{
        (document.getElementById('myImage3') as HTMLFormElement).src = res.src;
        window.location.href = "http://localhost:4200/specialiste/home";
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
//image ||^^
  name: FormControl = new FormControl('value', Validators.minLength(2));

  public changeTele(){
    console.log("hi focus")
    //if(this.TELE.length===2) this.TELE+='-';
    if(this.TELE.length===0)this.TELE = '()-';
  }

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
  public specialistesValue(){
    return this.user;
  }

  updateUser(){
    $('#elegantModalFormUpdate').modal('show');
  }

  public registreSubmit(){

    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;

    const {nom,prenom,sexe,date_naissance,email,tele,specialite,adresse} = this.registerForm.value;
    if (this.registerForm.invalid) {
        return;
    }


    this._gestionSpecialiste.updateSpecialiste2(this.user.id,nom,prenom,sexe,date_naissance,email,tele,specialite,adresse).subscribe(
      res =>{
        console.log(res.message);
        $('#myModal').modal('show');
        $('#elegantModalFormUpdate').modal('hide');
        setTimeout(()=>{
          $('#myModal').modal('hide');
          window.location.href = "http://localhost:4200/specialiste/home";
        },1000)
      },
      err=> console.log(err)
    )
  }
  get f() { return this.registerForm.controls; }
   ngOnInit(): void{

    this._auth.getInformation().subscribe(

      res => {
        this.user = res;
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
        }
      })
      setTimeout(() => {
        this.registerForm = this.formBuilder.group({
          nom: [this.user.nom, Validators.required],
          prenom: [this.user.prenom, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]],
          tele: [this.user.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
          sexe : [this.user.sexe, [Validators.required]],
          date_naissance : [this.user?.date_naissance ? this.user.date_naissance.split('T')[0] : "null", [Validators.required]],
          adresse : [this.user.adresse, [Validators.required]],
          specialite : [this.user.specialite, [Validators.required]] },{
            // validator: this.MustMatch('password', 'confirmPassword')
          });
       }, 3000);


        this.registerForm = this.formBuilder.group({
          nom: [this.user.nom, Validators.required],
          prenom: [this.user.prenom, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]],
          tele: [this.user.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
          sexe : [this.user.sexe, [Validators.required]],
          date_naissance : [ this.user.date_naissance, [Validators.required]],
          adresse : [this.user.adresse, [Validators.required]],
          specialite : [this.user.specialite, [Validators.required]]  },{
            // validator: this.MustMatch('password', 'confirmPassword')
          });
  } 

}
