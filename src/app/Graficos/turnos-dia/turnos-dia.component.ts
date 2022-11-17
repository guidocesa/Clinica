import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Turno } from 'src/app/servicios/turno';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-turnos-dia',
  templateUrl: './turnos-dia.component.html',
  styleUrls: ['./turnos-dia.component.scss']
})
export class TurnosDiaComponent implements OnInit {

  turnos: Turno[] = [];
  turnosAny: any[] = [];
  especialidadesObj: any[] = [];
  especialidades: any[] = [];
  cantidades: number[] = [];
  fecha: Date = new Date();

  datasets: ChartDataset[] = [];
  labels: BaseChartDirective['labels'] = [];
  dias: string[] = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  options: ChartOptions = {responsive: true};
  legend = true;
  plugins = [];

  constructor(private turnosService: TurnosService, private datePipe: DatePipe) {
    this.turnosService.getAllTurnosAnyVc().subscribe((data)=>{
      this.turnosAny = data.map(function(turno) {
        return turno;
      });
    });
  }

  ngOnInit(): void { 
    setTimeout(()=>{
      let cantidad: number = 0;
      this.dias.forEach((dia) => {
        this.labels!.push(dia);
        cantidad = 0;
        this.turnosAny.forEach(turno => {
          let date = new Date(turno.fechaHora.seconds*1000);
          if(dia == this.dias[date.getDay()]){
            cantidad++;
          }
        });
        this.cantidades.push(cantidad);
      });

      this.datasets = [
        { 
          data: this.cantidades,
          label: 'Turnos', 
          backgroundColor: 'rgba(255,0,0,0.4)',
          borderColor: 'blue',
        }
      ];
    },2000);
  }
  
  downloadPdf(){
    const grafico = document.getElementById('grafico');

    html2canvas(document.querySelector('#grafico')!).then(canvas=>{
      let imgWidht = 200;
      let imgHeight = canvas.height * imgWidht /canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p','mm','a4');
      pdf.addImage(contentDataURL, 'png', 0, 0, imgWidht, imgHeight);
      pdf.save('turnosPordia');
    });
  }  

  exportarExcel(){
    let element = document.getElementById('tabla-excel');
    const workSheet: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();    
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Usuarios');
    
    XLSX.writeFile(workBook, "turnosPorDia.xlsx");
  }
}
