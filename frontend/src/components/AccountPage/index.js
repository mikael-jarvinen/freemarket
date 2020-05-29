import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Box, Typography } from '@material-ui/core'

const AccountPage = () => {
  const user = useSelector(state => state.auth.user)

  return (
    <Container>
      <Box display='flex'>
        <Box flexGrow={1}>
          <Typography>
            {user.display_name}
          </Typography>
        </Box>
        <Box flexGrow={1}>
          <Typography>
            {user.email}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default AccountPage