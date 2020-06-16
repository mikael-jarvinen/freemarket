// This component shows a grey bar at the top of the application and 
// a searchbar

import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Button } from '@material-ui/core'
import LogoButton from './LogoButton'
import SearchBar from './SearchBar'
import AccountControl from './AccountControl'
import AddListingButton from './AddListingButton'
import queryString from 'query-string'

const ControlBar = () => {
  const history = useHistory()
  const { user } = useSelector(state => state.auth)
  const search = queryString.parse(history.location.search)

  return (
    <Box
      borderBottom='1px solid lightgrey'
      display='flex'
      flexDirection='column'
    >
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
            onClick={() => history.push({
              search: queryString.stringify({ ...search, dialog: 'login' })
            })}
            color='inherit'
            variant='text'
          >
            Login
          </Button>
          }
        </Box>
      </Box>
      <Box display='flex' paddingTop={2} marginLeft='13vw'>
        <Box
          display='flex'
          flexGrow={1}
          justifyContent='center'
        >
          <SearchBar
            placeholder='search...'
            onSearch={value => history.push({
              search: queryString.stringify({
                ...search,
                listing: null,
                search: value
              })
            })}
          />
        </Box>
        <Box>
          <AddListingButton/>
        </Box>
      </Box>
    </Box>
  )
}

export default ControlBar