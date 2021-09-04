import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"
import MainLayout from '../src/layouts/main'
import Estudiantes from '../src/components/Estudiantes'
import { Estudiante, ListItemData, Nota, Profesor } from "../src/utils/types"
import { AddEstudiante, AddNota, AddProfesor, getEstudiantes, getProfesores } from '../src/utils/apiHelper'
import Profesores from '../src/components/Profesores'
import Notas from '../src/components/Notas'
import { Button, Container, Divider, Grid, ListItem, ListItemText, TextField } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import SnackBar from '../src/snackbar'
import { ERROR, SUCCESS } from '../src/snackbar/types'
import { Autocomplete } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  iconButton: {
    margin: theme.spacing(1, 1),
  },
}))

const Add: NextPage = () => {
  const classes = useStyles();  
  const router = useRouter()
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: 'Error desconocido',
    severity: ERROR,
  })
  const [estudianteNombre, setEstudianteNombre] = useState<string>("");
  const [profesorNombre, setProfesorNombre] = useState<string>("");
  const [notaNombre, setNotaNombre] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const [estudiantes, setEstudiantes] = useState<ListItemData[]>([])
  const [profesores, setProfesores] = useState<ListItemData[]>([])
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      
    },
  })

  const handleCancelClick = () => {
    router.push('/')
  }

  const handleSubmitEstudiantes = (data: any) => {
    AddEstudiante(estudianteNombre).then((res) =>
    {
      setSnackBar({
        open: true,
        message: "Estudiante registrado",
        severity: SUCCESS,
      })
      setEstudianteNombre("")
    })
    .catch((err) => {
      setSnackBar({
        open: true,
        message: err.message,
        severity: ERROR,
      })
      console.log(err)
    })
  }

  const handleSubmitProfesores = (data: any) => {
    AddProfesor(profesorNombre).then((res) =>
    {
      setSnackBar({
        open: true,
        message: "Profesor registrado",
        severity: SUCCESS,
      })
      setProfesorNombre("")
    })
    .catch((err) => {
      setSnackBar({
        open: true,
        message: err.message,
        severity: ERROR,
      })
      console.log(err)
    })
  }

  const handleSubmitNotas = (data: any) => {
    const estudianteid = estudiantes.find(x => x.nombre == "")?.id
    const profesorid = profesores.find(x => x.nombre == "")?.id
    if (profesorid == undefined)
    {
      setSnackBar({
        open: true,
        message: "El profesor seleccionado no existe",
        severity: ERROR,
      })
      return 0       
    }
    if (estudianteid == undefined)
    {
      setSnackBar({
        open: true,
        message: "El estudiante seleccionado no existe",
        severity: ERROR,
      })
      return 0       
    }
    AddNota(notaNombre, valor,estudianteid,profesorid).then((res) =>
    {
      setSnackBar({
        open: true,
        message: "Nota registrada",
        severity: SUCCESS,
      })
      setNotaNombre("")
      setValor(0)
    })
    .catch((err) => {
      setSnackBar({
        open: true,
        message: err.message,
        severity: ERROR,
      })
      console.log(err)
    })
  }
  
  useEffect(() => {
    getEstudiantes()
        .then((res) =>
        {
            const data = res?.data.map((item:any) => ({id:item.estudianteID, nombre: item.nombre}))
            setEstudiantes(data)
        })
        .catch((err) => console.log(err))
    getProfesores()
        .then((res) =>
        {
            const data = res?.data.map((item:any) => ({id:item.profesorID, nombre: item.nombre}))
            setProfesores(data)
        })
        .catch((err) => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
  return (
    <MainLayout>
      <Container>
        <Container>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleSubmitEstudiantes)}
          >
            <Grid container direction="row" spacing={1}>
              <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="estudiante"
                    value={estudianteNombre}
                    onChange={(e: any) => setEstudianteNombre(e.target.value)}
                    label="Nombre del estudiante"
                    autoFocus
                    autoComplete="estudiante"
                  />
              </Grid>
              <Grid item xs={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Agregar estudiante
                  </Button>
                </Grid>
            </Grid>
          </form>
          <Divider></Divider>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleSubmitProfesores)}
          >
            <Grid container direction="row" spacing={1}>
              <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="profesor"
                    value={profesorNombre}
                    onChange={(e: any) => setProfesorNombre(e.target.value)}
                    label="Nombre del profesor"
                    autoFocus
                    autoComplete="profesor"
                  />
              </Grid>
              <Grid item xs={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Agregar profesor
                  </Button>
                </Grid>
            </Grid>
          </form>
          <Divider></Divider>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleSubmitNotas)}
          >
            <Grid container direction="row" spacing={1}>
              <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="nota"
                    value={notaNombre}
                    onChange={(e: any) => setNotaNombre(e.target.value)}
                    label="Nombre de la nota"
                    autoFocus
                    autoComplete="nota"
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="valor"
                    value={valor}
                    onChange={(e: any) => setValor(e.target.value)}
                    label="Valor de la nota"
                    autoFocus
                    autoComplete="valor"
                  />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  options={estudiantes}
                  getOptionLabel={(option:any) => option.nombre}
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccione al estudiante" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  options={profesores}
                  getOptionLabel={(option:any) => option.nombre}
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccione al profesor" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Agregar Nota
                  </Button>
                </Grid>
            </Grid>
          </form>
        </Container>        
        <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
      </Container>
    </MainLayout>
  )
}

export default Add