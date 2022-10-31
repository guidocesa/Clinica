import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Turno } from '../servicios/turno';
import { Usuario } from '../servicios/usuario';
import { AuthService } from '../servicios/auth.service';
import { FirestorageService } from '../servicios/firestorage.service';
import { UsuarioService } from '../servicios/usuario.service';
import { TurnoStatus } from '../servicios/turno-status'; 
import { TurnosService } from '../servicios/turnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';


@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})
export class PedirTurnoComponent implements OnInit {
  @Output() cancelarEvent: EventEmitter<any> = new EventEmitter();
  listaEspecialidades: any[] = [];
  listaEspecialistas: Usuario[] = [];
  nivel: number = 0;
  especialidadElegida: any = null;
  especialistaElegido!: Usuario;
  diaElegido: Date = new Date('1981-01-01');
  //diaElegido!: Date;
  loading: boolean = false;
  listaDias: Date[] = [];
  turnos: Turno[] = [];
  turnosDelDia: Turno[] = [];
  listaHoras: Date[] = [];
  listaHorasPosibles: Date[] = [];
  paciente!: Usuario;
  duracionTurnoMinutos: number = 0;
  listaTurnosDb: Turno[] = [];
  perfil: string = '';

  constructor(
    private fs: FirestorageService,
    private usuarioervice: UsuarioService,
    private authService: AuthService,
    private turnosService: TurnosService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const especialidadesSubscription = this.fs.getEspecialidades().subscribe((especialidades: any) => {
      for (let index = 0; index < especialidades.length; index++) {
        this.listaEspecialidades.push(especialidades[index].payload.doc.data());
      }
      especialidadesSubscription.unsubscribe();
    });
    if(this.authService.usuario!.perfil == 'paciente'){
      this.paciente = this.authService.usuario!;
    }
    this.perfil = this.authService.usuario!.perfil;
  }

  recibirPaciente(paciente: Usuario){
    this.paciente = paciente;
  }

  elegirEspecialidad(especialidad: any){
    this.especialidadElegida = especialidad;
    this.listaEspecialistas = [];
    
    let usuarioSubscription = this.usuarioervice.getUsuariosPorPerfil('especialista').subscribe((usuarios: any) => {
      for (let index = 0; index < usuarios.length; index++) {
        let usuario: Usuario = usuarios[index].payload.doc.data();
        // if(usuario.especialidades.includes(especialidad.descripcion) && usuario.verificado){
        //   this.listaEspecialistas.push(usuario);
        // }
        if(usuario.verificado){
          usuario.especialidades.forEach((especialidadDoc)=>{
            if(especialidadDoc.descripcion == especialidad.descripcion){
              this.listaEspecialistas.push(usuario);
            }
          });
        }
      }
      usuarioSubscription.unsubscribe();
    });
    this.nivel = 1;
  }

  elegirEspecialista(especialista: Usuario){
    this.especialistaElegido = especialista;
    this.crearListaDias();
    this.nivel = 2;
  }

  elegirDia(dia: Date){
    this.diaElegido = dia;
    this.crearListaHoras();
    this.nivel = 3
  }

  elegirHora(hora: Date){
    if(false /*!this.paciente*/){
      // const dialogRef = this.dialog.open(DialogComponent, {
      //   width: '400px',
      //   data: {titulo: 'ERROR', mensaje: 'Debe elegir un paciente'}
      // });
    }else{
      this.loading = true;
      const turno = new Turno();
      turno.fechaHora = hora;
      turno.endTime = new Date(hora.getTime() + this.duracionTurnoMinutos * 60000);
      turno.pacienteId = this.paciente.uid;
      turno.paciente = this.paciente.nombre+' '+this.paciente.apellido;
      turno.especialistaId = this.especialistaElegido.uid;
      turno.especialista = this.especialistaElegido.nombre+' '+this.especialistaElegido.apellido;
      turno.estado = TurnoStatus.pendiente;
      turno.especialidad = this.especialidadElegida.descripcion;
  
      this.turnosService.agregarTurno(turno).then((docRef)=>{
        this.loading = false;
        this._snackBar.open('Turno Confirmado!', 'OK', {
          duration: 8000,
          panelClass: ['custom-snackbar']
        });
        this.cancelarEvent.emit();
      }).catch((error)=>{
        console.log(error)
        this.loading = false;
      });
    }
  }

