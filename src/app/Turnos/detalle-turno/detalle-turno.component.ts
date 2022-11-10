import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/servicios/turno';
import { TurnoStatus } from 'src/app/servicios/turno-status';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ReseniaDialogComponent } from 'src/app/resenia-dialog/resenia-dialog.component';
import { HistoriaClinica } from 'src/app/servicios/historia-clinica';
import { fader } from 'src/app/animation';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.scss'],
})


export class DetalleTurnoComponent implements OnInit {

  isOpen = false;



  @Input() turno!: Turno;
  @Output() turnoFinalizadoEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  perfil: string = '';
  loading: boolean = false;
  noMostrar: string[] = ['especialista_id', 'paciente_id', 'fecha', 'id', 'turno_id'];
  historiaElegida: HistoriaClinica | null = null;
  
  mostrarFormCancelacion: boolean = false;
  mostrarFormCalificacion: boolean = false;
  mostrarFormRechazo: boolean = false;
  mostrarFormFinalizar: boolean = false;

  comentarioCancelacion: string = '';
  comentarioCalificacion: string = '';
  comentarioRechazo: string = '';
  comentarioFinalizar: string = '';

  constructor(
    private authService: AuthService,
    private turnoService: TurnosService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.authService.usuario){
      this.perfil = this.authService.usuario.perfil;
    }
  }

  submitForm(motivo: string){
    if(motivo == 'calificar'){
      this.turno.comentarioCalificacion = this.comentarioCalificacion;
    }else if(motivo == 'cancelar'){
      this.turno.comentarioCancelacion = this.comentarioCancelacion;
      this.turno.estado = TurnoStatus.cancelado;
      this.turno.canceladoPor = this.authService.usuario!.nombre+' '+this.authService.usuario!.apellido;  
    }else if(motivo == 'rechazar'){
      this.turno.comentarioRechazo = this.comentarioRechazo;
      this.turno.estado = TurnoStatus.rechazado;
    }else if(motivo == 'finalizar'){
      this.turno.comentarioFinalizar = this.comentarioFinalizar;
      this.turno.estado = TurnoStatus.finalizado;
      this.turnoFinalizadoEvent.emit(true);
    }else{
      this.mostrarFormCalificacion = false;
      this.mostrarFormCancelacion = false;
      this.mostrarFormRechazo = false;
      this.mostrarFormFinalizar = false;
    }

    this.guardarTurnoDb();
  }

  guardarTurnoDb(){
    this.loading = true;
    this.turnoService.modificarTurno(this.turno).then((res)=>{
      this._snackBar.open('Datos actualizados!', 'Ok', {
        duration: 8000,
        panelClass: ['custom-snackbar']
      });
      this.mostrarFormCalificacion = false;
      this.mostrarFormCancelacion = false;
      this.mostrarFormRechazo = false;
      this.mostrarFormFinalizar = false;
      this.loading = false;
    }).catch((error)=>{
      console.log(error);
      this.loading = false;
    });
  }

  cancelarTurno(){
    this.mostrarFormCalificacion = false;
    this.mostrarFormRechazo = false;
    this.mostrarFormFinalizar = false;
    this.mostrarFormCancelacion = true;
  }

  rechazarTurno(){
    this.mostrarFormCalificacion = false;
    this.mostrarFormCancelacion = false;
    this.mostrarFormFinalizar = false;
    this.mostrarFormRechazo = true;
  }

  calificarTurno(){
    this.mostrarFormCalificacion = true;
    this.mostrarFormCancelacion = false;
    this.mostrarFormFinalizar = false;
    this.mostrarFormRechazo = false;
  }

  aceptarTurno(){
    this.mostrarFormCalificacion = false;
    this.mostrarFormCancelacion = false;
    this.mostrarFormFinalizar = false;
    this.mostrarFormRechazo = false;
    this.turno.estado = TurnoStatus.aceptado;
    this.guardarTurnoDb();
  }

  finalizarTurno(){
    this.mostrarFormCalificacion = false;
    this.mostrarFormCancelacion = false;
    this.mostrarFormFinalizar = true;
    this.mostrarFormRechazo = false;
  }

  verResenia(){
    if(this.turno.comentarioCalificacion){
      const dialogRef = this.dialog.open(ReseniaDialogComponent, {
        width: '600px',
        data: { titulo: 'Reseña del Turno', mensaje: this.turno.comentarioCalificacion}
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.turno.currentValue != changes.turno.previousValue){
      this.mostrarFormCalificacion = false;
      this.mostrarFormCancelacion = false;
      this.mostrarFormFinalizar = false;
      this.mostrarFormRechazo = false;
      this.historiaElegida = null;
    }

    this.comentarioCancelacion = '';
    this.comentarioCalificacion = '';
    this.comentarioFinalizar = '';
    this.comentarioRechazo = '';

    if(this.turno){
      if(this.turno.comentarioCalificacion){
        this.comentarioCalificacion = this.turno.comentarioCalificacion;
      }
      if(this.turno.comentarioCalificacion){
        this.comentarioCancelacion = this.turno.comentarioCancelacion;
      }
      if(this.turno.comentarioFinalizar){
        this.comentarioFinalizar = this.turno.comentarioFinalizar;
      }
      if(this.turno.comentarioRechazo){
        this.comentarioRechazo = this.turno.comentarioRechazo;
      }
    }
  }

  verHistoria(){
    if(this.turno.historia){
      this.historiaElegida = JSON.parse(this.turno.historia);
    }
  }
}
