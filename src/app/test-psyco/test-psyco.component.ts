import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { GestionTestService } from '../gestion-test.service';
@Component({
  selector: 'app-test-psyco',
  templateUrl: './test-psyco.component.html',
  styleUrls: ['./test-psyco.component.css']
})
export class TestPsycoComponent implements OnInit {
  client: any;
  uploading : boolean = true;
  refresh : boolean = false;
  constructor(private formBuilder: FormBuilder,private _test : GestionTestService,private _auth : AuthService) { }

  form: FormGroup = new FormGroup({});
  public test : Array<any> = [];
  // public questions = [{id:"Q1",Q:"quel est votre age ? *",S1:"20",S2:"30",S3:"40",S4:"10"},{id:"Q2",Q:"quel est votre nom ? *",S1:"abdelillah",S2:"ayoube",S3:"mehdi",S4:"aymane"},
  // {id:"Q3",Q:"quel est la capitale du maroc ? *",S1:"rabat",S2:"tanger",S3:"souk sebt",S4:"ait hoka"},{id:"Q4",Q:"quel est votre age ? *",S1:"20",S2:"30",S3:"40",S4:"10"}]

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
      res=>console.log(res),
      err=>console.log(err)
    );

  }

  get f() { return this.form.controls; }

  async ngOnInit(): Promise<void> {

    // this._auth.getInformation().subscribe(
    //   res => {
    //     this.client=res;
    //     console.log(res);
    //   },
    //   err => {
    //     if(err instanceof HttpErrorResponse){
    //        console.log(err)
    //     }
    //   }
    // );

   (await this._test.getTest(1)).subscribe(
      res=>{
        // setTimeout(() => {
        //  
        //   }
        // }, 1000);
        this.test = res.question;
        setTimeout(() => {
          this.uploading = false;
        }, 4000);
        console.log(res)},
      err=>{
        
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
      Q10: ['', Validators.required],
      });
  }

}
