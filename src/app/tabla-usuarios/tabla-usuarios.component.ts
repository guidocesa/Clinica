import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirestorageService } from '../servicios/firestorage.service';
import { HistoriaClinicaService } from '../servicios/historia-clinica.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {

  @Input() listaItems: any;
  @Input() filtro!: string;
  @Input() perfil: any;
  @Output() habilitarProfesionalEmit: EventEmitter<any> = new EventEmitter();
  @Output() mostrarHistoriaEmit: EventEmitter<any> = new EventEmitter();


  constructor(private dbService: FirestorageService, private hc: HistoriaClinicaService) { }

  itemSeleccionado : any;
  opcion :any;
  historiasClinicas: any;

  headers = ["DNI", "Nombre Completo","Perfil", "Accion"];
  ngOnInit(): void {
    this.hc.getHistorias().subscribe()

  }

  async seleccionItem(item : any){
    this.itemSeleccionado= undefined;
    await setTimeout(() => {
      this.itemSeleccionado= item;
    
    }, 200);
  }

  habilitarProfesional(email:string)
  {
    this.habilitarProfesionalEmit.emit(email);
  }

  mostrarHistoria(usuario: any)
  {
    this.mostrarHistoriaEmit.emit(usuario);
  }

}