  crearListaDias()
  {
    if(this.especialistaElegido){
      let diasQueTrabaja: number[] = [];
      this.especialistaElegido.especialidades.forEach((especialidad)=>{
        if(especialidad.descripcion == this.especialidadElegida.descripcion){
          for (const [key, value] of Object.entries(especialidad.dias)) {
            if(value){
              switch (key) {
                case 'Lunes':
                  diasQueTrabaja.push(1);
                  break;
                case 'Martes':
                  diasQueTrabaja.push(2);
                  break;
                case 'Miercoles':
                  diasQueTrabaja.push(3);
                  break;
                case 'Jueves':
                  diasQueTrabaja.push(4);
                  break;
                case 'Viernes':
                  diasQueTrabaja.push(5);
                  break;
              }
            }
          }
        }
      });

      let dia = new Date();
      for (let i = 0; i <= 15; i++)
      {
        if (diasQueTrabaja.includes(dia.getDay()) ){
          this.listaDias.push(new Date(dia));
        }        
        dia.setDate(dia.getDate() + 1);
      }
    }
  }

  crearListaHoras()
  {
    if(this.especialistaElegido){
      let dia: string = this.datePipe.transform(this.diaElegido, 'yyyy-MM-dd') || '1980-01-01';
      this.especialistaElegido.especialidades.forEach((especialidad)=>{
        if(especialidad.descripcion == this.especialidadElegida.descripcion){
          this.duracionTurnoMinutos = especialidad.duracionTurnoMinutos;
          let turno = new Date(
            this.diaElegido.getFullYear(),
            this.diaElegido.getMonth(),
            this.diaElegido.getDate(),
            especialidad.disponibilidadHoraria.horaEntrada
          );
          let horaSalida = new Date(
            this.diaElegido.getFullYear(),
            this.diaElegido.getMonth(),
            this.diaElegido.getDate(),
            especialidad.disponibilidadHoraria.horaSalida
          );
          //horaSalida.setTime(horaSalida.getTime() - especialidad.duracionTurnoMinutos*60000);

          let cont = 0;
          do {
            this.listaHoras.push(new Date(turno));
            turno.setTime(turno.getTime() + especialidad.duracionTurnoMinutos*60000);
            cont++;
          } while (turno < horaSalida || cont == 50);
        }
      });

      this.turnosService.getTurnosEspecialidadEspecialistaDia(this.especialidadElegida.descripcion, this.especialistaElegido.uid, dia)
        .subscribe((turnos)=>{
          this.listaHorasPosibles = [];          
          this.listaHorasPosibles = this.listaHoras.filter((hora)=>{
            let libre = true;
            turnos.forEach((turno)=>{
              if(hora.getTime() == (turno.fechaHora.seconds * 1000)){
                libre = false;
              }
            });
            return libre;
          })
        });
      // this.turnosService.getTurnosEspecialidadEspecialistaDia(this.especialidadElegida.descripcion, this.especialistaElegido.uid, dia)
      //   .subscribe((turnos)=>{
      //     this.listaHorasPosibles = [];
      //     console.log(turnos);
      //     console.log(this.listaHorasPosibles);
          
      //     this.listaHoras.forEach((hora)=>{
      //       console.log(hora);
      //       turnos.forEach((turno)=>{
      //         //console.log(turno.fechaHora.seconds * 1000);
      //         // if(hora.getTime() == turno.fechaHora.seconds * 1000){
      //         //   console.log('iguales');
      //         // }
      //         if(hora.getTime() != (turno.fechaHora.seconds * 1000)){
      //           this.listaHorasPosibles.push(hora);
      //         }
      //       });
      //     })
      //   });

        
      // this.turnosService.getTurnosEspecialidadEspecialistaDia(this.especialidadElegida.descripcion, this.especialistaElegido.uid, dia).pipe(
      //   map((actions) => {
      //     actions.map(a => {
      //       const turno = a.payload.doc.data();
      //       turno.id = a.payload.doc.id;
      //       let ts = new Timestamp(turno.fechaHora.seconds, turno.fechaHora.nanoseconds);
      //       turno.fechaHora = ts.toDate();
      //       this.listaTurnosDb.push(turno);
      //     });
      //   })
      // ).subscribe((subs)=>{
      //   this.listaHoras.forEach((hora)=>{
      //     console.log(hora);
      //     this.listaTurnosDb.forEach((turno)=>{
      //       console.log(turno);
      //     });
      //   })
      // });
    }
  }

  limpiar(){
    this.listaDias = [];
    this.listaHoras = [];
    this.listaHorasPosibles = [];
  }

  volver(){
    switch (this.nivel) {
      case 3:
        this.listaHoras = [];
        this.listaHorasPosibles = [];
        break;
      case 2:
        this.listaHoras = [];
        this.listaHorasPosibles = [];
        this.listaDias = [];
        break;
      case 1:
        this.listaHoras = [];
        this.listaDias = [];
        this.listaEspecialistas = [];
        break;
    }
    this.nivel--;
  }

  cancelar(){
    this.cancelarEvent.emit();
  }

}
