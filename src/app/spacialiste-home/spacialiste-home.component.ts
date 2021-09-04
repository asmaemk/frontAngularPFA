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
  };
  selectedFile = null;
  specialiste = 0; 
  public static specialistes : Array<any> = [];
  public static clt : any;
  clt= this.specialistesValue();

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
    this._auth.uploadProfileSpecialiste(SpacialisteHomeComponent.specialistes[0].id,formDataProfile).subscribe(
      
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
    return SpacialisteHomeComponent.specialistes[0];
  }
  public updateSpecialiste2(id:number){

    this._router.navigate([`/specialiste/modifier-specialiste/${id}`]);

  }

  async ngOnInit(): Promise<void> {

    await this._auth.getInformation().subscribe(
      
      (      res: any) => {
 
        SpacialisteHomeComponent.specialistes = [res];
        this.uploading = false;
      },
      (      err: any) => {
        if(err instanceof HttpErrorResponse){
           console.log(err)
        }})
  } 

}
