export type Estudiante = {
    estudianteID: number
    nombre: string
}

export type Profesor = {
    profesorID: number
    nombre: string
}

export type ListItemData = {
    id: number
    nombre: string
}

export type Nota = {
    notaID: number
    nombre: string
    valor: number
    profesor:string
    estudiante:string
}