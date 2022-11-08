import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { HistoriaClinica } from '../servicios/historia-clinica';
import { HistoriaClinicaService } from '../servicios/historia-clinica.service';
import { Usuario } from '../servicios/usuario';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {

  @Input() usuarioElegido: Usuario | null = null;
  @Output() historiaElegidaEvent: EventEmitter<HistoriaClinica> = new EventEmitter<HistoriaClinica>();
  //listaHistorias: HistoriaClinica[] = [];
  lista!: Observable<(HistoriaClinica & {id: string;})[]>;
  perfil: string = '';
  loading: boolean = false;
  historiaElegida: HistoriaClinica | null = null;

  noMostrar: string[] = ['especialista_id', 'paciente_id', 'fecha', 'id', 'turno_id'];

  constructor(private authService: AuthService, private historiaService: HistoriaClinicaService) { }

  ngOnInit(): void {
    this.cargardatos();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.historiaElegida = null;
    this.cargardatos();
  }

  cargardatos(){
    if(this.usuarioElegido){
      this.lista = this.historiaService.getHistoriasUsuario(this.usuarioElegido);
      this.perfil = this.usuarioElegido.perfil;
    }else if(this.authService.usuario){
      this.lista = this.historiaService.getHistoriasUsuario(this.authService.usuario);    
      this.perfil = this.authService.usuario.perfil;
    }
  }

  seleccionarHistoria(historia: HistoriaClinica){
    this.historiaElegidaEvent.emit(historia);
  }
}
