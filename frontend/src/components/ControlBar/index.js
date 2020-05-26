import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog } from '../../store/loginDialogReducer'
import { Box, Button } from '@material-ui/core'
import LogoButton from './LogoButton'
import SearchBar from './SearchBar'
import AccountControl from './AccountControl'

const ControlBar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  return (
    <Box>
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
            onClick={() => dispatch(openDialog())}
            color='inherit'
            variant='text'
          >
            Login
          </Button>
          }
        </Box>
      </Box>
      <Box display='flex' paddingTop={2} justifyContent='center'>
        <SearchBar
          placeholder='search...'
          onSearch={value => console.log(value)}
        />
      </Box>
    </Box>
  )
}

export default ControlBar