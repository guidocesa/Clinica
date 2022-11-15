import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { Usuario } from '../servicios/usuario';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Observable<Usuario[]>;
  usuarioElegido: Usuario | null = null;
  nuevoUsuario: boolean = false;
  loading: boolean = false;
  mostrarHistoria: boolean = false;

  constructor(private usuarioService: UsuarioService) { 
    this.usuarios = this.usuarioService.getUsuarios();
  }

  ngOnInit(): void {
  }

  elegirUsuario(usuario: Usuario){
    this.mostrarHistoria = false;
    this.usuarioElegido = usuario;
  }

  mostrarHistoriaClinica(){
    this.mostrarHistoria = true;
  }

  exportarExcel(){
    let element = document.getElementById('tabla-excel');
    const workSheet: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();    
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Usuarios');
    
    XLSX.writeFile(workBook, "usuarios.xlsx");
  }

}
