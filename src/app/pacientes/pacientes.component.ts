import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { Turno } from '../servicios/turno';
import { TurnosService } from '../servicios/turnos.service';
import { Usuario } from '../servicios/usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  pacientesDb: Usuario[] = [];
  listaPacientes: Usuario[] = [];
  listaTurnos: Turno[] = [];
  loading: boolean = false;
  usuarioElegido!: Usuario;
  mostrarHistoria: boolean = false;

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private turnosService: TurnosService) { }

  ngOnInit(): void {
    this.loading = true;
    if(this.authService.usuario && this.authService.usuario.perfil == 'especialista'){
      this.usuarioService.getUsuariosPorPerfil('paciente').pipe(
        map((actions) => {
          this.listaPacientes = [];
          actions.map(a => {
            const paciente: Usuario = a.payload.doc.data();
            this.pacientesDb.push(paciente);
          });
        })
      ).subscribe((subs)=>{
        this.turnosService.getTurnosEspecialista(this.authService.usuario!).pipe(
          map((actions) => {
            this.listaTurnos = [];
            actions.map(a => {
              const turno: Turno = a.payload.doc.data();
              this.listaTurnos.push(turno);
            });
          })
        ).subscribe((subs2)=>{
          //Filtro los pacientes
          this.listaPacientes = this.pacientesDb.filter((usuario)=>{
            let agregar = false;
            this.listaTurnos.forEach((turno)=>{
              if(turno.pacienteId == usuario.uid){
                agregar = true;
              }
            });
            if(agregar) return true;
            return false;
          });
          this.loading = false;
        });
      });
    }
  }

  seleccionarPaciente(paciente: Usuario){
    this.mostrarHistoria = false;
    this.usuarioElegido = paciente;
    this.mostrarHistoria = true;
  }


}
