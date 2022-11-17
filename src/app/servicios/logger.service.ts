import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private firestore: AngularFirestore) { }

  logLogin(user: Usuario){
    //this.afStore.collection('logins')
    this.firestore.collection('loglogins').add({
      uid: user.uid,
      usuario: user.nombre+' '+user.apellido,
      perfil: user.perfil,
      datetime: new Date()
    }).then(()=>{
      //console.log('log completado');
    }).catch(error=>{
      console.log('error en el log');
    })
  }


  getLogins(){ 
    return this.firestore.collection('loglogins').valueChanges({idField: 'id'});
  }
}
