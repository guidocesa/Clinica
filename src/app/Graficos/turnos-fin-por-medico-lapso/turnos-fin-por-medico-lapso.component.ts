import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BaseChartDirective } from 'ng2-charts';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Usuario } from 'src/app/servicios/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-turnos-fin-por-medico-lapso',
  templateUrl: './turnos-fin-por-medico-lapso.component.html',
  styleUrls: ['./turnos-fin-por-medico-lapso.component.scss']
})
export class TurnosFinPorMedicoLapsoComponent implements OnInit {

  desde: Date | null = null;
  hasta: Date | null = null;
  dias: any[] = [];
  turnos: any[] = [];
  soloFinalizados = false;
  fecha: Date = new Date();
  especialistas: Usuario[] = [];
  cantidades: number[] = [];

  datasets: ChartDataset[] = [];
  labels: BaseChartDirective['labels'] = [];
  options: ChartOptions = {responsive: true};
  legend = true;
  plugins = [];

  constructor(private turnosService: TurnosService, private usuariosService: UsuarioService) {
    this.usuariosService.getUsuariosPorPerfilVC('especialista').subscribe((data)=>{
      this.especialistas = data.map(function(especialista) {
        return especialista;
      });
    });
  }

  ngOnInit(): void { }

  buscar(){
    this.labels = [];
    this.datasets = [];
    this.cantidades = [];

    this.especialistas.forEach((especialista)=>{
      this.labels!.push(especialista.nombre+' '+especialista.apellido);
    });

    if(this.desde && this.hasta){

      this.turnosService.getTurnosBetweenDates(this.desde!, this.hasta!).forEach((value)=>{
        console.log(value);
        this.turnos = value;
        this.labels!.forEach((especialista)=>{
          let cantidad = 0;
          this.turnos.forEach((turno)=>{
            if(turno.especialista == especialista){
              if(this.soloFinalizados){
                if(turno.estado == 'Finalizado'){
                  cantidad++;
                }
              }
              else{
                cantidad++;
              }
            }
          })
          this.cantidades.push(cantidad);
        })
        this.datasets = [
          { 
            data: this.cantidades,
            label: 'Turnos', 
            backgroundColor: 'rgba(255,0,0,0.4)',
            borderColor: 'blue',
          }
        ];
      }).catch(error=>console.log(error));

      console.log(this.turnos);


    }
  }  

  downloadPdf(){
    const grafico = document.getElementById('grafico');

    html2canvas(document.querySelector('#grafico')!).then(canvas=>{
      let imgWidht = 200;
      let imgHeight = canvas.height * imgWidht /canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p','mm','a4');
      pdf.addImage(contentDataURL, 'png', 0, 0, imgWidht, imgHeight);
      pdf.save('turnosFinalizadosEntreFechas');
    });
  }

  checkboxChange(valor:any){
    this.soloFinalizados = valor;
  }

  exportarExcel(){
    let element = document.getElementById('tabla-excel');
    const workSheet: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();    
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Usuarios');
    
    XLSX.writeFile(workBook, "turnosPorEspecialista" + this.desde?.toDateString() + "--" + this.hasta?.toDateString() + ".xlsx");
  }


  

}
