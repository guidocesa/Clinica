import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { refresh } from '../app.component';
import { AuthService } from '../servicios/auth.service';
import { FirestorageService } from '../servicios/firestorage.service';
import { Usuario } from '../servicios/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() newLoginEvent = new EventEmitter<any>();

  seleccion  = '';
  loading = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private fs: FirestorageService,
    private as: AuthService
  ) {}

	ngOnInit() {
	}

  cambioSeleccion(sleccion:any)
  {
    this.seleccion = sleccion;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  completarCampos(user:any)
  {
    (<HTMLInputElement> document.getElementById('email')).value = user.mail;
    (<HTMLInputElement> document.getElementById('password')).value = user.password;
  }


  async login(email: any, pass: any)
  {
    this.loading = true;
    let user : Usuario = new Usuario();
    let profesionalHabilitado = false;

    user.mail = email;
    user.password = pass;

    await this.as.login(user);

    console.log(this.as.usuario);
    switch(this.as.usuario?.perfil){
      case 'paciente':
        localStorage.setItem('tipo','paciente');
        localStorage.setItem('user', user.mail);
        this.router.navigateByUrl("/bienvenido");
        break;
      case 'especialista':
        if(this.as.usuario.verificado)
        {
          localStorage.setItem('tipo','profesional');
          localStorage.setItem('user', user.mail);
          this.router.navigateByUrl("/bienvenido");
        }
        else
        {
          this.router.navigateByUrl("/usuarionoverificado");
        }
        break;
      case 'administrador':
        localStorage.setItem('tipo','admin');
        localStorage.setItem('user', user.mail);
        this.router.navigateByUrl("/bienvenido");
        break;
      default:
        this.router.navigateByUrl("/usuarionoverificado");
        break;
    }
    // await this.fireAuth.signInWithEmailAndPassword(email, pass).
    // catch(function(error)
    // {

    // }).then( x => user = x?.user)
    // if(user)
    // {
    //   if(user.emailVerified)
    //   {
    //     //mandarlo a algun lado util
    //     var encontrado = false;

    //     var userActualCollection = await this.fs.getUserSegunEmail(user.email, 'profesionales');
    //     userActualCollection.forEach( (x :any)  =>  {
    //       console.log(x);
    //       if(x.length > 0){
    //         profesionalHabilitado = x[0].verificada;
    //         console.log(x[0].verificada);
    //         if(x[0].verificada){
    //           localStorage.setItem('tipo','profesional');
    //           localStorage.setItem('user', user.email);
    //           refresh();
    //         }
    //         else{
    //           this.router.navigateByUrl("/usuarionoverificado");
    //         }
    //       }
    //     });
    //     if(!encontrado)
    //     {
    //       userActualCollection = await this.fs.getUserSegunEmail(user.email, 'pacientes');
    //       userActualCollection.forEach( (x) => {
    //         if(x.length > 0){
    //           localStorage.setItem('tipo','paciente');
    //           localStorage.setItem('user', user.email);
    //           encontrado = true;
    //           refresh();
    //         }
    //       });
    //     }
    //     if(!encontrado)
    //     {
    //       userActualCollection = await this.fs.getUserSegunEmail(user.email, 'administradores');
    //       userActualCollection.forEach( (x) => {
    //         if(x.length > 0){
    //           localStorage.setItem('tipo','admin');
    //           localStorage.setItem('user', user.email);
    //           encontrado = true;
    //           refresh();
    //         }
    //       });
    //     }
    //     if(encontrado)
    //     {
    //       await this.router.navigateByUrl("/bienvenido");
    //       refresh();
    //     }
    //   }
    //   else
    //   {
    //     this.fireAuth.signOut();
    //     this.router.navigateByUrl("/usuarionoverificado");
    //   }
    // }
    // else{
    //   alert("Mal credenciales");
    //   this.loading = false;
    // }
  }

}