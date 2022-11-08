import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuario: Usuario|null;
  estaLogueado: boolean = false;
  public currentUserEmail:any = '';

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private usuarioService: UsuarioService
    ) { 
      this.usuario = null;
  }

  public login(usuario: Usuario){
    return new Promise<void>((resolve, reject)=>{
      this.afAuth.signInWithEmailAndPassword(usuario.mail, usuario.password).then((cred)=>{
        if(false  /*!cred.user?.emailVerified*/){
          this.router.navigate(['/usuarionoverificado']);
        }else{
          this.currentUserEmail = usuario.mail;
          this.afStore.collection('usuarios').doc<Usuario>(cred.user!.uid).ref.get().then(doc=>{
            this.usuario = doc.data()!;
            this.estaLogueado = true;
            resolve();
          }).catch(error => {
            reject(error);
          })
        }        
      }).catch(error => {
        reject(error);
      });
    });
  }

  public registrar(usuario: Usuario): Promise<void>{
    return new Promise((resolve, reject)=>{
      this.afAuth.createUserWithEmailAndPassword(usuario.mail, usuario.password).then((cred) => {
        //Envio email de verificacion
        cred.user?.sendEmailVerification();

        usuario.uid = cred.user?.uid!;
        
        this.usuarioService.agregarUsuario(usuario).then(()=>{
          resolve();
        }).catch(error => {
          reject(this.errorMessagesCoverter(error));
        });
      }).catch(error => {
        reject(this.errorMessagesCoverter(error));
      })
    })
  }
  
  logout(): void
  {
    this.afAuth.signOut().then((res)=>{
      this.router.navigate(['login']);
    }).catch((error)=>{
      console.log(error);
    }) ;
    this.usuario = null;
  }

  logoutAndStay(): void
  {
    this.afAuth.signOut();
  }

  errorMessagesCoverter(error: any):string {
    let mensaje = '';
    if(error.message.includes('auth/email-already-in-use')){
      mensaje ='La cuenta de correo ya se encuentra en uso';
    }else if(error.message.includes('auth/weak-password')){
      mensaje ='La contraseña debe tener por lo menos 6 caracteres';
    }else if(error.message.includes('auth/invalid-email')){
      mensaje ='El email ingresado es incorrecto';
    }else{
      mensaje = error.message;
    }
    return mensaje;
  }
  
  authState(){
    return this.afAuth.authState;
  }

}