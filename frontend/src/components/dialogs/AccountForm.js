// renders a form where you can edit a logged on user resource

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'informed'
import SaveIcon from '@material-ui/icons/Save'
import { Box, Typography, IconButton } from '@material-ui/core'
import Alert from '../Alert'
import { editAccount } from '../../store/authReducer'
import TextInput from '../TextInput'

const AccountForm = () => {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const displayNameValidate = value => {
    if (!value || value.length < 5) {
      return 'Too short displayname'
    }
  }

  const handleSubmit = async values => {
    try {
      await editAccount(values)(dispatch)
    } catch (e) {
      setError(JSON.stringify(e.response.data))
    }
  }

  return (
    <Box flexGrow={1} padding={2}>
      <Alert severity='error' alert={error}/>
      <Form onSubmit={handleSubmit}>
        <Box display='flex' flexWrap='wrap'>
          <Box padding={2}>
            <label>
              <Typography>displayname:</Typography>
              <TextInput
                field='display_name'
                initialValue={user.display_name}
                validate={displayNameValidate}
              />
            </label>
          </Box>
          <Box padding={2}>
            <label>
              <Typography>full name:</Typography>
              <TextInput
                field='full_name'
                initialValue={user.full_name}
              />
            </label>
          </Box>
        </Box>
        <Box padding={2}>
          <label>
            <Typography>website:</Typography>
            <TextInput
              field='website'
              initialValue={user.website}
            />
          </label>
        </Box>
        <Box display='flex'>
          <Box padding={2}>
            <label>
              <Typography>biography:</Typography>
              <TextInput
                multiline
                field='biography'
                initialValue={user.biography}
              />
            </label>
          </Box>
          <Box
            display='flex'
            flexGrow={1}
            flexDirection='row-reverse'
          >
            <IconButton type='submit'>
              <SaveIcon/>
            </IconButton>
          </Box>
        </Box>
      </Form>
    </Box>
  )
}

export default AccountForm