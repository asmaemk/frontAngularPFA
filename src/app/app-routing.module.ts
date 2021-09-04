import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AdminClientSideComponent } from './admin-client-side/admin-client-side.component';
import { AdminSousAdminSideComponent } from './admin-sous-admin-side/admin-sous-admin-side.component';
import { AdminSpecialisteSideComponent } from './admin-specialiste-side/admin-specialiste-side.component';
import { AdminComponent } from './admin/admin.component';
import { AnexityComponent } from './anexity/anexity.component';
import { AuthAdminGuardGuard } from './auth-admin-guard.guard';
import { AuthClientGuardGuard } from './auth-client-guard.guard';
import { AuthSpecialisteGuardGuard } from './auth-specialiste-guard.guard';
import { AuthGuard } from './auth.guard';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DepressionComponent } from './depression/depression.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ErrorInRoutingComponent } from './error-in-routing/error-in-routing.component';
import { HomeComponent } from './home/home.component';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { LoginComponent } from './login/login.component';
import { ModifierSpecialisteComponent } from './modifier-specialiste/modifier-specialiste.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistreClientComponent } from './registre-client/registre-client.component';
import { RegistreSpecialisteComponent } from './registre-specialiste/registre-specialiste.component';
import { SpacialisteHomeComponent } from './spacialiste-home/spacialiste-home.component';
import { StressComponent } from './stress/stress.component';
import { TestPsycoComponent } from './test-psyco/test-psyco.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { UpdateSpecialisteComponent } from './update-specialiste/update-specialiste.component';


const routes: Routes = [

{
  
path : '',
redirectTo : '/acceuil',
pathMatch : 'full'

},
{
  path : 'client/modifier-client/:id',
  component : EditProfileComponent
},
{
  path : 'profile',
  component : ProfileComponent
},
{
  path:'test',
  component:TestPsycoComponent
},
{

  path : 'login-google',
  component : LoginGoogleComponent

},
{
  path : 'specialiste/modifier-specialiste/:id',
  component : ModifierSpecialisteComponent,
  // canActivate : [AuthSpecialisteGuardGuard]
},
{
path : 'admin/update/client/:id',
component : UpdateClientComponent

},
{
  path : 'denied',
  component : AccessDeniedComponent

},
{
  path : 'acceuil',
  component : AcceuilComponent
},
{
  path : 'acceuil/:id',
  component : ConfirmationComponent
},
{
  path : 'specialiste/home',
  component : SpacialisteHomeComponent,
  canActivate : [AuthSpecialisteGuardGuard]

},

{

  path : 'registre/specialiste',
  component : RegistreSpecialisteComponent

},
{
  path : 'registre/client',
  component : RegistreClientComponent,
  canActivate : [AuthGuard ]
},
{
  path : 'client/test/anexity',
  component : AnexityComponent,
  canActivate : [AuthClientGuardGuard ]
},
{
  path : 'client/test/stress',
  component : StressComponent,
  canActivate : [AuthClientGuardGuard ]
},
{
  path : 'client/test/depression',
  component : DepressionComponent,
  canActivate : [AuthClientGuardGuard ]
},

{
path : 'home',
component : HomeComponent,
canActivate : [AuthClientGuardGuard],}
,
{
   path : 'admin',
   component : AdminComponent ,
   canActivate : [AuthAdminGuardGuard ],

},
{ 
  path : 'admin/client-side',
  component : AdminClientSideComponent ,
  canActivate : [AuthAdminGuardGuard ]
}
,
{
  path : 'admin/client-side/add',
  component : RegistreClientComponent ,
  canActivate : [AuthAdminGuardGuard ],
},
{
  path : 'admin/specialiste-side/add',
  component : RegistreSpecialisteComponent ,
  canActivate : [AuthAdminGuardGuard ],

},
{ 
  path : 'admin/client-side/update/:id',
  component : UpdateClientComponent ,
  canActivate : [AuthAdminGuardGuard ]
}
,
{ 
  path : 'admin/specialiste-side/update/:id',
  component : UpdateSpecialisteComponent,
  canActivate : [AuthAdminGuardGuard ]
}
,
{
  
  path : 'admin/specialiste-side',
  component : AdminSpecialisteSideComponent,
  canActivate : [AuthAdminGuardGuard ]
},
{
  
  path : 'admin/sous-admin-side',
  component : AdminSousAdminSideComponent ,
  canActivate : [AuthAdminGuardGuard ]
},
{

   path : 'login',
   component : LoginComponent,
   canActivate : [AuthGuard ]

},
{
  path : '**',
  component : ErrorInRoutingComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
