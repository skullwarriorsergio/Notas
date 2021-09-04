import type { NextPage } from 'next'
import React, { useEffect, useState } from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SnackBar from '../src/snackbar'
import MainLayout from '../src/layouts/main'
import Estudiantes from '../src/components/Estudiantes'
import { Estudiante, Nota, Profesor } from "../src/utils/types";
import { getEstudiantes, getNotas, getProfesores } from '../src/utils/apiHelper'
import Profesores from '../src/components/Profesores'
import Notas from '../src/components/Notas'
import { Container } from '@material-ui/core'
import { ERROR, SUCCESS } from '../src/snackbar/types'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: "2rem",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

const Home: NextPage = () => {
  const classes = useStyles();
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  const [profesores, setProfesores] = useState<Profesor[]>([])
  const [notas, setNotas] = useState<Nota[]>([])
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: 'Unknow error',
    severity: ERROR,
  })

  useEffect(() => {
    getEstudiantes()
        .then((res) =>
        {
            const data = res?.data.map((item:any) => ({estudianteID:item.estudianteID, nombre: item.nombre}))
            setEstudiantes(data)
        })
        .catch((err) => console.log(err))
    getProfesores()
        .then((res) =>
        {
            const data = res?.data.map((item:any) => ({profesorID:item.profesorID, nombre: item.nombre}))
            setProfesores(data)
        })
        .catch((err) => console.log(err))
    getNotas()
        .then((res) =>
        {
            const data = res?.data.map((item:any) => ({
              notaID: item.notaID,
              nombre: item.nombre,
              valor: item.valor,
              estudiante: item.estudiante,
              profesor: item.profesor
            }))
            setNotas(data)            
        })
        .catch((err) => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const OnEstudiantesDeleted = (id : number) =>
  {
    setEstudiantes(estudiantes.filter((item) => item.estudianteID != id))
    setSnackBar({
      open: true,
      message: "El estudiante ha sido eliminado correctamente",
      severity: SUCCESS,
    })
  }

  const OnProfesoresDeleted = (id : number) =>
  {
    setProfesores(profesores.filter((item) => item.profesorID != id))    
    setSnackBar({
      open: true,
      message: "El profesor ha sido eliminado correctamente",
      severity: SUCCESS,
    })
  }

  const OnNotasDeleted = (id : number) =>
  {
    setNotas(notas.filter((item) => item.notaID != id))
    setSnackBar({
      open: true,
      message: "La nota ha sido eliminada correctamente",
      severity: SUCCESS,
    })
  }

  return (
    <MainLayout>
      <Container className={classes.root}>
        <Container className={classes.root}>
          <Estudiantes data={estudiantes} onDelete={OnEstudiantesDeleted}/>
          <Profesores data={profesores} onDelete={OnProfesoresDeleted}/>
          <Notas data={notas} onDelete={OnNotasDeleted}/>
        </Container>
        <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
      </Container>
    </MainLayout>
  )
}

export default Home
