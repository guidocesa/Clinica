export class Turno {
    public id: string = '';
    public estado: string = '';
    public paciente: string = '';
    public especialidad: string = '';
    public especialista: string = '';
    public fechaHora!: Date;
    public endTime!: Date;
    
    //public timeStamp!: number;
    //Fecha y horas desglosadas
    //public fecha: string = '';
    //public startTime: string = '';
    
    public canceladoPor: string = '';
    public comentarioCancelacion = '';
    public comentarioCalificacion = '';
    public comentarioRechazo = '';
    public comentarioFinalizar = '';

    public resenia: string = '';
    public calificacion: string = '';
    //public realizado: boolean = false;
    //public cancelado: boolean = false;
    public pacienteId: string = '';
    public especialistaId: string = '';
    public historiaId: string = '';
    public createdAt: string = '';
    public historia: string = '';

    constructor() {
        this.createdAt = Date();
    }
}
