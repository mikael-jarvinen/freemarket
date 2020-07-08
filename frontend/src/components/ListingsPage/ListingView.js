// This component renders a detailed view of a single listing
// Also dispatches an action that populates the owner field of the listing

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Typography,
  Button
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { loadUser } from '../../store/usersReducer'
import queryString from 'query-string'
import { removeListingFilter } from '../../utils'
import ImageContainer from '../ImageContainer'
import AvatarImage from '../AvatarImage'
import TextButton from '../TextButton'

const ListingView = ({ listing }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const search = queryString.parse(history.location.search)
  const { users } = useSelector(state => state.users)

  useEffect(() => {
    if (listing && !users.find(({ id }) => id === listing.owner)) {
      dispatch(loadUser(listing.owner))
    }
  }, [dispatch, listing, users])

  if (!listing) {
    return null
  }

  const owner = users.find(({ id }) => id === listing.owner)
  if (!owner) {
    return <Typography>Loading</Typography>
  }

  return (
    <Box
      borderLeft='1px solid lightgrey'
      padding={2}
      overflow='auto'
      maxHeight='75vh'
      maxWidth='35vw'
      minWidth='25vw'
    >
      <Box
        padding={3}
        border='1px solid lightgrey'
        borderRadius={5}
        boxShadow={3}
        marginBottom={2}
        display='flex'
        flexDirection='column'
      >
        <TextButton
          text={listing.title}
          variant='h4'
          onClick={() => history.push(`/listings/${listing.id}/`)}
        />
        <Typography variant='h6'>
          <Box color='red'>
            € {listing.price}
          </Box>
        </Typography>
        <ImageContainer
          src={listing.picture}
          alt='listing detail'
        />
        <Box
          borderTop='1px solid lightgrey'
          marginTop={2}
          paddingTop={2}
        >
          <Typography>
            {listing.description}
          </Typography>
          <Box marginTop={2} marginBottom={-3}>
            <Typography variant='caption'>
              selling from postcode {listing.postal_code}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        padding={3}
        border='1px solid lightgrey'
        borderRadius={5}
        boxShadow={3}
        marginBottom={2}
        display='flex'
      >
        <Box>
          <Typography variant='h6'>
            seller {owner.display_name}
          </Typography>
          <Typography variant='caption'>
            {owner.email}
          </Typography>
        </Box>
        <Box
          display='flex'
          flexGrow={1}
          justifyContent='flex-end'
        >
          <AvatarImage
            src={owner.avatar}
            alt={`${owner.display_name} avatar`}
            radius={35}
            border='1px solid black'
          />
        </Box>
      </Box>
      <Box flexGrow={1}>
        <Button
          variant='outlined'
          onClick={() => history.push({
            search: queryString.stringify(removeListingFilter(search))
          })}
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
    questions: PropTypes.array,
    picture: PropTypes.string
  })
}

export default ListingView