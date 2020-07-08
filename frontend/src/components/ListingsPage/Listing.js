// renders gridlisttile representing a listing
// if prop 'redirect' is true onClick event will redirect
// to '/listings/:id/' instead of pushing a querystring

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Typography
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'

const Listing = ({ listing, redirect }) => {
  const [hover, setHover] = useState(false)
  const history = useHistory()
  const search = queryString.parse(history.location.search)

  const handleClick = () => {
    if (redirect) {
      history.push(`/listings/${listing.id}/`)
    } else {
      history.push({ search: queryString.stringify({
        ...search,
        listing: listing.id
      })})
    }
  }

  return (
    <Box
      borderBottom='1px solid lightgrey'
      width={304}
      height={250}
      margin={1}
      marginRight={0}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      bgcolor={hover ? 'secondary.light' : null}
      style={{
        cursor: 'pointer',
        opacity: hover ? 0.5 : 1
      }}
    >
      <img
        alt='listing'
        src={listing.picture}
        style={{
          width: 304,
          height: 171,
          overflow: 'hidden',
          objectFit: 'scale-down'
        }}
      />
      <Box padding={4} paddingTop={0} paddingBottom={0}>
        <Typography variant='h6'>
          {listing.title}
        </Typography>
        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
        >
          <Box flexGrow={1}>
            <Typography variant='overline'>
              <Box fontWeight='fontWeightBold' color='red'>
                € {listing.price}
              </Box>
            </Typography>
          </Box>
          <Typography variant={'caption'}>
            postal code: {listing.postal_code}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

Listing.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number.isRequired,
    picture: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    postal_code: PropTypes.number.isRequired
  }),
  redirect: PropTypes.bool
}

export default Listing