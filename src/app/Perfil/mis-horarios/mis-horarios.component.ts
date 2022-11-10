import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from '../../servicios/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.scss']
})
export class MisHorariosComponent implements OnInit {
  usuario: Usuario | null = null;
  especialidadElegida: any | null = null;
  dias = {"Lunes" : false , "Martes" : false , "Miercoles" : false , "Jueves" : false , "Viernes" : false};
  diasDefault = {"Lunes" : false , "Martes" : false , "Miercoles" : false , "Jueves" : false , "Viernes" : false};
  desde = 9;
  desdeDefault = 9;
  hasta = 17;
  hastaDefault = 17;
  duracion = 30;
  duracionDefault = 30;
  horarios = [9,10,11,12,13,14,15,16,17];
  loading: boolean = false;

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
  }

  cargarValores(){
    this.usuario!.especialidades.forEach((especialidad)=>{
      if(especialidad.descripcion == this.especialidadElegida.descripcion){
        if(especialidad.dias !== undefined){
          this.dias = especialidad.dias;
        }else{
          this.dias = this.diasDefault;
        } 
        if(especialidad.duracionTurnoMinutos !== undefined){
          this.duracion = especialidad.duracionTurnoMinutos;
        }else{
          this.duracion = this.duracionDefault;
        }
        if(especialidad.disponibilidadHoraria !== undefined){
          this.desde = especialidad.disponibilidadHoraria.horaEntrada;
          this.hasta = especialidad.disponibilidadHoraria.horaSalida;
        }else{
          this.desde = this.desdeDefault;
          this.hasta = this.hastaDefault;
        }
      }
    });
  }

  elegirEspecialidad(especialidad: any){
    this.especialidadElegida = especialidad;
    this.cargarValores();
  }

  guardar(){
    this.loading = true;
    this.usuario!.especialidades.forEach((especialidad)=>{
      if(especialidad.descripcion == this.especialidadElegida.descripcion){
        especialidad.duracionTurnoMinutos = this.duracion;
        especialidad.disponibilidadHoraria = {
          horaEntrada: this.desde,
          horaSalida: this.hasta
        };
        especialidad.dias = this.dias;
      }
    });
    this.usuarioService.editarUsuario(this.usuario!).then((res)=>{
      this.loading = false;
      this._snackBar.open('Datos actualizados!', '', {
        duration: 8000,
        panelClass: ['custom-snackbar']
      });
    }).catch((error)=>{
      console.log(error)
      this.loading = false;
    });
  }
  
}
