import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirestorageService } from '../servicios/firestorage.service';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.scss']
})
export class TablaTurnosComponent implements OnInit {

  @Input() listaItems: any;
  @Input() perfil: any;
  @Output() habilitarProfesionalEmit: EventEmitter<any> = new EventEmitter();


  constructor(private dbService: FirestorageService) { }

  itemSeleccionado : any;
  opcion :any;

  headers = ["Fecha", "Nombre Especialista", "Especialidad", "Estado","Foto", "Acciones"];
  ngOnInit(): void {

  }

  async seleccionItem(item : any){
    this.itemSeleccionado= undefined;
    await setTimeout(() => {
      this.itemSeleccionado= item;
    
    }, 200);
  }
}
