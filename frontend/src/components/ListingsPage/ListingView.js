// This component renders a detailed view of a single listing
// Also dispatches an action that populates the owner field of the listing

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Button
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { loadOwner } from '../../store/listingsReducer'

const ListingView = ({ listing }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  // useEffect used to populate the owner field
  useEffect(() => {
    if (listing && typeof listing.owner === 'number') {
      dispatch(loadOwner(listing.id))
    }
  }, [dispatch, listing])

  if (!listing) {
    return null
  }
  if (typeof listing.owner === 'number') {
    return <Typography>Loading</Typography>
  }

  return (
    <Box
      borderLeft={1}
      borderColor='primary.light'
      padding={2}
    >
      <Paper elevation={3}>
        <Box padding={3} margin={2}>
          <Typography variant='h4'>
            {listing.title}
          </Typography>
          <Typography variant='h6'>
            €{listing.price}
          </Typography>
        </Box>
      </Paper>
      <Paper elevation={3}>
        <Box padding={3} margin={2}>
          <Typography>
            {listing.description}
          </Typography>
          <Box marginTop={2} marginBottom={-3}>
            <Typography variant='caption'>
              selling from postcode {listing.postal_code}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={3}>
        <Box padding={3} margin={2}>
          <Typography variant='h6'>
            seller {listing.owner.display_name}
          </Typography>
          <Typography variant='caption'>
            {listing.owner.email}
          </Typography>
        </Box>
      </Paper>
      <Box flexGrow={1}>
        <Button
          variant='outlined'
          onClick={() => history.push({ search: null })}
        >
          Close
        </Button>
      </Box>
    </Box>
  )
}

ListingView.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    created: PropTypes.string,
    postal_code: PropTypes.number,
    owner: PropTypes.any,
    questions: PropTypes.array
  })
}

export default ListingView