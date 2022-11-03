import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestorageService } from '../servicios/firestorage.service';
import { Usuario } from '../servicios/usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-botones-rapidos',
  templateUrl: './botones-rapidos.component.html',
  styleUrls: ['./botones-rapidos.component.scss']
})
export class BotonesRapidosComponent implements OnInit {
  
  @Output() usuarioEmitido: EventEmitter<any> = new EventEmitter();

  lista: Usuario[] = [];
  list: Observable<Usuario[]> | null = null;

  constructor(private us: UsuarioService) { }

  ngOnInit(): void {
    this.list = this.us.getUsuarios();
  }
  
  emitirUsuario(usuario : any) {
    this.usuarioEmitido.emit(usuario);
  }


}
