// unmodular registerform component to be used in the logindialog

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Typography, Button} from '@material-ui/core'
import { Form } from 'informed'
import { register } from '../../services/userService'
import { responseAlert } from '../../store/registerFormReducer'
import Alert from '../Alert'
import TextButton from '../TextButton'
import queryString from 'query-string'
import TextInput from '../TextInput'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const search = queryString.parse(history.location.search)
  const messages = useSelector(state => state.registerForm)

  const handleSubmit = ({
    email,
    password1,
    display_name,
    full_name,
    biography,
    website
  }) => {
    register(
      email,
      password1,
      display_name,
      full_name,
      biography,
      website
    )
      .then(() => {
        history.replace('/login')
      })
      .catch(error => {
        dispatch(responseAlert(Object.values(error.response.data).join()))
      })
  }

  const emailValidate = value => {
    if (!value || !value.includes('@')) {
      return 'Field must be an email'
    }
  }

  const passwordValidate = (value, values) => {
    if (values.password1 !== values.password2) {
      return 'Passwords must be equal'
    } else if (values.password1 < 8) {
      return 'Password must be atleast 8 characters long'
    }
  }

  const displayNameValidate = value => {
    if (!value || value.length < 5) {
      return 'Too short displayname'
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
                <TextInput
                  field='email'
                  validate={emailValidate}
                  validateOnBlur
                />
              </label>
              <label>
                <Typography>
                  password
                </Typography>
                <TextInput
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
                <TextInput
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
                <TextInput
                  field='display_name'
                  validate={displayNameValidate}
                  validateOnBlur
                />
              </label>
              <label>
                <Typography>
                  first and last name (optional)
                </Typography>
                <TextInput field='full_name'/>
              </label>
              <label>
                <Typography>
                  website (optional)
                </Typography>
                <TextInput field='website'/>
              </label>
            </Box>
          </Box>
          <Box marginLeft={3}>
            <label>
              <Typography>
                biography (optional)
              </Typography>
              <TextInput multiline field='biography'/>
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
                onClick={() => history.push({ search: queryString.stringify({
                  ...search,
                  dialog: 'login'
                }) })}
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