// This component shows a grey bar at the top of the application and 
// a searchbar

import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Button, useTheme } from '@material-ui/core'
import LogoButton from './LogoButton'
import SearchBar from './SearchBar'
import AccountControl from './AccountControl'
import AddListingButton from './AddListingButton'

const ControlBar = () => {
  const history = useHistory()
  const { user } = useSelector(state => state.auth)
  const theme = useTheme()

  return (
    <Box borderBottom={1}>
      <Box
        marginTop='-8px'
        marginLeft='-8px'
        marginRight='-8px'
        bgcolor='primary.main'
        boxShadow={3}
        color='white'
        display='flex'
        flexGrow={1}
        padding={2}
        alignItems='center'
        position='fixed'
        width='100%'
        zIndex={theme.zIndex.drawer + 1}
      >
        <LogoButton />
        <Box
          display='flex'
          flexGrow={1}
          flexDirection='row-reverse'
        >
          {user &&
            <AccountControl user={user}/>
          }
          {!user && 
          <Button
            padding={1}
            onClick={() => history.push({ search: '?dialog=login' })}
            color='inherit'
            variant='text'
          >
            Login
          </Button>
          }
        </Box>
      </Box>
      <Box display='flex' paddingTop={2}>
        <Box display='flex' flexGrow={1} justifyContent='center'>
          <SearchBar
            placeholder='search...'
            onSearch={value => console.log(value)}
          />
        </Box>
        <Box>
          <AddListingButton/>
        </Box>
      </Box>
      <Box marginBottom={5}/>
    </Box>
  )
}

export default ControlBar