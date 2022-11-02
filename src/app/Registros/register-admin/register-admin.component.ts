import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/servicios/usuario';
import { Admin } from '../../servicios/admin';
import { FirestorageService } from '../../servicios/firestorage.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {

  public forma!: FormGroup;
  foto = '';

  public constructor(private fb: FormBuilder, private fs: FirestorageService, private as : AuthService) {}

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
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'password2': ['', Validators.required],
      'foto': ['', Validators.required]
    });

  }

  public aceptar(): void {
    let admin:Usuario = {
      nombre: '',
      apellido: '',
      edad: 0,
      dni: 0,
      mail: '',
      password: '',
      imagen1Url: '',
      id: '',
      obraSocial: '',
      especialidades: [],
      especialidad: '',
      imagen1: '',
      imagen2: '',
      imagen2Url: '',
      uid: '',
      rol: '',
      perfil: '',
      verificado: false,
      createdAt: ''
    };
    admin.nombre =  this.forma.get('nombre')?.value;
    admin.apellido =  this.forma.get('apellido')?.value;
    admin.edad =  this.forma.get('edad')?.value;
    admin.dni =  this.forma.get('dni')?.value;
    admin.imagen1Url = this.foto;
    admin.mail =  this.forma.get('email')?.value;
    admin.password =  this.forma.get('password')?.value;
    //aca hay que subir la foto
    console.log(admin);
    this.as.registrar(admin);
    
    this.forma.reset('');
  }

  async cambioArchivo(event : any) {
    if (event.target.files.length > 0) {        
      let nombreArchivo = event.target.files[0].name;    
      let tarea = await this.fs.tareaCloudStorage(nombreArchivo,event.target.files[0]);    
      let referencia = this.fs.referenciaCloudStorage(nombreArchivo);
      console.log(tarea);
      referencia.getDownloadURL().subscribe( x => 
        this.foto = x
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
