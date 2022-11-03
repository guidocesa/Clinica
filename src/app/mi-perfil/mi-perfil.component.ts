import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../servicios/usuario';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  usuario!: Usuario;
  noMostrar: string[] = ['especialista_id', 'paciente_id', 'fecha', 'id', 'turno_id'];
  fecha: Date = new Date();

  constructor(private authService: AuthService) { }

  ngOnInit(): void{ 
    console.log(this.authService.usuario);
    if(this.authService.usuario){
      this.usuario = this.authService.usuario;
    }
  }
}
