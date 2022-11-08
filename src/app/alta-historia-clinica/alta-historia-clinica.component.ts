import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistoriaClinica } from '../servicios/historia-clinica';
import { HistoriaClinicaService } from '../servicios/historia-clinica.service';
import { Turno } from '../servicios/turno';
import { TurnosService } from '../servicios/turnos.service';

@Component({
  selector: 'app-alta-historia-clinica',
  templateUrl: './alta-historia-clinica.component.html',
  styleUrls: ['./alta-historia-clinica.component.scss']
})
export class AltaHistoriaClinicaComponent implements OnInit {

  @Output() cerrarHistoriaEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() turno!: Turno;
  form: FormGroup;
  datosDinamicos: number = 0;
  datosDinamicosSprint5: number = 0;
  loading: boolean = false;

  constructor(
    private historiaClinicaService: HistoriaClinicaService,
    formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private turnosService: TurnosService
  ) { 
    this.form = formBuilder.group({
      altura: ["", [Validators.required]],
      peso: ["", [Validators.required]],
      temperatura: ["", [Validators.required]],
      presion: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  agregarDatoDinamico(){
    if(this.datosDinamicos<3){
      this.datosDinamicos++;
      
      this.form.addControl(`dato${this.datosDinamicos}Key`, new FormControl('', Validators.required));
      this.form.addControl(`dato${this.datosDinamicos}Value`, new FormControl('', Validators.required));
    }
  }

  agregarDatoDinamicoSprint5(){
    if(this.datosDinamicosSprint5<3){
      this.datosDinamicosSprint5++;
      switch (this.datosDinamicosSprint5) {
        case 1:
          this.form.addControl('dato4Key', new FormControl('', Validators.required));
          this.form.addControl('dato4Value', new FormControl('', Validators.required));
          break;
        case 2:
          this.form.addControl('dato5Key', new FormControl('', Validators.required));
          this.form.addControl('dato5Value', new FormControl('', Validators.required));
          break;
        case 3:
          this.form.addControl('dato6Key', new FormControl('', Validators.required));
          this.form.addControl('dato6Value', new FormControl(''));
          break;
      }
    }
  }

  submitForm(){
    this.loading = true;
    this.validateAllFormFields(this.form);
    if(this.form.valid){
      let historia: HistoriaClinica = {
        turno_id: this.turno.id,
        paciente_id: this.turno.pacienteId,
        paciente: this.turno.paciente,
        especialista_id: this.turno.especialistaId,
        especialista: this.turno.especialista,
        especialidad:this.turno.especialidad,
        fecha: this.turno.fechaHora,
        altura: this.form.value.altura,
        peso: this.form.value.peso,
        temperatura:  this.form.value.temperatura,
        presion: this.form.value.presion
      }
      
      for (let index = 1; index < (this.datosDinamicos+1); index++) {
        //historia['dato'+index.toString()+'Key'] = 
        historia[this.form.controls[`dato${index}Key`].value] = this.form.controls[`dato${index}Value`].value;
      }
      
      for (let index = 4; index < (this.datosDinamicosSprint5+4); index++) {
        historia[this.form.controls[`dato${index}Key`].value] = this.form.controls[`dato${index}Value`].value;
      }
     
      this.historiaClinicaService.agregarHistoria(historia).then((docRef)=>{
        this.turno.historiaId = docRef.id;
        this.turno.historia = JSON.stringify(historia);
        this.turnosService.modificarTurno(this.turno).then((res)=>{
          this.loading = false;
          this._snackBar.open('Datos actualizados!', 'Ok', {
            duration: 8000,
            panelClass: ['custom-snackbar']
          });
          this.cerrarHistoriaEvent.emit(true);
        }).catch(error=>console.log(error));
      }).catch((error)=>{
        console.log(error);
        this.loading = false;
        this._snackBar.open('No se pudo guardar el dato', 'Ok', {
          duration: 8000,
          panelClass: ['custom-snackbar-error']
        });
        this.cerrarHistoriaEvent.emit(true);
      });
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
  
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } 
      else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
