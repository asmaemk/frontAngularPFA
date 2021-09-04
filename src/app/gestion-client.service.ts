import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GestionClientService {
  private _selectUrl = 'http://localhost:5000/select'
  private _deleteClientUrl = 'http://localhost:5000/delete/client'
  private _updateClientUrl = 'http://localhost:5000/update/client'
  private _getDeplome = 'http://localhost:5000/client/deplome';
  private _getCv = 'http://localhost:5000/download';

  constructor(private http : HttpClient,private _router : Router) { }



  public getClients(){
    return this.http.get<any>(this._selectUrl);
  }

  public deleteClient(id : number){
    return this.http.post<any>(this._deleteClientUrl,{id});
  }
  public updateClient2(id : number, nom : String,prenom :String,sexe : String,date_naissance : Date,email : String,tele : String,profession : String,adresse: String){
    return this.http.post<any>(this._updateClientUrl,{id,nom,prenom,sexe,date_naissance,email,tele,profession,adresse});
  }

  public updateClient(id : number, nom : String,prenom :String,sexe : String,date_naissance : Date,email : String,tele : String,profession : String, adresse:String,niveauScolaire:String,password : String){

    return this.http.post<any>(this._updateClientUrl,{id,nom,prenom,sexe,date_naissance,email,tele,profession,adresse,niveauScolaire,password});

  }

}
