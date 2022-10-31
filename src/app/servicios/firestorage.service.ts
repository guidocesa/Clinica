import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { IdTokenResult, User } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {


  constructor(private afs:AngularFirestore, private afa: AngularFireAuth, private storage: AngularFireStorage, private usuariosService: UsuarioService){
  }


  getlistado(db:string)
  {
    var userCollection = this.afs.collection(db);
    return userCollection.valueChanges();
  }

  getUserSegunEmail(email:string, db:string) : Observable<Usuario[]>
  {
    console.log(email);
    var user:any;
    return this.afs.collection<Usuario>(db, ref => ref.where('email', '==', email)).valueChanges();
  }

  async addUser(user:Usuario, db:string)
  {
    var userCollection = this.afs.collection('usuarios');
    await userCollection.add(user);
    var userNuevo = this.afa.createUserWithEmailAndPassword(user.mail, user.password).then( (result) => {
      user.uid = result.user?.uid!;
      this.usuariosService.agregarUsuario(user);

      this.afa.currentUser.then( (u: any) => u.sendEmailVerification());
      return result
    })
    console.log(userNuevo);
  }

  verificarProfesional(email:string)
  {
    let doc = this.afs.collection('profesionales', ref => ref.where('email', '==', email));
    doc.snapshotChanges().pipe(
      map(actions => actions.map(a => {                                                      
        const data:any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return id;
      }))).subscribe((id: any) => {
        this.afs.doc(`profesionales/${id[0]}`).update({verificada: true});
      })
  }

  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    
    return this.storage.upload(nombreArchivo, datos);

  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  getEspecialidades() {
    return this.afs.collection('especialidades').snapshotChanges();
  }

  
}
