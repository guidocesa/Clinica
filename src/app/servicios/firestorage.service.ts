import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IdTokenResult, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {


  constructor(private afs:AngularFirestore, private afa: AngularFireAuth){
  }


  getlistado(db:string)
  {
    var userCollection = this.afs.collection(db);
    return userCollection.valueChanges();
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
}
