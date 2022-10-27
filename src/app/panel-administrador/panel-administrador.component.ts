import { Component, OnInit } from '@angular/core';
import { FirestorageService } from '../servicios/firestorage.service';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { RegisterAdminComponent } from '../Registros/register-admin/register-admin.component';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent implements OnInit {

  profesionales:any;
  loading = false;

  constructor(private fs: FirestorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.fs.getlistado('profesionales').forEach( (x:any) => {
      this.profesionales = x;
      this.loading = false;
    })
  }
  openDialogBox()
  {
    this.dialog.open(RegisterAdminComponent);
  }
  recargarTabla(tipo:string)
  {
    this.loading = true;
    console.log(this.profesionales);
    this.fs.getlistado(tipo).forEach( (x:any) => {
      this.profesionales = x;
      this.loading = false;
    })
  }
  habilitarProfesional(email:string)
  {
    this.fs.verificarProfesional(email);
  }

}
