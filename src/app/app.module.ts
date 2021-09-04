import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthService } from './auth.service';
import { RegistreClientComponent } from './registre-client/registre-client.component';
import { RegistreSpecialisteComponent } from './registre-specialiste/registre-specialiste.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { TokenIntercepterInterceptor } from './token-intercepter.interceptor';
import { AdminComponent } from './admin/admin.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ErrorInRoutingComponent } from './error-in-routing/error-in-routing.component';
import { SpacialisteHomeComponent } from './spacialiste-home/spacialiste-home.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AdminClientSideComponent } from './admin-client-side/admin-client-side.component';
import { AdminSpecialisteSideComponent } from './admin-specialiste-side/admin-specialiste-side.component';
import { AdminSousAdminSideComponent } from './admin-sous-admin-side/admin-sous-admin-side.component';
import { UpdateSpecialisteComponent } from './update-specialiste/update-specialiste.component';
import { NavBarAdminComponent } from './nav-bar-admin/nav-bar-admin.component';
import { SocialAuthService, SocialLoginModule,GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { ToastrModule } from 'ngx-toastr';
import { TestPsycoComponent } from './test-psyco/test-psyco.component';
import { NavBarTestComponent } from './nav-bar-test/nav-bar-test.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ModifierSpecialisteComponent } from './modifier-specialiste/modifier-specialiste.component';
import { AnexityComponent } from './anexity/anexity.component';
import { DepressionComponent } from './depression/depression.component';
import { StressComponent } from './stress/stress.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegistreClientComponent,
    RegistreSpecialisteComponent,
    AdminComponent,
    UpdateClientComponent,
    ErrorInRoutingComponent,
    SpacialisteHomeComponent,
    AcceuilComponent,
    AccessDeniedComponent,
    ConfirmationComponent,
    AdminClientSideComponent,
    AdminSpecialisteSideComponent,
    AdminSousAdminSideComponent,
    UpdateSpecialisteComponent,
    NavBarAdminComponent,
    LoginGoogleComponent,
    TestPsycoComponent,
    NavBarTestComponent,
    ProfileComponent,
    EditProfileComponent,
    ModifierSpecialisteComponent,
    AnexityComponent,
    DepressionComponent,
    StressComponent,
   
  ],

  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    ToastrModule.forRoot()

  ],
  providers: [AuthService,SocialAuthService,AuthGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  },{
    provide : 'SocialAuthServiceConfig',
    useValue : {
      autoLogin : false,
      providers : [{
        id : GoogleLoginProvider.PROVIDER_ID,
        provider : new GoogleLoginProvider('244329570858-kmf3eugpftm204q7vu327rcd65h8lash.apps.googleusercontent.com')
      }]
    } as SocialAuthServiceConfig
  } 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
