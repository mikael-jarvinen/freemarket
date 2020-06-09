// this component renders a dialog modal which contains a login form

import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Box, Typography, Button } from '@material-ui/core'
import { Form, Text } from 'informed'
import Alert from '../Alert'
import TextButton from '../TextButton'
import { login } from '../../store/authReducer'
import queryString from 'query-string'

const LoginDialog = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const search = queryString.parse(history.location.search)

  const user = useSelector(state => state.auth.user)
  const message = useSelector(state => state.loginForm.message)

  // if login succesfull or already logged on 
  // redirect to '/'
  if (user) {
    return <Redirect to='/'/>
  }

  const handleSubmit = ({ email, password}) => {
    dispatch(login(email, password))
  }

  return (
    <Dialog open={true} onClose={() => history.push({ search: queryString.stringify({
      ...search,
      dialog: null
    }) })}>
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
                  onClick={() => history.push({ search: queryString.stringify({
                    ...search,
                    dialog: 'register'
                  }) })}
                  text={'Don\'t have an account?'}
                />
              </Box>
            </Box>
          </Form>
        </Box>
      </Box>
    </Dialog>
  )
}

export default LoginDialog