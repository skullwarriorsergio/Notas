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
 } from '@material-ui/core';
import { Profesor } from '../utils/types'
import { AccountCircle } from '@material-ui/icons'
import SnackBar from '../snackbar'
import { ERROR, SUCCESS } from '../snackbar/types'
import DeleteForever from '@material-ui/icons/DeleteForever'
import { deleteProfesor } from '../utils/apiHelper';

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
    data: Profesor
    onDelete: any
}

const ProfesorCard = ( {data, onDelete}: Props) => {
  const classes = useStyles();
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: 'Unknow error',
    severity: ERROR,
  })

  const handleDeleteClick = (e:any) => {
    e.preventDefault()
    deleteProfesor(data.profesorID).then((res) =>
    {
      onDelete(data.profesorID)
    })
    .catch((err) => 
    {
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
                   <AccountCircle />
                </Avatar>
                }
                title={`Nombre: ${data.nombre}`}
                subheader={`ID: ${data.profesorID}`} 
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

export default ProfesorCard