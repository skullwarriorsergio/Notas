import React, { ReactNode } from 'react'
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import AssignmentIcon from '@material-ui/icons/Assignment'
import router from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
    },
  }
}))

type Props = {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleAdd = (event: any) => {
    router.push("/add")
  }

  const handleList = () => {
    router.push("/")
  }

  return (
    <main>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Ejercicio de prueba: Notas
          </Typography>
          <IconButton onClick={handleList}> 
                  <AssignmentIcon>                    
                  </AssignmentIcon>
                  <Typography>
                      Listar datos
                  </Typography>
          </IconButton>
          <IconButton onClick={handleAdd}> 
                  <AddToPhotosIcon>                    
                  </AddToPhotosIcon>
                  <Typography color="initial">
                      Adicionar datos
                  </Typography>
          </IconButton>
        </Toolbar>        
      </AppBar>
      {children}
    </main>
  )
}

export default MainLayout
