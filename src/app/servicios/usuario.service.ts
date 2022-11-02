import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  public usuario!: Usuario;
  //private usuarios: Observable<Usuario[]>;

  constructor(private firestore: AngularFirestore) { 
    this.usuariosCollection = this.firestore.collection<Usuario>('usuarios');
    //this.usuarios = this.usuariosCollection.valueChanges();
  }
  
  public agregarUsuario(usuario: Usuario): Promise<void> {
    return this.usuariosCollection.doc(usuario.uid).set({...usuario});
  }

  public getUsuarios(){
    return this.usuariosCollection.valueChanges() /* as Observable<Usuario[]> */;
  }

  getUsuario(usuario: Usuario) {
    return this.firestore.collection('usuarios', ref => ref.where('uid', '==', usuario.uid)).snapshotChanges();
  }

  getUsuariosPorPerfil(perfil: string) {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('perfil', '==', perfil)).snapshotChanges();
  }

  getUsuariosPorPerfilVC(perfil: string) {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('perfil', '==', perfil)).valueChanges();
  }

  modificarUsuario(usuario: Usuario) {
    let usuarioDb = this.firestore.collection('usuarios').doc(usuario.uid);
    return usuarioDb.update({
      verificado: usuario.verificado
    });
  }

  editarUsuario(usuario: Usuario) {
    let usuarioDb = this.firestore.collection('usuarios').doc(usuario.uid);
    return usuarioDb.set({...usuario});
  }
}
