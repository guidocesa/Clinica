export interface HistoriaClinica extends Record<string,any>{
    id?: string;
    turno_id: string;
    paciente_id: string;
    paciente: string;
    especialista_id: string;
    especialista: string;
    especialidad:string;
    fecha: Date;
    altura: string;
    peso: string;
    temperatura: string;
    presion: string;
  }
  