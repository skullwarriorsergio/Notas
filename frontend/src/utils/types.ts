export type Estudiante = {
    id: string
    nombre: string
}

export type Profesor = {
    id: string
    nombre: string
}

export type Nota = {
    id: string
    nombre: string
    valor: number
    profesor: string
    estudiante: string
}