import { Component, OnInit } from '@angular/core';
import { FirestorageService } from '../servicios/firestorage.service';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { RegisterAdminComponent } from '../register-admin/register-admin.component';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent implements OnInit {

  profesionales:any;

  constructor(private fs: FirestorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fs.getlistado('profesionales').forEach( x =>
      this.profesionales = x);
  }
  openDialogBox()
  {
    this.dialog.open(RegisterAdminComponent);
  }
  recargarTabla(tipo:string)
  {
    this.fs.getlistado(tipo).forEach( x =>
      this.profesionales = x);
  }

}
