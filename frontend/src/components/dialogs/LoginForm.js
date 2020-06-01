// unmodular loginform component to be used in the logindialog

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { Box, Typography, Button } from '@material-ui/core'
import { Form, Text } from 'informed'
import { login } from '../../store/authReducer'
import Alert from '../Alert'
import TextButton from '../TextButton'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const message = useSelector(state => state.loginForm.message)
  const user = useSelector(state => state.auth.user)

  const handleSubmit = ({ email, password}) => {
    dispatch(login(email, password))

    // if login successfull redirect to '/'
    if (user) {
      return <Redirect to='/'/>
    }
  }

  return (
    <Box>
      <Box
        bgcolor='primary.main'
        flexGrow={1}
        padding={3}
      >
        <Typography color='textSecondary'>
          Login to Freemarket
        </Typography>
      </Box>
      <Alert alert={message}/>
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
          <Box marginTop={1} flexGrow={1} display='flex'>
            <Box justifyContent='left' flexGrow={1}>
              <Button variant='outlined' type='submit'>
                login
              </Button>
            </Box>
            <Box display='flex' justifyContent='flex-end' flexGrow={1}>
              <TextButton
                onClick={() => history.replace('/register')}
                text={'Don\'t have an account?'}
              />
            </Box>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default LoginForm