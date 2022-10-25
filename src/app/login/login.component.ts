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
        userActualCollection.forEach( (x) => {
          if(x.length > 0){
            localStorage.setItem('tipo','profesional');
            encontrado = true;
          }
        });
        if(!encontrado)
        {
          userActualCollection = await this.fs.getUserSegunEmail(user.email, 'pacientes');
          userActualCollection.forEach( (x) => {
            if(x.length > 0){
              localStorage.setItem('tipo','paciente');
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
              encontrado = true;
            }
          });
        }
        refresh();
      }
      else
      {
        //pagina de error
        this.fireAuth.signOut();
      }
      localStorage.setItem('user', user.email);
    }
    else{
      alert("Mal credenciales");
    }
  }

}