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
declare var $ :any;

@Component({
  selector: 'app-stress',
  templateUrl: './stress.component.html',
  styleUrls: ['./stress.component.css']
})
export class StressComponent implements OnInit {

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
    if (this.form.invalid) {
      return;
  }
    let response = {"user_id" : 2, "test_id" : "1",
    "question" : [
      {"id" : 1, "user_answer" : {"id" : this.form.value.Q1}},
      {"id" : 2, "user_answer" : {"id" : this.form.value.Q2}},
      {"id" : 3, "user_answer" : {"id" : this.form.value.Q3}},
      {"id" : 4, "user_answer" : {"id" : this.form.value.Q4}},
      {"id" : 5, "user_answer" : {"id" : this.form.value.Q5}},
      {"id" : 6, "user_answer" : {"id" : this.form.value.Q6}},
      {"id" : 7, "user_answer" : {"id" : this.form.value.Q7}},
      {"id" : 8, "user_answer" : {"id" : this.form.value.Q8}},
      {"id" : 9, "user_answer" : {"id" : this.form.value.Q9}},
      {"id" : 10, "user_answer" : {"id" : this.form.value.Q10}}
    ]};
    console.log(this.form.value.Q1)

    this._test.setResponse(response).subscribe(
      res=>{console.log(res);$('#exampleModalCenterSucess').modal('show');
  },
      err=>console.log(err)
    );

    $('#exampleModalCenterSucess').on('hidden.bs.modal',  () => {
      window.location.href = "http://localhost:4200/home";
     });

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


          (await this._test.getTest(1)).subscribe(
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
    Q1: ['', Validators.required],
    Q2: ['', Validators.required],
    Q3: ['', Validators.required],
    Q4: ['', Validators.required],
    Q5: ['', Validators.required],
    Q6: ['', Validators.required],
    Q7: ['', Validators.required],
    Q8: ['', Validators.required],
    Q9: ['', Validators.required],
    Q10: ['', Validators.required]
    });
    }

}
