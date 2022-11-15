import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/servicios/turno';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  //turnos: Observable<Turno[]>;
  listaTurnos: Turno[] = [];
  listaTurnosFiltrados: Turno[] = [];
  _filtro = '';
  @Input()  
  set filtro(value: any){
    this._filtro = value;
    this.filtroTurnos(); 
  }
  perfil: string = '';
  @Output() turnoElegidoEvent: EventEmitter<Turno> = new EventEmitter<Turno>();
  match: boolean = false;


  constructor(private authService: AuthService, private turnosService: TurnosService) { }

  ngOnInit(): void {
    if(this.authService.usuario){
      this.turnosService.getTurnos(this.authService.usuario).pipe(
        map((actions) => {
          this.listaTurnos = [];
          actions.map(a => {
            const turno = a.payload.doc.data();
            turno.id = a.payload.doc.id;
            let ts = new Timestamp(turno.fechaHora.seconds, turno.fechaHora.nanoseconds);
            turno.fechaHora = ts.toDate();
            this.listaTurnos.push(turno);
          });
        })
      ).subscribe((subs)=>{
        this.listaTurnosFiltrados = this.listaTurnos;
        this.filtroTurnos();
      });      
      this.perfil = this.authService.usuario.perfil;
    }
  }

  filtroTurnos() {
    this._filtro = this._filtro.toLowerCase();

    this.listaTurnosFiltrados = this.listaTurnos.filter((turno) => {  

      let date = new Date(turno.fechaHora);
      if (turno.especialista.toLowerCase().includes(this._filtro) ||
        turno.especialidad.toLowerCase().includes(this._filtro) ||
        date.getDate().toString().includes(this._filtro) ||
        date.getMonth().toString().includes(this._filtro) ||
        date.getHours().toString().includes(this._filtro) ||
        date.getMinutes().toString().includes(this._filtro) ||
        turno.paciente.toLowerCase().includes(this._filtro) ||
        turno.estado.toLowerCase().includes(this._filtro)
      ){
        return turno;
      }
      //Busco en la historia clinica del turno
      if(turno.historia && turno.historia.toLowerCase().includes(this._filtro)){
        return turno;
      }
      return null;
    });
  }

  seleccionarTurno(turno: Turno){
    this.turnoElegidoEvent.emit(turno);
  }

}
