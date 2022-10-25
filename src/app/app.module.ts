import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterEspecialistaComponent } from './register-especialista/register-especialista.component';
import { RegisterPacienteComponent } from './register-paciente/register-paciente.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { RegisterAdministradorComponent } from './register-administrador/register-administrador.component';
import { PanelAdministradorComponent } from './panel-administrador/panel-administrador.component';
import { UserNotVerifiedComponent } from './user-not-verified/user-not-verified.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    RegisterComponent,
    LoginComponent,
    RegisterEspecialistaComponent,
    RegisterPacienteComponent,
    TablaUsuariosComponent,
    RegisterAdministradorComponent,
    PanelAdministradorComponent,
    UserNotVerifiedComponent,
    RegisterAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [ AngularFireAuth, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, { provide: MatDialogRef, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
