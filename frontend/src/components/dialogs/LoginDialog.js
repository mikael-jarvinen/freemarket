// this component renders a dialog modal which contains a login form

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dialog } from '@material-ui/core'
import LoginForm from './LoginForm'

const LoginDialog = () => {
  const history = useHistory()

  return (
    <Dialog open={true} onClose={() => history.push({ search: null })}>
      <LoginForm/>
    </Dialog>
  )
}

export default LoginDialog