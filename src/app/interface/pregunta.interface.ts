export interface Preguntas {
    pregunta : string;
    tipo : number;
    opciones? : {
            valor : string
        }[];
}