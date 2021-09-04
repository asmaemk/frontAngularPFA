import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {Pipe, PipeTransform} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GestionClientService } from '../gestion-client.service';
import { AdminClientSideComponent } from '../admin-client-side/admin-client-side.component';
import { HomeComponent } from '../home/home.component';
import { GestionTestService } from '../gestion-test.service';
// import { ClientRequest } from 'http';
declare var $ :any;

@Component({
  selector: 'app-anexity',
  templateUrl: './anexity.component.html',
  styleUrls: ['./anexity.component.css']
})
export class AnexityComponent implements OnInit {

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
  role: '',
  picture:'',
  niveauScolaire:''
  };
  uploading : boolean = true;
  refresh : boolean = false;
  selectedFile = null;
  public static clients : Array<any> = [];
  client = 0; 
  public static clt : any;
  clt= this.clientsValue();
  test: any;
  form: FormGroup = new FormGroup({});
  constructor(private _auth : AuthService,private _Client : GestionClientService,private _router : Router,private http: HttpClient ,private formBuilder: FormBuilder,private _test : GestionTestService) {}
 
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
    submitted = false;
  public submit(){

    this.submitted=true;
    console.log(this.form.value)
    if (this.form.invalid) {
      return;
  }
  
    let response = {"user_id" : 2, "test_id" : "2",
    "question" : [
      {"id" : 11, "user_answer" : {"id" : this.form.value.Q11}},
      {"id" : 12, "user_answer" : {"id" : this.form.value.Q12}},
      {"id" : 13, "user_answer" : {"id" : this.form.value.Q13}},
      {"id" : 14, "user_answer" : {"id" : this.form.value.Q14}},
      {"id" : 15, "user_answer" : {"id" : this.form.value.Q15}},
      {"id" : 16, "user_answer" : {"id" : this.form.value.Q16}},
      {"id" : 17, "user_answer" : {"id" : this.form.value.Q17}},
    ]};

    this._test.setResponse(response).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    );

  }
  public refreshUrl(){
    window.location.reload();
  }
   
    public clientsValue(){
      
      return this.user;
    }

    
    get f() { return this.form.controls; }
    async ngOnInit(): Promise<void> {

      this._auth.getInformation().subscribe(
        res => {
          console.log(res);
          this.user = res;
        },
        err => {
          if(err instanceof HttpErrorResponse){
             console.log(err)
          }});


          (await this._test.getTest(2)).subscribe(
    res=>{
      this.test = res.question;
      this.uploading = false;
      console.log(res)},
    err=>{
      setTimeout(() => {
        this.refresh =true;
      }, 3000);
      console.log(err)}
  )

// await this._test.getTest2();

       
  this.form = this.formBuilder.group({
    Q11: ['', Validators.required],
    Q12: ['', Validators.required],
    Q13: ['', Validators.required],
    Q14: ['', Validators.required],
    Q15: ['', Validators.required],
    Q16: ['', Validators.required],
    Q17: ['', Validators.required]
    });
    }
    
    
//   ngOnInit(): void {
//     this._Client.getClients().subscribe(
//       res=> {
//         HomeComponent.clients = res;
//         console.log(HomeComponent.clients);
//       },
//       err=>{console.log(err)})
//     this._auth.getInformation().subscribe(
//       res => {
//         console.log(res);
//         this.user = res;
//       },
//       err => {
//         if(err instanceof HttpErrorResponse){
//            console.log(err)
//         }
//       }
//     )
//   }
// }

}
