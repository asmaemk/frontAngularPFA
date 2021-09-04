import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionSpecialisteServiceService } from '../gestion-specialiste-service.service';
import { AdminSpecialisteSideComponent } from '../admin-specialiste-side/admin-specialiste-side.component';
import { SpacialisteHomeComponent } from '../spacialiste-home/spacialiste-home.component';
declare var $ :any;

@Component({
  selector: 'app-modifier-specialiste',
  templateUrl: './modifier-specialiste.component.html',
  styleUrls: ['./modifier-specialiste.component.css']
})
export class ModifierSpecialisteComponent implements OnInit {

  public static specialistes : Array<any> = [];

public profile = "../assets/img/contact.png";
  public user = {
    date_naissance: '',
    id : 0,
  email: '',
  nom: '',
  numero_tele: '',
  prenom: '',
  specialite: '',
  adresse: '',
  role: '',
  picture:'',
  deplome:'',
  cv:'',
  };
  specialiste = 0; 
  

  constructor(private route : ActivatedRoute,private _auth : AuthService,private _gestionSpecialiste : GestionSpecialisteServiceService, private _router: Router, private formBuilder: FormBuilder) { }
  private id : any = this.route.snapshot.paramMap.get('id');
  public message: String = '';
  public confirm = false;
  public TELE : String='';
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  private fileDeplome: File = new File(["foo"], "foo.txt");
  private fileCV: File = new File(["foo"], "foo.txt");
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
        // console.log("hhhhhhh")
        console.log(res.src);
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
    return   SpacialisteHomeComponent.specialistes[0];
 
  }
  public registreSubmit() {
    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;
    const {nom, prenom, sexe, date_naissance, email, tele, specialite,adresse } = this.registerForm.value;
    const formDataDeplome = new FormData();
    formDataDeplome.append('file', this.fileDeplome);
    console.log(formDataDeplome);
    const formDataCV = new FormData();
    formDataCV.append('file', this.fileCV);
    console.log(formDataCV);
    this._gestionSpecialiste.updateSpecialiste2(this.id,nom,prenom,sexe,date_naissance,email,tele,specialite,adresse).subscribe(
      res =>{
        console.log(res.message);
        this.message = res.message;
        this.confirm = true;
        setTimeout(()=>{
          this._router.navigate(['/home']);
        },1000)
      },
      err=> console.log(err)
    )

    }

    private myFile : File = new File(["foo"], "foo.txt");
  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
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
    let specialiste = SpacialisteHomeComponent.specialistes.find( specialiste => specialiste.id == this.id );
    console.log("*************");
    console.log(specialiste);
//  this._gestionSpecialiste.getDeplome(5).subscribe(
//        res=>{ 
//          this.myFile=res.body;
//         //  console.log(this.myFile)
//         // new Blob([res.body], {type: 'application/pdf'});
//          let url = window.URL.createObjectURL(new File([res.body], "hhh"));
//          window.open(url);
//          console.log(res.body)},
//        err=>{

//        }
//      );

    //  console.log(myFile);
     this.registerForm = this.formBuilder.group({
      nom: [specialiste.nom, Validators.required],
      prenom: [specialiste.prenom, Validators.required],
      email: [specialiste.email, [Validators.required, Validators.email]],
      // tele: [specialiste.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")]],
      tele: [specialiste.numero_tele],
      password: [specialiste.PWD, [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [specialiste.PWD, [Validators.required]],
      sexe: [specialiste.sexe, [Validators.required]],
      adresse: [specialiste.adresse, [Validators.required]],
      date_naissance: [specialiste.date_naissance.split('T')[0], [Validators.required]],
      specialite: [specialiste.specialite, [Validators.required]],
      deplome: [this.myFile, [Validators.required]],
      CV: [this.myFile, [Validators.required]]

    });
 
  } 

}
