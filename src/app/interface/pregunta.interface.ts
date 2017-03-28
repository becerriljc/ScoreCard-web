export interface Preguntas {
    pregunta : string
    tipo : number
    opciones? : Conjunto[]
}

export interface Conjunto {
    valor : string
}