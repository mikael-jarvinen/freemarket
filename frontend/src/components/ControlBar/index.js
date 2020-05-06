import React from 'react'
import { Box } from '@material-ui/core'
import LogoButton from './LogoButton'
import SearchBar from './SearchBar'

const ControlBar = () => {
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
          Controls
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