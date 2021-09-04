import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _loginUrl = 'http://localhost:5000/login'
  private _registreClientUrl = 'http://localhost:5000/registre/client'
  private _registreSpecialisteUrl = 'http://localhost:5000/registre/specialiste'
  private _confirmAuth = 'http://localhost:5000/confirm'
  private _loginUrlGoogle = 'http://localhost:5000/login-google'

  constructor(private http : HttpClient,private _router : Router) { }

  public loginUserGoogle( token : String){
    console.log("token is "+token);
    return this.http.post<any>(this._loginUrlGoogle,{token : token});
  }

  public loginUser(email : String,password : String){

    return this.http.post<any>(this._loginUrl,{email,password});

  }
  
  public registreSpecialiste( nom : String,prenom :String,sexe : String,date_naissance : Date,email : String,tele : String,specialite : String,password : String){

    return this.http.post<any>(this._registreSpecialisteUrl,{nom,prenom,sexe,date_naissance,email,tele,specialite,password});

  }

  
  public registreClient( nom : String,prenom :String,sexe : String,date_naissance : Date,email : String,tele : String,profession : String,niveauScolaire : String,password : String){

    return this.http.post<any>(this._registreClientUrl,{nom,prenom,sexe,date_naissance ,email,tele,profession,niveauScolaire,password});

  }
 
  public uploadProfile(id : number , myFile : FormData){
    return this.http.post<any>('http://localhost:5000/upload/img/client',myFile,{params: {id:id}});
  }

  public uploadProfileSpecialiste(id : number , myFile : FormData){
    return this.http.post<any>('http://localhost:5000/upload/img/specialiste',myFile,{params: {id:id}});
  }

  public uploadFileCV(id : number , myFile : FormData ){
    console.log(id);
    return this.http.post<any>('http://localhost:5000/upload/cv',myFile,{params: {id:id}});

  }
  public uploadFileDeplome(id:number , myFile : FormData){
    console.log(id);
    return this.http.post<any>('http://localhost:5000/upload/deplome',myFile,{params: {id:id}});
  }


  public getInformation(){
    
    return this.http.get<any>('http://localhost:5000/');

  }
  // public async getInformation(){
  //   return new Promise((resolve,reject)=>{
  //     let a =this.http.get<any>('http://localhost:5000/');
  //     resolve (a);
  //   })
  // }

  public ConfirmAuth(id : String){
    return this.http.post<any>(this._confirmAuth,{token:id});
  }
  public loggedIn(){

     return !!localStorage.getItem('authorization');
}
  public loggedToken(){
    return localStorage.getItem('authorization');
  }
}
