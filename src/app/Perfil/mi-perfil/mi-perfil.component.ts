import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from '../../servicios/usuario';
import { HistoriaClinica } from '../../servicios/historia-clinica';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { HistoriaClinicaService } from '../../servicios/historia-clinica.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  usuario!: Usuario;
  lista!: Observable<(HistoriaClinica & {id: string;})[]>;
  noMostrar: string[] = ['especialista_id', 'paciente_id', 'fecha', 'id', 'turno_id'];
  fecha: Date = new Date();

  constructor(private authService: AuthService, private historiaService: HistoriaClinicaService) { }

  ngOnInit(): void{ 
    console.log(this.authService.usuario);
    if(this.authService.usuario){
      this.usuario = this.authService.usuario;
      if(this.usuario.perfil == 'paciente'){
        this.lista = this.historiaService.getHistoriasUsuario(this.authService.usuario)
      }
    }
  }

  descargarHistoriaClinica(){
    //const grafico = document.getElementById('historiapdf');

    html2canvas(document.querySelector('#historiapdf')!).then(canvas=>{
      let imgWidht = 200;
      let imgHeight = canvas.height * imgWidht /canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p','mm','a4');
      pdf.addImage(contentDataURL, 'png', 0, 0, imgWidht, imgHeight);
      pdf.save('historiaClinica');
    });
   /*  var data = document.getElementById('pdf');
      html2canvas(data).then(canvas=>{
        var imgWidht = 309;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidht /canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p','mm','a4');
        var position = 0;
        pdf.addImage(contentDataURL,'png',0,position,imgWidht,imgHeight);
        pdf.save('MisDatos');
    }); */
  }
}
