import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BaseChartDirective } from 'ng2-charts';
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { Turno } from 'src/app/servicios/turno';
import { TurnosService } from 'src/app/servicios/turnos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-turnos-especialidad',
  templateUrl: './turnos-especialidad.component.html',
  styleUrls: ['./turnos-especialidad.component.scss']
})
export class TurnosEspecialidadComponent implements OnInit {

  turnos: Turno[] = [];
  especialidadesObj: any[] = [];
  especialidades: any[] = [];
  cantidades: number[] = [];
  fecha: Date = new Date();


  datasets: ChartDataset[] = [];
  labels: BaseChartDirective['labels'] = [];
  options: ChartOptions = {responsive: true};
  legend = true;
  plugins = [];

  constructor(private turnosService: TurnosService, private afs: FirestorageService) {

    this.turnosService.getAllTurnos().subscribe((data)=>{
      this.turnos = data.map(function(turno) {
        return turno;
      });
    });

    this.afs.getEspecialidades2().subscribe((especialidades)=>{
      this.especialidadesObj = especialidades.map(function(especialidad) {
        return especialidad;
      });
    });
  }

  ngOnInit(): void { 
    setTimeout(()=>{
      let cantidad: number = 0;
      this.especialidadesObj.forEach((especialidad:any) => {
        console.log(especialidad);
        cantidad = 0;
        this.labels!.push(especialidad.descripcion)
        this.turnos.forEach(turno => {
          console.log(turno);
          if(especialidad.descripcion == turno.especialidad){
            cantidad++;
          }
        });
        this.cantidades.push(cantidad);
      });
      
      console.log(this.cantidades);
      this.datasets = [
        { 
          data: this.cantidades,
          label: 'Turnos', 
          backgroundColor: 'rgba(255,0,0,0.4)',
          borderColor: 'blue',
        }
      ];
    },2500);
  }
  
  downloadPdf(){
    const grafico = document.getElementById('grafico');

    html2canvas(document.querySelector('#grafico')!).then(canvas=>{
      let imgWidht = 200;
      let imgHeight = canvas.height * imgWidht /canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p','mm','a4');
      pdf.addImage(contentDataURL, 'png', 0, 0, imgWidht, imgHeight);
      pdf.save('turnosPorEspecialidad');
    });
  }  


  
  exportarExcel(){
    let element = document.getElementById('tabla-excel');
    const workSheet: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();    
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Usuarios');
    
    XLSX.writeFile(workBook, "turnosPorEspecialidad.xlsx");
  }

}
