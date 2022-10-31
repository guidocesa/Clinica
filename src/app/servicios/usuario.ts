export class Usuario {
    id: string = "";
    nombre: string = "";
    apellido: string = "";
    edad: number = 0;
    dni: number = 0;
    mail: string = "";
    password: string = "";
    obraSocial: string = "";
    especialidades: any[] = [];
    especialidad: string = "";
    imagen1: string = "";
    imagen1Url: string = "";
    imagen2: string = "";
    imagen2Url: string = "";
    uid: string = '';
    rol: string = '';
    
    perfil: string = "";
    verificado: boolean = false;
    createdAt:string = "";

    constructor() {
        this.createdAt = Date();
    }
}