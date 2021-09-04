import axios from 'axios'
import { Estudiante, Profesor, Nota } from './types'


export const deleteEstudiante = async (id: number) => {
    
    await axios.delete(
        `http://localhost:5001/api/Estudiantes/${id}`
    )
}

export const AddEstudiante = async (nombre: string) => {
    
    await axios.post(
        `http://localhost:5001/api/Estudiantes/`, {
            nombre: nombre
          }
    )
}

export const getEstudiantes = async () => {
    try {
        return await axios.get(`http://localhost:5001/api/Estudiantes/`)
    } catch (err) {
        console.log(err)
    }
}

export const getProfesores = async () => {
    try {
        return await axios.get(`http://localhost:5001/api/Profesores/`)
    } catch (err) {
        console.log(err)
    }
}

export const deleteProfesor = async (id: number) => {
    
    await axios.delete(
        `http://localhost:5001/api/Profesores/${id}`
    )
}

export const AddProfesor = async (nombre: string) => {
    
    await axios.post(
        `http://localhost:5001/api/Profesores/`, {
            nombre: nombre
          }
    )
}


export const getNotas = async () => {
    try {
        return await axios.get(`http://localhost:5001/api/Notas/`)
    } catch (err) {
        console.log(err)
    }
}

export const deleteNota = async (id: number) => {
    
    await axios.delete(
        `http://localhost:5001/api/Notas/${id}`
    )
}

export const AddNota = async (nombre: string, valor:number, idestudiante:number|undefined, idprofesor:number| undefined) => {
    
    await axios.post(
        `http://localhost:5001/api/Notas/`, {
            nombre: nombre,
            valor: valor,
            estudianteID: idestudiante,
            profesorID: idprofesor
          }
    )
}