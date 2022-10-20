import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestorageService } from '../servicios/firestorage.service';

@Component({
  selector: 'app-register-paciente',
  templateUrl: './register-paciente.component.html',
  styleUrls: ['./register-paciente.component.scss']
})
export class RegisterPacienteComponent implements OnInit {


  public forma!: FormGroup;

  public constructor(private fb: FormBuilder, private fs: FirestorageService) {}

  ngOnInit(): void {

    /*■ Nombre
■ Apellido
■ Edad
■ DNI
■ Obra Social
■ Mail
■ Password
■ 2 imágenes para su perfil.*/

    this.forma = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator]],
      'apellido': ['', Validators.required],
      'obraSocial': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', Validators.required, Validators.min(1000000), Validators.max(100000000)],
      'sexo': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'password2': ['', Validators.required],
      'foto1': ['', Validators.required],
      'foto2': ['', Validators.required]
    });

  }

  public aceptar(): void {
    console.log(this.forma.getRawValue());
    this.fs.addUser(this.forma.getRawValue(), "pacientes");

  }

  // CUSTOM VALIDATOR
  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces
      ? { containsSpaces: true }
      : null; 
  }
}
