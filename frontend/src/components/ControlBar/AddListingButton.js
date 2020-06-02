// this component renders a button that is responsible for opening
// the addlisting dialog

import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import AddBoxIcon from '@material-ui/icons/AddBox'

const AddListingButton = () => {
  const history = useHistory()

  return (
    <Box
      padding={2}
      display='flex'
      style={{ cursor: 'pointer' }}
      onClick={() => history.push({ search: '?dialog=addlisting' })}
    >
      <Typography>Add listing</Typography>
      <AddBoxIcon/>
    </Box>
  )
}

export default AddListingButton