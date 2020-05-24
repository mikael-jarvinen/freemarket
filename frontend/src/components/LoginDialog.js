import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, Box, Typography } from '@material-ui/core'
import { Form, Text } from 'informed'
import { closeDialog } from '../store/loginDialogReducer'

const LoginDialog = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.loginDialog)

  const handleSubmit = () => {

  }

  return (
    <Dialog open={state} onClose={() => dispatch(closeDialog())}>
      <Box
        bgcolor='primary.main'
        flexGrow={1}
        padding={3}
      >
        <Typography color='textSecondary'>
          Login
        </Typography>
      </Box>
      <Box padding={2} paddingLeft={4} paddingRight={4}>
        <Form>
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
        </Form>
      </Box>
    </Dialog>
  )
}

export default LoginDialog