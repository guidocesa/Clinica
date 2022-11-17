import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { LoggerService } from '../servicios/logger.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  logins: any[] = [];
  grafTurnosEsp: boolean = false;
  grafTurnosDia: boolean = false;
  grafTurnosSolMed: boolean = false;
  grafTurnosFinMed: boolean = false;

  constructor(private loggerService: LoggerService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loggerService.getLogins().subscribe((data)=>{
      this.logins = data;
    });
  }

  mostrarGrafico(grafico: string){
    switch (grafico) {
      case 'turnosEsp':
        this.grafTurnosEsp = true;
        this.grafTurnosDia = false;
        this.grafTurnosSolMed = false;
        this.grafTurnosFinMed = false;
        break;
      case 'turnosDia':
        this.grafTurnosEsp = false;
        this.grafTurnosDia = true;
        this.grafTurnosSolMed = false;
        this.grafTurnosFinMed = false;
        break;
      case 'turnosSolMed':
        this.grafTurnosEsp = false;
        this.grafTurnosDia = false;
        this.grafTurnosSolMed = true;
        this.grafTurnosFinMed = false;
        break;
      case 'turnosFinMed':
        this.grafTurnosEsp = false;
        this.grafTurnosDia = false;
        this.grafTurnosSolMed = false;
        this.grafTurnosFinMed = true;
        break;
    }
  }
        
  downloadInformeLogin(){
    this.logins.forEach((login)=>{
      login.datetime = this.datePipe.transform(login.datetime.seconds * 1000, 'dd-MM-yyyy HH:ss');
    });

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.logins);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();    
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Logins');
    XLSX.writeFile(workBook, "logins.xlsx");
  }
}
