import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirestorageService } from '../servicios/firestorage.service';

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


  constructor(private dbService: FirestorageService) { }

  itemSeleccionado : any;
  opcion :any;

  headers = ["DNI", "Nombre Completo","Perfil", "Accion"];
  ngOnInit(): void {

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

}
