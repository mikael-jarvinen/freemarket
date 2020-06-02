// renders a form where you can edit a logged on user resource

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Text, TextArea } from 'informed'
import SaveIcon from '@material-ui/icons/Save'
import { Box, Typography, IconButton } from '@material-ui/core'
import { editAccount } from '../../store/authReducer'

const AccountForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  return (
    <Box flexGrow={1} padding={2}>
      <Form onSubmit={values => dispatch(editAccount(values))}>
        <Box display='flex' flexWrap='wrap'>
          <Box padding={2}>
            <label>
              <Typography>displayname:</Typography>
              <Text field='display_name' initialValue={user.display_name}/>
            </label>
          </Box>
          <Box padding={2}>
            <label>
              <Typography>full name:</Typography>
              <Text field='full_name' initialValue={user.full_name}/>
            </label>
          </Box>
        </Box>
        <Box padding={2}>
          <label>
            <Typography>website:</Typography>
            <Text field='website' initialValue={user.website}/>
          </label>
        </Box>
        <Box display='flex'>
          <Box padding={2}>
            <label>
              <Typography>biography:</Typography>
              <TextArea field='biography' initialValue={user.biography}/>
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