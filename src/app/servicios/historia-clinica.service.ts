import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HistoriaClinica } from './historia-clinica';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  private historiaCollection: AngularFirestoreCollection<HistoriaClinica>;
  
  constructor(private firestore: AngularFirestore ) {
    this.historiaCollection = this.firestore.collection<HistoriaClinica>('historiaclinica');
  }
  
  agregarHistoria(historia: HistoriaClinica) {
    return this.historiaCollection.add({...historia});
  }

  getHistorias(){ 
    return this.historiaCollection.valueChanges({idField: 'id'});
  }

  getHistoriasUsuario(usuario: Usuario){
    let path = `${usuario.perfil}_id`;
    return this.firestore.collection<HistoriaClinica>('historiaclinica', ref => ref.where(path, '==', usuario.uid)).valueChanges({idField: 'id'});
  }

  getHistoriasUsuario2(usuario: Usuario){
    let path = `${usuario.perfil}_id`;
    return this.firestore.collection<any>('historiaclinica', ref => ref.where(path, '==', usuario.uid)).snapshotChanges();
  }

  getHistoriaTurno(turnoId: string){
    return this.firestore.collection<any>('historiaclinica', ref => ref.where('turno_id', '==', turnoId)).valueChanges();
  }

  getHistoriaById(id: string){
    return this.firestore.collection<HistoriaClinica>('historiaclinica').doc(id).ref.get();
  }

  // getHistoriasPaciente(uid: string){
  //   return this.firestore.collection<HistoriaClinica>('historiaclinica', ref => ref.where('paciente_id', '==', uid)).valueChanges({idField: 'id'});
  // }

  // getHistoriasEspecialista(uid: string){
  //   return this.firestore.collection<HistoriaClinica>('historiaclinica', ref => ref.where('especialista_id', '==', uid)).valueChanges({idField: 'id'});
  // }

  getHistoriasPacienteEspecialista(pid: string, eid: string){
    return this.firestore.collection<HistoriaClinica>('historiaclinica', ref => ref
      .where('paciente_id', '==', pid)
      .where('especialista_id', '==', eid)
    ).valueChanges({idField: 'id'});
  }

  getHistoriasOrderByDate(){ 
    return this.firestore.collection<HistoriaClinica>('historiaclinica', ref => ref.orderBy('fecha',  'asc')).valueChanges({idField: 'id'});
  }
}
