import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestorageService } from  '../servicios/firestorage.service'

@Component({
  selector: 'app-register-especialista',
  templateUrl: './register-especialista.component.html',
  styleUrls: ['./register-especialista.component.scss']
})
export class RegisterEspecialistaComponent implements OnInit {

  public forma!: FormGroup;

  public constructor(private fb: FormBuilder, private fs: FirestorageService) {}

  ngOnInit(): void {

    /*■ Nombre
■ Apellido
■ Edad
■ DNI
■ Especialidad
● En este caso se le deberá dar la posibilidad de elegir o agregar alguna
que no se encuentre entre las posibilidades

■ Mail
■ Password
■ Imagen de perfil*/

    this.forma = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator]],
      'apellido': ['', Validators.required],
      'especialidad': ['', Validators.required],
      'especialidadNueva': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', Validators.required, Validators.min(1000000), Validators.max(100000000)],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'password2': ['', Validators.required],
      'foto1': ['', Validators.required]
    });

  }

  public aceptar(): void {
    console.log(this.forma.getRawValue());
    this.fs.addUser(this.forma.getRawValue(), "profesionales");
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
