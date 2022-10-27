import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FirestorageService } from '../servicios/firestorage.service';

@Component({
  selector: 'app-botones-rapidos',
  templateUrl: './botones-rapidos.component.html',
  styleUrls: ['./botones-rapidos.component.scss']
})
export class BotonesRapidosComponent implements OnInit, OnChanges {


  @Input() listaUsuarios: any;
  @Input() tipoUsuarios= '';
  @Output() usuarioEmitido: EventEmitter<any> = new EventEmitter();

  constructor(private fs: FirestorageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fs.getlistado(this.tipoUsuarios).forEach( x => this.listaUsuarios = x);
  }
  
  emitirUsuario(usuario : any) {
    this.usuarioEmitido.emit(usuario);
  }


}
