import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { Turno } from '../servicios/turno';
import { TurnosService } from '../servicios/turnos.service';
import { Usuario } from '../servicios/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  pacientesDb: Usuario[] = [];
  listaPacientes: Usuario[] = [];
  arrayFabs: MatFabMenu[] = [];
  listaTurnos: Turno[] = [];
  loading: boolean = false;
  usuarioElegido!: Usuario;
  mostrarHistoria: boolean = false;
  pruebaEmitt: EventEmitter<string | number> = new EventEmitter();

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
          this.cargarFabs(this.listaPacientes);          
          this.loading = false;
        });
      });
    }
  }

  cargarFabs(lista : any){


    for (let index = 0; index < lista.length; index++) {
      this.arrayFabs.push({
        id:index,
        imgUrl: lista[index].imagen1Url,
        tooltip: (lista[index].nombre + ' ' + lista[index].apellido),
        tooltipPosition: 'below',
        
      })
      
    }
  }

  seleccionarPaciente(paciente: Usuario){
    this.mostrarHistoria = false;
    this.usuarioElegido = paciente;
    this.mostrarHistoria = true;
  }

  pacienteSeleccionado(index:any)
  {
      this.usuarioElegido = new Usuario();
      this.mostrarHistoria = false;
      this.usuarioElegido = this.listaPacientes[parseInt(index)];
      this.mostrarHistoria = true;
  }


}
