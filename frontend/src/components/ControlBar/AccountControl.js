// Component that displays the logged on user's display name and email
// and shows a button that opens a menu where you can log out and view
// more account actions

import React, { useState } from 'react'
import { Box, Typography, Fade } from '@material-ui/core'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../../store/authReducer'

const AccountControl = ({ user }) => {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box display='flex' justifyContent='flex-end'>
      <Box>
        <Typography variant='h6'>
          {user.display_name}
        </Typography>
        <Typography variant='caption'>
          {user.email}
        </Typography>
      </Box>
      <IconButton onClick={handleClick}>
        <MenuIcon/>
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => history.replace('/account')}
        >
          my account
        </MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

export default AccountControl