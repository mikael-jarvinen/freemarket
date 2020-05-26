// this component renders a dialog modal which contains a login form
// or a register form

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog } from '@material-ui/core'
import { closeDialog } from '../../store/loginDialogReducer'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginDialog = () => {
  const dispatch = useDispatch()
  const { open, form} = useSelector(state => state.loginDialog)

  return (
    <Dialog open={open} onClose={() => dispatch(closeDialog())}>
      {form === 'login' && <LoginForm/>}
      {form === 'register' && <RegisterForm/>}
    </Dialog>
  )
}

export default LoginDialog