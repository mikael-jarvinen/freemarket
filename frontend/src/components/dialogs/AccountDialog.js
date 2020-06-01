// Renders an account dialog, here you can edit or patch user resource

import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Dialog,
  Box,
  Typography,
  Container
} from '@material-ui/core'

const AccountDialog = () => {
  const history = useHistory()
  const user = useSelector(state => state.auth.user)

  return (
    <Dialog open={true} onClose={() => history.push({ search: null })}>
      <Box
        padding={2}
        bgcolor='primary.main'
        flexGrow={1}
      >
        <Typography color='textSecondary'>
          My Account
        </Typography>
      </Box>
      <Box flexGrow={1} padding={2}>
        <Container>
          <Box display='flex' flexGrow={1}>
            <Box
              padding={2}
              bgcolor='secondary.light'
              marginRight={2}
              borderRadius={3}
              flexGrow={1}
            >
              <Typography>{user.display_name}</Typography>
              <Typography>{user.email}</Typography>
            </Box>
            <Box
              padding={2}
              bgcolor='secondary.light'
              borderRadius={3}
              flexGrow={1}
            >
              <Typography>{user.full_name}</Typography>
              <Typography>{user.website}</Typography>
            </Box>
          </Box>
          <Box
            padding={2}
            maxWidth='45vw'
            bgcolor='secondary.light'
            borderRadius={3}
            marginTop={2}
          >
            <Typography>{user.biography}</Typography>
          </Box>
        </Container>
      </Box>
    </Dialog>
  )
}

export default AccountDialog