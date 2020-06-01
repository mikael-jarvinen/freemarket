// unmodular registerform component to be used in the logindialog

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Typography, Button} from '@material-ui/core'
import { Form, Text, TextArea } from 'informed'
import { register } from '../../services/userService'
import {
  emailAlert,
  passwordAlert,
  displayNameAlert,
  responseAlert
} from '../../store/registerFormReducer'
import Alert from '../Alert'
import TextButton from '../TextButton'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const messages = useSelector(state => state.registerForm)

  const handleSubmit = ({
    email,
    password,
    display_name,
    full_name,
    biography,
    website
  }) => {
    register(
      email,
      password,
      display_name,
      full_name,
      biography,
      website
    )
      .catch(() => {
        dispatch(responseAlert('email and display name must be unique'))
      })
  }

  const emailValidate = value => {
    if (!value || !value.includes('@')) {
      dispatch(emailAlert('invalid email'))
      return 'Field must be an email'
    }

    // if validation succesfull we have to clear the alert
    dispatch(emailAlert(null))
  }

  const passwordValidate = (value, values) => {
    console.log('validating')
    if (values.password1 !== values.password2) {
      dispatch(passwordAlert('Passwords do not match'))
      return 'Passwords must be equal'
    }

    // if validation succesfull we have to clear the alert
    dispatch(passwordAlert(null))
  }

  const displayNameValidate = value => {
    if (!value || value.length < 5) {
      dispatch(displayNameAlert('Too short displayname'))
      return 'Too short displayname'
    }

    // if validation succesfull we have to clear the alert
    dispatch(displayNameAlert(null))
  }

  return (
    <Box>
      <Box
        bgcolor='primary.main'
        flexGrow={1}
        padding={3}
      >
        <Typography color='textSecondary'>
          Register to Freemarket
        </Typography>
      </Box>
      <Box padding={2}>
        <Alert severity='error' alert={messages.response}/>
        <Form onSubmit={handleSubmit}>
          <Box display='flex' flexWrap='wrap'>
            <Box margin={3}>
              <label>
                <Typography>
                  email
                </Typography>
                <Alert severity='error' alert={messages.email}/>
                <Text
                  field='email'
                  validate={emailValidate}
                  validateOnBlur
                />
              </label>
              <label>
                <Typography>
                  password
                </Typography>
                <Alert severity='error' alert={messages.password}/>
                <Text
                  type='password'
                  field='password1'
                  validate={passwordValidate}
                  validateOnBlur
                />
              </label>
              <label>
                <Typography>
                  retype password
                </Typography>
                <Alert severity='error' alert={messages.password}/>
                <Text
                  type='password'
                  field='password2'
                  validate={passwordValidate}
                  validateOnBlur
                />
              </label>
            </Box>
            <Box margin={3}>
              <label>
                <Typography>
                  display name
                </Typography>
                <Alert severity='error' alert={messages.display_name}/>
                <Text
                  field='display_name'
                  validate={displayNameValidate}
                  validateOnBlur
                />
              </label>
              <label>
                <Typography>
                  first and last name (optional)
                </Typography>
                <Text field='full_name'/>
              </label>
              <label>
                <Typography>
                  website (optional)
                </Typography>
                <Text field='website'/>
              </label>
            </Box>
          </Box>
          <Box marginLeft={3}>
            <label>
              <Typography>
                biography (optional)
              </Typography>
              <TextArea field='biography'/>
            </label>
          </Box>
          <Box marginTop={1} flexGrow={1} display='flex' marginLeft={3}>
            <Box justifyContent='left' flexGrow={1}>
              <Button variant='outlined' type='submit'>
                register
              </Button>
            </Box>
            <Box display='flex' justifyContent='flex-end' flexGrow={1}>
              <TextButton
                onClick={() => history.replace('/login')}
                text='Already have an account?'
              />
            </Box>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default RegisterForm