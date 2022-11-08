import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/servicios/turno';

@Component({
  selector: 'app-menu-turnos',
  templateUrl: './menu-turnos.component.html',
  styleUrls: ['./menu-turnos.component.scss']
})
export class MenuTurnosComponent implements OnInit {


  pedirTurno: boolean = false;
  turnoElegido!: Turno;
  perfil: string = '';
  mostrarHistoria: boolean = false;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.usuario){
      this.perfil = this.authService.usuario.perfil;
    }
  }

  recibirTurnoElegido(turno: Turno){
    this.turnoElegido = turno;
  }

  mostrarHistoriaClinica(mostrar: boolean){
    if(mostrar && this.turnoElegido){
      this.mostrarHistoria = true;
    }
  }

  cerrarHistoria(cerrar: boolean){
    if(cerrar){
      this.mostrarHistoria = false;
    }
  }

}
