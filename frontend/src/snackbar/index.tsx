import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

type Props = {
  snackBar: any
  setSnackBar: any
}

const SnackBar = ({ snackBar, setSnackBar }: Props) => {
  const handleClose = () => {
    setSnackBar({ ...snackBar, open: false })
  }
  return (
    <Snackbar
      open={snackBar.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackBar.severity}>
        {snackBar.message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
