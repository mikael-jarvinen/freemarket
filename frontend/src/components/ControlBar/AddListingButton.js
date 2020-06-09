// this component renders a button that is responsible for opening
// the addlisting dialog

import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import AddBoxIcon from '@material-ui/icons/AddBox'
import queryString from 'query-string'

const AddListingButton = () => {
  const [hover, setHover] = useState(false)
  const history = useHistory()
  const search = queryString.parse(history.location.search)

  return (
    <Box
      padding={2}
      display='flex'
      style={{ cursor: 'pointer' }}
      onClick={() => history.push({ search: queryString.stringify({
        ...search,
        dialog: 'addListing'
      }) })}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography
        style={{ textDecoration: !hover || 'underline' }}
        color={hover ? 'secondary' : 'textPrimary'}
      >
        Add listing
      </Typography>
      <AddBoxIcon/>
    </Box>
  )
}

export default AddListingButton