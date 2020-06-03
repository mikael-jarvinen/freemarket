// This component renders a detailed view of a single listing

import React from 'react'
import {
  Box,
  Typography,
  Paper
} from '@material-ui/core'
import PropTypes from 'prop-types'

const ListingView = ({ listing }) => {
  if (!listing) {
    return null
  }

  return (
    <Box borderLeft={1}>
      <Typography variant='h6'>{listing.title}</Typography>
    </Box>
  )
}

ListingView.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    created: PropTypes.string,
    postal_code: PropTypes.number,
    owner: PropTypes.number,
    questions: PropTypes.array
  })
}

export default ListingView