// this component renders a dialog modal which contains a register form

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dialog } from '@material-ui/core'
import RegisterForm from './RegisterForm'

const LoginDialog = () => {
  const history = useHistory()

  return (
    <Dialog open={true} onClose={() => history.push({ search: null })}>
      <RegisterForm />
    </Dialog>
  )
}

export default LoginDialog