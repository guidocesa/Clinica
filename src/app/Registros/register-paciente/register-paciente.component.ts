import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/servicios/usuario';
import { FirestorageService } from '../../servicios/firestorage.service';
import { Paciente } from '../../servicios/paciente';

@Component({
  selector: 'app-register-paciente',
  templateUrl: './register-paciente.component.html',
  styleUrls: ['./register-paciente.component.scss']
})
export class RegisterPacienteComponent implements OnInit {


  public forma!: FormGroup;
  foto:string[] = [];
  foto2 = '';

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
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(100000000)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'password2': ['', Validators.required],
      'foto1': ['', Validators.required],
      'foto2': ['', Validators.required]
    });

  }

  public aceptar(): void {
    var pac = new Usuario();
    var aux = this.forma.getRawValue();
    console.log(this.forma.getRawValue());

    pac.apellido = aux.apellido;
    pac.nombre = aux.nombre;
    pac.edad = aux.edad;
    pac.dni = aux.dni;
    pac.obraSocial = aux.obraSocial;
    pac.mail = aux.email;
    pac.password = aux.password;
    pac.imagen1Url = this.foto[0];
    pac.imagen2Url = this.foto[1];
    pac.perfil = 'paciente';
    this.fs.addUser(pac, "pacientes");

    this.forma.reset();

  }

  async cambioArchivo(event : any, i:number) {
    if (event.target.files.length > 0) {        
      let nombreArchivo = event.target.files[0].name;    
      let tarea = await this.fs.tareaCloudStorage(nombreArchivo,event.target.files[0]);    
      let referencia = this.fs.referenciaCloudStorage(nombreArchivo);
      console.log(tarea);
      referencia.getDownloadURL().subscribe( x => 
        this.foto[i] = x
      )
    }
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
