import React from 'react'
import { Alert } from '@material-ui/lab'
import PropTypes from 'prop-types'

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

AlertComponent.propTypes = {
  alert: PropTypes.string
}

export default AlertComponent