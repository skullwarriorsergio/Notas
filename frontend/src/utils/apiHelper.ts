import axios from 'axios'
import { Estudiante, Profesor, Nota } from './types'


export const deleteEstudiante = async (id: number) => {
    await axios.delete(
        `https://${process.env.PUBLIC_URL}/api/Estudiantes/${id}`
    )
}

export const getEstudiante = async (id: number) => {
    try {
        return await axios.get(`https://${process.env.PUBLIC_URL}/api/Estudiantes/${id}`)
    } catch (err) {
        console.log(err)
    }
}

export const getEstudiantes = async () => {
    try {
        return await axios.get(`https://${process.env.PUBLIC_URL}/api/Estudiantes/`)
    } catch (err) {
        console.log(err)
    }
}