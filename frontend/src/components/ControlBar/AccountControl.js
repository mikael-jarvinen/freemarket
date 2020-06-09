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
import PropTypes from 'prop-types'
import queryString from 'query-string'

const AccountControl = ({ user }) => {
  const history = useHistory()
  const search = queryString.parse(history.location.search)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box display='flex' justifyContent='flex-end' alignItems='center'>
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
          onClick={() => history.push({ search: queryString.stringify({
            ...search,
            dialog: null
          }) })}
        >
          my account
        </MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

AccountControl.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    full_name: PropTypes.string,
    email: PropTypes.string.isRequired,
    biography: PropTypes.string,
    website: PropTypes.string,
    listings: PropTypes.array,
    reviews: PropTypes.array,
    given_reviews: PropTypes.array
  })
}

export default AccountControl