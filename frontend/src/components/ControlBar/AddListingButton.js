// this component renders a button that is responsible for opening
// the addlisting dialog

import React from 'react'
import { Box, Typography } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'

const AddListingButton = () => {
  return (
    <Box padding={2} display='flex' style={{ cursor: 'pointer' }}>
      <Typography>Add listing</Typography>
      <AddBoxIcon/>
    </Box>
  )
}

export default AddListingButton