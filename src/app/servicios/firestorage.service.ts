import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { IdTokenResult, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {


  constructor(private afs:AngularFirestore, private afa: AngularFireAuth, private storage: AngularFireStorage){
  }


  getlistado(db:string)
  {
    var userCollection = this.afs.collection(db);
    return userCollection.valueChanges();
  }

  getUserSegunEmail(email:string, db:string)
  {
    console.log(email);
    var user:any;
    return this.afs.collection(db, ref => ref.where('email', '==', email)).valueChanges();
  }

  addUser(user:any, db:string)
  {
    var userCollection = this.afs.collection(db);
    var userNuevo = this.afa.createUserWithEmailAndPassword(user.email, user.password).then( (result) => {
      this.afa.currentUser.then( (u: any) => u.sendEmailVerification());
      return result
    })
    console.log(userNuevo);
    userCollection.add(user);
  }

  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    
    return this.storage.upload(nombreArchivo, datos);

  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  
}
