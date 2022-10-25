import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

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

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    RegisterComponent,
    LoginComponent,
    RegisterEspecialistaComponent,
    RegisterPacienteComponent,
    TablaUsuariosComponent,
    RegisterAdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ AngularFireAuth, { provide: FIREBASE_OPTIONS, useValue: environment.firebase } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
