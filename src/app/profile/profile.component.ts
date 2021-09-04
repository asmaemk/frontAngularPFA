import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminClientSideComponent } from '../admin-client-side/admin-client-side.component';
import { AuthService } from '../auth.service';
import { GestionClientService } from '../gestion-client.service';
import { HomeComponent } from '../home/home.component';
declare var $ :any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public profile = "../assets/img/contact.png";
  selectedFile = null;
  public client = {date_naissance: "",
  email: "",
  id: 0,
  nom: "",
  numero_tele: "",
  prenom: "",
  profession: "",
  role: "",
  adresse : "",
  picture:""
} ;
  constructor(private _auth : AuthService,private _Client : GestionClientService,private _router : Router,private formBuilder: FormBuilder,private http: HttpClient) { }

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
    this._auth.uploadProfile(this.client.id,formDataProfile).subscribe(
      
      res=>{
        // console.log("hhhhhhh")
        console.log(res.src);
        (document.getElementById('myImage3') as HTMLFormElement).src = res.src;
        window.location.href = "http://localhost:4200/profile";
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
    // console.log("photo is "+this.client.picture)
    return this.client;
  }

  public updateClient2(id:number){
    this._router.navigate([`/home/profile/edit`]);
  }
  
  async ngOnInit(): Promise<void> {

    (await this._auth.getInformation()).subscribe(
      res => {
        this.client=res;
        console.log(res);
      },
      err => {
        if(err instanceof HttpErrorResponse){
           console.log(err)
        }
      }
    )

  }
  
}

@Pipe({name: 'titleCase'})
export class TitleCasePipe implements PipeTransform {
    public transform(input:string): string{
        console.log(input);
        if (!input) {
            return '';
        } else {
            return input.replace(/\b\w/g, first => first.toLocaleUpperCase()) 
        }
    }
    
}