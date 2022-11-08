import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './login/login.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PanelAdministradorComponent } from './panel-administrador/panel-administrador.component';
import { RegisterEspecialistaComponent } from './Registros/register-especialista/register-especialista.component';
import { RegisterPacienteComponent } from './Registros/register-paciente/register-paciente.component';
import { RegisterComponent } from './Registros/register/register.component';
import { MenuTurnosComponent } from './Turnos/menu-turnos/menu-turnos.component';
import { UserNotVerifiedComponent } from './user-not-verified/user-not-verified.component';

const routes: Routes = [
  {path: '', redirectTo: 'bienvenido', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'registroprofesional', component: RegisterEspecialistaComponent},
  {path: 'registropaciente', component: RegisterPacienteComponent},
  {path: 'bienvenido', component: BienvenidaComponent},
  {path: 'paneladministrador', component: PanelAdministradorComponent},
  {path: 'usuarionoverificado', component: UserNotVerifiedComponent},
  {path: 'miperfil', component:MiPerfilComponent},
  {path: 'misturnos', component: MenuTurnosComponent},
  {path: 'pacientes', component: PacientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
