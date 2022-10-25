import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './login/login.component';
import { PanelAdministradorComponent } from './panel-administrador/panel-administrador.component';
import { RegisterEspecialistaComponent } from './register-especialista/register-especialista.component';
import { RegisterPacienteComponent } from './register-paciente/register-paciente.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', redirectTo: 'bienvenido', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'registroprofesional', component: RegisterEspecialistaComponent},
  {path: 'registropaciente', component: RegisterPacienteComponent},
  {path: 'bienvenido', component: BienvenidaComponent},
  {path: 'paneladministrador', component: PanelAdministradorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
