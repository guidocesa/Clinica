import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { RegisterComponent } from './Registros/register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterEspecialistaComponent } from './Registros/register-especialista/register-especialista.component';
import { RegisterPacienteComponent } from './Registros/register-paciente/register-paciente.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { PanelAdministradorComponent } from './panel-administrador/panel-administrador.component';
import { UserNotVerifiedComponent } from './user-not-verified/user-not-verified.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterAdminComponent } from './Registros/register-admin/register-admin.component';
import { BotonesRapidosComponent } from './botones-rapidos/botones-rapidos.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MisTurnosComponent } from './Turnos/mis-turnos/mis-turnos.component';
import { PedirTurnoComponent } from './Turnos/pedir-turno/pedir-turno.component';
import { MenuTurnosComponent } from './Turnos/menu-turnos/menu-turnos.component';
import { MiPerfilComponent } from './Perfil/mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './Perfil/mis-horarios/mis-horarios.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DetalleTurnoComponent } from './Turnos/detalle-turno/detalle-turno.component';
import { ReseniaDialogComponent } from './resenia-dialog/resenia-dialog.component';
import { RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { TimestampToDatePipe } from './shared/Pipes/timestamp-to-date.pipe';
import { BoolToSinoPipe } from './shared/Pipes/bool-to-sino.pipe';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AltaHistoriaClinicaComponent } from './alta-historia-clinica/alta-historia-clinica.component';
import { SharedModule } from './shared/shared.module';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ManejadorUsuarioComponent } from './manejador-usuario/manejador-usuario.component';
import { InformesComponent } from './informes/informes.component';
import { TurnosDiaComponent } from './Graficos/turnos-dia/turnos-dia.component';
import { TurnosEspecialidadComponent } from './Graficos/turnos-especialidad/turnos-especialidad.component';
import { TurnosFinPorMedicoLapsoComponent } from './Graficos/turnos-fin-por-medico-lapso/turnos-fin-por-medico-lapso.component';
import { NgChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { PintarTurnoStatusDirective } from './Directivas/pintar-turno-status.directive';
import { ResaltarDirective } from './Directivas/resaltar.directive';
import { AgrandarDirective } from './Directivas/agrandar.directive';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    RegisterComponent,
    LoginComponent,
    RegisterEspecialistaComponent,
    RegisterPacienteComponent,
    TablaUsuariosComponent,
    PanelAdministradorComponent,
    UserNotVerifiedComponent,
    RegisterAdminComponent,
    BotonesRapidosComponent,
    SpinnerComponent,
    MisTurnosComponent,
    PedirTurnoComponent,
    MenuTurnosComponent,
    DetalleTurnoComponent,
    ReseniaDialogComponent,
    HistoriaClinicaComponent,
    PacientesComponent,
    AltaHistoriaClinicaComponent,
    UsuariosComponent,
    ManejadorUsuarioComponent,
    InformesComponent,
    TurnosDiaComponent,
    TurnosEspecialidadComponent,
    TurnosFinPorMedicoLapsoComponent,
    PintarTurnoStatusDirective,
    ResaltarDirective,
    AgrandarDirective,
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SharedModule,
    MatFabMenuModule,
    NgChartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRippleModule
  ],
  providers: [ AngularFireAuth, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, { provide: MatDialogRef, useValue: {}}, DatePipe, {
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.recaptcha.siteKey,
    } as RecaptchaSettings,
  }, BoolToSinoPipe, TimestampToDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
