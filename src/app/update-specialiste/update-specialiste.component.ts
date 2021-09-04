import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionSpecialisteServiceService } from '../gestion-specialiste-service.service';
import { AdminSpecialisteSideComponent } from '../admin-specialiste-side/admin-specialiste-side.component';
declare var $ :any;

@Component({
  selector: 'app-update-specialiste',
  templateUrl: './update-specialiste.component.html',
  styleUrls: ['./update-specialiste.component.css']
})
export class UpdateSpecialisteComponent implements OnInit {

  constructor(private route : ActivatedRoute,private _auth : AuthService,private _gestionSpecialiste : GestionSpecialisteServiceService, private _router: Router, private formBuilder: FormBuilder) { }
  private id : any = this.route.snapshot.paramMap.get('id');
  public message: String = '';
  public confirm = false;
  public TELE : String='';
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  private fileDeplome: any;
  private fileCV: any;


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

  public registreSubmit() {
    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;
    const { nom, prenom, sexe, date_naissance, email, tele, specialite,adresse, password } = this.registerForm.value;
    if (this.registerForm.invalid) {
      return;
    }
    const formDataDeplome = new FormData();
    formDataDeplome.append('file', this.fileDeplome);
    console.log(formDataDeplome);
    const formDataCV = new FormData();
    formDataCV.append('file', this.fileCV);
    console.log(formDataCV);
    this._gestionSpecialiste.updateSpecialiste(this.id,nom,prenom,sexe,date_naissance,email,tele,specialite,adresse,password).subscribe(
      res =>{
        if(this.fileDeplome){
          console.log("filedepolome"+this.fileDeplome)
        this._auth.uploadFileDeplome(this.id,formDataDeplome).subscribe(
          res => {
            console.log('upload success');
          },
          err => console.log(err)
        )
        }
        if(this.fileCV){
        this._auth.uploadFileCV(this.id,formDataCV).subscribe(
              res => {
                console.log('upload success');
              },
              err => console.log(err)
            )
        }
        console.log(res.message);
        this.message = res.message;
        this.confirm = true;
        $('#exampleModalCenter').modal('show');
      },
      err=> console.log(err)
    )
    $('#exampleModalCenter').on('hidden.bs.modal',  () => {
      window.location.href = "http://localhost:4200/admin/specialiste-side";
     });
    }

    private myFile : File = new File(["foo"], "foo.txt");
  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    let specialiste = AdminSpecialisteSideComponent.specialistes.find( specialiste => specialiste.id == this.id );

    console.log(specialiste)
     this.registerForm = this.formBuilder.group({
      nom: [specialiste.nom, Validators.required],
      prenom: [specialiste.prenom, Validators.required],
      email: [specialiste.email, [Validators.required, Validators.email]],
      tele: [specialiste.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")]],
      password: [specialiste.password, [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [specialiste.password, [Validators.required]],
      sexe: [specialiste.sexe, [Validators.required]],
      date_naissance: [specialiste.date_naissance.split('T')[0], [Validators.required]],
      specialite: [specialiste.specialite, [Validators.required]],
      deplome: ["", []],
      CV: ["", []]

    });
    console.log(this.registerForm.value.tele);
  }

}
