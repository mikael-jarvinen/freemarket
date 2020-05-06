import React from 'react'
import { useHistory } from 'react-router-dom'
import { 
  Typography,
  Box
} from '@material-ui/core'
import StoreIcon from '@material-ui/icons/Store';

const LogoButton = () => {
  const history = useHistory()

  const handleClick = () => {
    history.replace('/')
  }

  return (
    <Box 
      display='flex' 
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      alignItems='center'
    >
      <Typography variant='h4'>Freemarket </Typography>
      <StoreIcon fontSize='large'/>
    </Box>
  )
}

export default LogoButton