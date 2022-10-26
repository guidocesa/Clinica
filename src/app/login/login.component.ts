import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { refresh } from '../app.component';
import { FirestorageService } from '../servicios/firestorage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() newLoginEvent = new EventEmitter<any>();

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private fs: FirestorageService
  ) {}

	ngOnInit() {
	}


  async login(email: any, pass: any)
  {
    let user : any;
    let profesionalHabilitado = false;
    await this.fireAuth.signInWithEmailAndPassword(email, pass).
    catch(function(error)
    {

    }).then( x => user = x?.user)
    if(user)
    {
      if(user.emailVerified)
      {
        //mandarlo a algun lado util
        var encontrado = false;

        var userActualCollection = await this.fs.getUserSegunEmail(user.email, 'profesionales');
        await userActualCollection.forEach( (x :any)  =>  {
          console.log(x);
          if(x.length > 0){
            profesionalHabilitado = x[0].verificada;
            console.log(x[0].verificada);
            if(x[0].verificada){
              localStorage.setItem('tipo','profesional');
              localStorage.setItem('user', user.email);
              this.router.navigateByUrl("/bienvenido");
            }
            else{
              this.router.navigateByUrl("/usuarionoverificado");
            }
          }
        });
        if(!encontrado)
        {
          userActualCollection = await this.fs.getUserSegunEmail(user.email, 'pacientes');
          userActualCollection.forEach( (x) => {
            if(x.length > 0){
              localStorage.setItem('tipo','paciente');
              localStorage.setItem('user', user.email);
              encontrado = true;
            }
          });
        }
        if(!encontrado)
        {
          userActualCollection = await this.fs.getUserSegunEmail(user.email, 'administradores');
          userActualCollection.forEach( (x) => {
            if(x.length > 0){
              localStorage.setItem('tipo','admin');
              localStorage.setItem('user', user.email);
              encontrado = true;
            }
          });
        }
        if(encontrado)
        {
          await this.router.navigateByUrl("/bienvenido");
          refresh();
        }
      }
      else
      {
        this.fireAuth.signOut();
        this.router.navigateByUrl("/usuarionoverificado");
      }
    }
    else{
      alert("Mal credenciales");
    }
  }

}