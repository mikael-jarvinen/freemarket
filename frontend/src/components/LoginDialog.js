import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Box, Typography, Button } from '@material-ui/core'
import { Form, Text } from 'informed'
import { closeDialog } from '../store/loginDialogReducer'
import { login } from '../store/authReducer'
import Alert from './Alert'

const LoginDialog = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.loginDialog)

  const handleSubmit = ({ email, password}) => {
    dispatch(login(email, password))
  }

  return (
    <Dialog open={state.open} onClose={() => dispatch(closeDialog())}>
      <Box
        bgcolor='primary.main'
        flexGrow={1}
        padding={3}
      >
        <Typography color='textSecondary'>
          Login to Freemarket
        </Typography>
      </Box>
      <Alert alert={state.message}/>
      <Box padding={2} paddingLeft={8} paddingRight={8}>
        <Form onSubmit={handleSubmit}>
          <label>
            <Typography>
              email
            </Typography>
            <Text field='email'/>
          </label>
          <label>
            <Typography>
              password
            </Typography>
            <Text field='password'/>
          </label>
          <Box marginTop={1}>
            <Button variant='outlined' type='submit'>
              login
            </Button>
          </Box>
        </Form>
      </Box>
    </Dialog>
  )
}

export default LoginDialog