import React, { useState } from "react"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { 
    CardHeader,
     CardActions,
     Avatar,
     IconButton,
     Typography,
     Container
 } from '@material-ui/core'
import SnackBar from '../snackbar'
import { ERROR, SUCCESS } from '../snackbar/types'
import { Estudiante } from '../utils/types'
import FaceIcon from '@material-ui/icons/Face';
import DeleteForever from '@material-ui/icons/DeleteForever'
import { deleteEstudiante } from '../utils/apiHelper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
      minWidth: 250,
      margin: "10px"
    },
    avatar: {
      backgroundColor: '#3f50b5',
    },
  }),
);
type Props = {
    data: Estudiante
    onDelete: any
}

const EstudianteCard = ( {data, onDelete}: Props) => {
  const classes = useStyles();
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: 'Unknow error',
    severity: ERROR,
  })

  const handleDeleteClick = (e:any) => {
    e.preventDefault()
    deleteEstudiante(data.estudianteID).then((res) =>
    {
      onDelete(data.estudianteID)
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

  return (
      <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                   <FaceIcon />
                </Avatar>
                }
                title={`Nombre: ${data.nombre}`}
                subheader={`ID: ${data.estudianteID}`} 
            />
            <CardActions disableSpacing>
              <IconButton onClick={handleDeleteClick}> 
                  <DeleteForever>
                    <Typography variant="button" color="textPrimary" component="a">
                      Adicionar
                    </Typography>
                  </DeleteForever>
              </IconButton>
            </CardActions>
    </Card> 
  );
}

export default EstudianteCard