import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turno } from './turno';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})

export class TurnosService {
  private turnosCollection: AngularFirestoreCollection<Turno>;

  constructor(private firestore: AngularFirestore) { 
    this.turnosCollection = this.firestore.collection<Turno>('turnos');
  }
  
  public agregarTurno(turno: Turno){
    return this.turnosCollection.add({...turno});
  }

  public getTurnos(usuario: Usuario): Observable<DocumentChangeAction<any>[]>{
    if(usuario){
      switch (usuario.perfil) {
        case 'paciente':
          return this.firestore.collection<any>('turnos', ref => ref.where('pacienteId', '==', usuario.uid)).snapshotChanges();
          break;
        case 'especialista':
          return this.firestore.collection<any>('turnos', ref => ref.where('especialistaId', '==', usuario.uid)).snapshotChanges();
          break;
        case 'admin':
          return this.getAllTurnos2();
          break;
      }
    }
    return this.firestore.collection<Turno>('turnos').snapshotChanges();
  }

  public getTurnos2(usuario: Usuario){
    if(usuario){
      switch (usuario.perfil) {
        case 'paciente':
          return this.firestore.collection('turnos', ref => ref.where('pacienteId', '==', usuario.uid)).valueChanges();
          break;
        case 'especialista':
          return this.firestore.collection('turnos', ref => ref.where('especialistaId', '==', usuario.uid)).valueChanges();
          break;
        case 'admin':
          return this.getAllTurnos();
          break;
      }
    }
    return this.turnosCollection.valueChanges() /* as Observable<Turno[]> */;
  }

  public getTurnosArray(usuario: Usuario, turnos: Turno[]){
    if(usuario){
      if(usuario.perfil == 'admin'){
        this.firestore.collection<Turno>('turnos').snapshotChanges()
          .pipe(map((docChangeActions)=>{
            docChangeActions.map((docChangeAction)=>{
              turnos.push(docChangeAction.payload.doc.data() as Turno);
            })
          })
        );
      }else{
        let atributo = '';
        if(usuario.perfil == 'paciente'){
          atributo = 'pacienteId';
        }else{
          atributo = 'especialistaId';
        }
        
        this.firestore.collection<Turno>('turnos', ref => ref.where(atributo, '==', usuario.uid)).snapshotChanges()
          .pipe(map((docChangeActions)=>{
            docChangeActions.map((docChangeAction)=>{
              turnos.push(docChangeAction.payload.doc.data() as Turno);
            })
          })
        );
      }
    }
  }

  public getTurnosEspecialista(usuario: Usuario){
    return this.firestore.collection<Turno>('turnos', ref => ref.where('especialistaId', '==', usuario.uid)).snapshotChanges();
  }

  public getAllTurnos(){
    return this.firestore.collection<Turno>('turnos').valueChanges({idField: 'id'}) /* as Observable<Turno[]> */;
  }

  public getAllTurnosAnyVc(){
    return this.firestore.collection('turnos').valueChanges({idField: 'id'}) /* as Observable<Turno[]> */;
  }

  public getAllTurnos2(){
    return this.firestore.collection<any>('turnos').snapshotChanges();
  }

  public getTurnosEspecialidadEspecialistaDia(especialidad: string, especialistaId: string, dia: string){
    return this.firestore.collection<any>('turnos', ref => ref
      .where('especialistaId', '==', especialistaId)
      .where('especialidad','==',especialidad)
      .where('fechaHora', '<', new Date(dia+' 23:59:59'))
      .where('fechaHora', '>', new Date(dia+' 00:00:00'))
    ).valueChanges(/* {idField: 'id'} */);
  }

  public getTurnosBetweenDates(desde: Date, hasta: Date){
    return this.firestore.collection<any>('turnos', ref => ref
      //.where('estado', '==', 'Finalizado')
      .where('fechaHora', '<', hasta)
      .where('fechaHora', '>', desde)
    ).valueChanges();
  }

  /* getTurnoByPaciente(usuario: Usuario) {
    return this.firestore.collection('turnos', ref => ref.where('pacienteId', '==', usuario.uid)).snapshotChanges();
  }

  getTurnoByEspecialista(usuario: Usuario) {
    return this.firestore.collection('turnos', ref => ref.where('especialistaId', '==', usuario.uid)).snapshotChanges();
  } */

  modificarTurno(turno: Turno) {
    let turnoDb = this.firestore.collection<Turno>('turnos').doc(turno.id);
    return turnoDb.set({...turno});
  }

}
