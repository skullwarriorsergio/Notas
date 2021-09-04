import React, { useState } from "react"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { 
    CardHeader,
     CardContent,
     CardActions,
     Avatar,
     IconButton,
     Typography,
     Grid,
     Divider,
     Container
 } from '@material-ui/core';
import SnackBar from '../snackbar'
import { ERROR, SUCCESS } from '../snackbar/types'
import { Nota } from '../utils/types'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteForever from '@material-ui/icons/DeleteForever'
import { deleteNota } from '../utils/apiHelper';

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
    data: Nota
    onDelete: any
}

const NotaCard = ( {data, onDelete}: Props) => {
  const classes = useStyles();
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: 'Unknow error',
    severity: ERROR,
  })

  const handleDeleteClick = (e:any) => {
    e.preventDefault()
    deleteNota(data.notaID).then((res) =>
    {
      onDelete(data.notaID)
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
                   <InsertDriveFileIcon />
                </Avatar>
                }
                title={`Nombre: ${data.nombre}`}
                subheader={`ID: ${data.notaID}`} 
            />
            <CardContent>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography color="textPrimary" component="a">
                      {`Valor: ${data.valor}`}
                </Typography>
                <Typography color="textPrimary" component="a">
                      {`Profesor: ${data.profesor}`}
                </Typography>
                <Typography color="textPrimary" component="a">
                      {`Estudiante: ${data.estudiante}`}
                </Typography>
              </Grid>              
            </CardContent>
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

export default NotaCard