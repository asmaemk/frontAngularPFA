import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GestionTestService {

  constructor(private http : HttpClient,private _router : Router) { }
  public async  getTest(id:number){
    let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', 'https://medico-call-api.herokuapp.com/test/1');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Origin', 'https://medico-call-api.herokuapp.com/test/1');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append(' Access-Control-Allow-Headers', 'Authorization');
   // return this.http.get<any>('https://medico-call-api.herokuapp.com/test/1', {headers: { authorization: 'authorization', accept: 'application/json', 'Content-type': 'application/json', "Access-Control-Allow-Origin": 'https://medico-call-api.herokuapp.com/test/1','Access-Control-Allow-Methods': 'GET, POST, OPTIONS',"Access-Control-Allow-Headers": "Content-Type, Authorization"} });   
    return this.http.get<any>(`https://medico-call-api.herokuapp.com/test/${id}`,{headers : headers}) 
  }
  
  public setResponse(response : any){
    return this.http.post<any>('https://medico-call-api.herokuapp.com/test_taken',response);
  }
  
}
