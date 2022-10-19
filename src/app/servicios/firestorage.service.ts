import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {


  constructor(private afs:AngularFirestore){
  }


  getlistado(db:string)
  {
    var userCollection = this.afs.collection(db);
    return userCollection.valueChanges();
  }

  addUser(user:any, db:string)
  {
    var userCollection = this.afs.collection(db);
    userCollection.add(user);
  }
}
