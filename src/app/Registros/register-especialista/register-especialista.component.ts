import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/servicios/usuario';
import { FirestorageService } from  '../../servicios/firestorage.service';


@Component({
  selector: 'app-register-especialista',
  templateUrl: './register-especialista.component.html',
  styleUrls: ['./register-especialista.component.scss']
})
export class RegisterEspecialistaComponent implements OnInit {

  public forma!: FormGroup;
  foto = '';
  listaEspecialidades: string[];

  public constructor(private fb: FormBuilder, private fs: FirestorageService, private as : AuthService) {
    this.listaEspecialidades = this.fs.listaEspecialidades;
    console.log(this.listaEspecialidades);
  }

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
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'password2': ['', Validators.required],
      'foto': ['', Validators.required],
      'captcha': ['', Validators.required]
    });

  }

  public aceptar(): void {
    let pro= new Usuario();

    let especilidadSeleccionada = this.forma.get('especialidad')?.value;

    if(!this.listaEspecialidades.includes(especilidadSeleccionada)){
      this.fs.agregarEspecialidad(especilidadSeleccionada);
      this.listaEspecialidades.push(especilidadSeleccionada);
    }

    pro.nombre =  this.forma.get('nombre')?.value;
    pro.apellido =  this.forma.get('apellido')?.value;
    pro.edad =  this.forma.get('edad')?.value;
    pro.dni =  this.forma.get('dni')?.value;
    pro.especialidades.push({descripcion:this.forma.get('especialidad')?.value});
    pro.imagen1Url = this.foto;
    if(this.forma.get('especialidad')?.value == 'otra')
    {
      pro.especialidad = this.forma.get('especialidadNueva')?.value;
      pro.especialidades.push({descripcion: this.forma.get('especialidad')?.value});
    }
    pro.mail =  this.forma.get('email')?.value;
    pro.password =  this.forma.get('password')?.value;
    pro.perfil = 'especialista';
    //aca hay que subir la foto
    console.log(pro);
    this.as.registrar(pro);

    
    this.forma.reset();
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
