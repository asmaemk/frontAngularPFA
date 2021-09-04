import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminClientSideComponent } from '../admin-client-side/admin-client-side.component';
import { AdminComponent } from '../admin/admin.component';
import { GestionClientService } from '../gestion-client.service';
declare var $ :any;
@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  private id : any = this.route.snapshot.paramMap.get('id');
  public TELE : String='';

  public changeTele(){
    console.log("hi focus")
    //if(this.TELE.length===2) this.TELE+='-';
    if(this.TELE.length===0)this.TELE = '()-';
  }

  public message : String = '';
  public confirm = false;
  registerForm: FormGroup = new FormGroup({}) ;
  submitted = false;

  constructor(private route : ActivatedRoute,private _gestionClient : GestionClientService,private _router : Router,private formBuilder: FormBuilder) {}


  public registreSubmit(){

    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;
    

    const {nom,prenom,sexe,date_naissance,email,tele,profession,adresse,niveauScloaire,password} = this.registerForm.value;
    if (this.registerForm.invalid) {
        return;
    }
    // console.log(this.registerForm.value);

    this._gestionClient.updateClient(this.id,nom,prenom,sexe,date_naissance,email,tele,profession,adresse,niveauScloaire,password).subscribe(
      res =>{
        console.log(res.message);
        this.message = res.message;
        this.confirm = true;
        $('#exampleModalCenter').modal('show');
      },
      err=> console.log(err) 
    )
    $('#exampleModalCenter').on('hidden.bs.modal',  () => {
      window.location.href = "http://localhost:4200/admin/client-side";
     });
  }
get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    
    let client = AdminClientSideComponent.clients.find( client => client.id == this.id );
    console.log(AdminClientSideComponent.clients);
    this.registerForm = this.formBuilder.group({
      nom: [client.nom, Validators.required],
      prenom: [client.prenom, Validators.required],
      email: [client.email, [Validators.required, Validators.email]],
      tele: [client.numero_tele, [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")]],
      password: [client.password, [Validators.required, Validators.minLength(4)]],
      passwordConfirm: [client.password, [Validators.required, Validators.minLength(4)]],
      sexe : [client.sexe, [Validators.required]],
      date_naissance : [client.date_naissance.split('T')[0], [Validators.required]],
      profession : [client.profession, [Validators.required]]

  });
  console.log(this.registerForm.value.tele);

  }
}
