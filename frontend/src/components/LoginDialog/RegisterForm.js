import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Button} from '@material-ui/core'
import { Form, Text, TextArea } from 'informed'
import { register } from '../../services/userService'
import { showLogin } from '../../store/loginDialogReducer'
import Alert from '../Alert'
import TextButton from '../TextButton'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.loginDialog.message)

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
      <Alert alert={message}/>
      <Box padding={2}>
        <Form onSubmit={handleSubmit}>
          <Box display='flex' flexWrap='wrap'>
            <Box margin={3}>
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
                <Text field='password1'/>
              </label>
              <label>
                <Typography>
                  retype password
                </Typography>
                <Text field='password2'/>
              </label>
            </Box>
            <Box margin={3}>
              <label>
                <Typography>
                  display name
                </Typography>
                <Text field='display_name'/>
              </label>
              <label>
                <Typography>
                  first and last name
                </Typography>
                <Text field='full_name'/>
              </label>
              <label>
                <Typography>
                  website
                </Typography>
                <Text field='website'/>
              </label>
            </Box>
          </Box>
          <Box marginLeft={3}>
            <label>
              <Typography>
                biography
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
                onClick={() => dispatch(showLogin())}
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