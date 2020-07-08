// this component renders a dialog modal which contains a login form

import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Box, Typography, Button } from '@material-ui/core'
import { Form } from 'informed'
import Alert from '../Alert'
import TextButton from '../TextButton'
import { login } from '../../store/authReducer'
import queryString from 'query-string'
import { removeDialogFilter } from '../../utils'
import TextInput from '../TextInput'

const LoginDialog = () => {
  const [error, setError] = useState(null)
  const history = useHistory()
  const dispatch = useDispatch()
  const search = queryString.parse(history.location.search)

  const user = useSelector(state => state.auth.user)

  // if login succesfull or already logged on 
  // redirect to '/'
  if (user) {
    return <Redirect to='/'/>
  }

  const handleSubmit = async ({ email, password}) => {
    try {
      await login(email, password)(dispatch)
    } catch (e) {
      setError(JSON.stringify(e.response.data))
    }
    
  }

  return (
    <Dialog open={true} onClose={() => history.push({ search: queryString.stringify(
      removeDialogFilter(search)
    ) })}>
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
        <Alert severity='error' alert={error}/>
        <Box padding={2} paddingLeft={8} paddingRight={8}>
          <Form onSubmit={handleSubmit}>
            <label>
              <Typography>
                email
              </Typography>
              <TextInput field='email'/>
            </label>
            <label>
              <Typography>
                password
              </Typography>
              <TextInput type='password' field='password'/>
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