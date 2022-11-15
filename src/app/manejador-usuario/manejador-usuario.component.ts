import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../servicios/usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-manejador-usuario',
  templateUrl: './manejador-usuario.component.html',
  styleUrls: ['./manejador-usuario.component.scss']
})
export class ManejadorUsuarioComponent implements OnInit {
  @Input() usuario: Usuario | null = null;
  @Output() mostrarHistoriaClinicaEvent: EventEmitter<boolean> = new EventEmitter();
  loading: boolean = false;
  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  verificarUsuario(status: boolean){
    if(this.usuario){
      let estadoOriginal = this.usuario.verificado;
      this.loading = true;
      this.usuario!.verificado = status;
      this.usuarioService.modificarUsuario(this.usuario)
        .then((res)=>{          
          this.loading = false;
        })
        .catch((error)=>{
          console.log(error)
          this.usuario!.verificado = estadoOriginal;
        });
    }
  }

  mostrarHistoriaClinica(){
    this.mostrarHistoriaClinicaEvent.emit(true);
  }
}
