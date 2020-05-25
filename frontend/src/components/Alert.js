import React from 'react'
import { Alert } from '@material-ui/lab'

const AlertComponent = ({ alert }) => {
  if (alert) {
    return (
      <Alert severity='error'>
        {alert}
      </Alert>
    )
  } else {
    return null
  }
}

export default AlertComponent