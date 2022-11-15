import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './login/login.component';
import { MiPerfilComponent } from './Perfil/mi-perfil/mi-perfil.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PanelAdministradorComponent } from './panel-administrador/panel-administrador.component';
import { RegisterEspecialistaComponent } from './Registros/register-especialista/register-especialista.component';
import { RegisterPacienteComponent } from './Registros/register-paciente/register-paciente.component';
import { RegisterComponent } from './Registros/register/register.component';
import { MenuTurnosComponent } from './Turnos/menu-turnos/menu-turnos.component';
import { UserNotVerifiedComponent } from './user-not-verified/user-not-verified.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path: '', redirectTo: 'bienvenido', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: { animation: 'isDown'}},
  {path: 'registro', component: RegisterComponent, data: { animation: 'isUp'}},
  {path: 'registroprofesional', component: RegisterEspecialistaComponent, data: { animation: 'isDown'}},
  {path: 'registropaciente', component: RegisterPacienteComponent, data: { animation: 'isUp'}},
  {path: 'bienvenido', component: BienvenidaComponent, data: { animation: 'isDown'}},
  {path: 'paneladministrador', component: PanelAdministradorComponent, data: { animation: 'isUp'}},
  {path: 'usuarionoverificado', component: UserNotVerifiedComponent},
  {path: 'miperfil', loadChildren: () => import('./Perfil/mi-perfil/mi-perfil.module').then( m => m.MiPerfilModule), data: { animation: 'isDown'}},
  {path: 'misturnos', component: MenuTurnosComponent, data: { animation: 'isUp'}},
  {path: 'pacientes', component: PacientesComponent, data: { animation: 'isDown'}},
  {path: 'usuarios', component: UsuariosComponent, data: {animation: 'isUp'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
