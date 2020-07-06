// renders a page meant to represent one listing resource

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Container,
  Typography,
  useTheme
} from '@material-ui/core'
import { getById } from '../../services/listingService'
import { loadUser } from '../../store/usersReducer'
import Loader from 'react-loader-spinner'
import ImageContainer from '../ImageContainer'
import QuestionView from './QuestionView'
import TextButton from '../TextButton'

const ListingPage = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [listing, setListing] = useState()
  const { id } = useParams()
  const [resolving, setResolving] = useState(false)
  const { users } = useSelector(state => state.users)

  // fetching the listing and owner with id and setting resolving to true
  useEffect(() => {
    if (!resolving && id && !listing) {
      setResolving(true)
      getById(id).then(result => {
        setListing(result)
        setResolving(false)
        dispatch(loadUser(result.owner))
      })
    }
  }, [id, dispatch, resolving, listing])

  const owner = users.find(({ id }) => id === listing.owner)

  if (resolving || !listing || !owner) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexGrow={1}
      >
        <Loader
          type='Oval'
          color={theme.palette.secondary.main}
          height='20vh'
          width='20vw'
        />
      </Box>
    )
  }

  return (
    <Container>
      <Box padding={2}>
        <Box
          padding={2}
          boxShadow={3}
          border='1px solid lightgrey'
          borderRadius={5}
          fontSize={22}
        >
          <Typography variant='h5'>
            {listing.title}
          </Typography>
        </Box>
        <Box
          padding={2}
          boxShadow={3}
          border='1px solid lightgrey'
          borderRadius={5}
          fontSize={22}
          justifyContent='center'
          display='flex'
          flexDirection='column'
          marginTop={2}
        >
          <Box display='flex' flexGrow={1}>
            <Box display='flex' justifyContent='center' flexGrow={1}>
              <ImageContainer
                src={listing.picture}
                alt={listing.title}
                height={450}
                width={800}
              />
            </Box>
            <Typography component='span'>
              <Box
                boxShadow={3}
                padding={2}
                border='1px solid lightgrey'
              >
                <Box>Listing Author</Box>
                <Box color='secondary.main'>
                  <TextButton
                    text={owner.display_name}
                    color='secondary'
                  />
                </Box>
                <Box color='secondary.main' fontSize={12}>
                  {owner.email}
                </Box>
              </Box>
            </Typography>
          </Box>
          <Box display='flex' flexDirection='row-reverse'>
            <Typography component='span'>
              <Box>
                selling from postcode
                <Typography component='span' color='secondary'>
                  {` ${listing.postal_code}`}
                </Typography>
              </Box>
              <Box>
                category
                <Typography component='span' color='secondary'>
                  {` ${listing.category.toLowerCase()}`}
                </Typography>
              </Box>
            </Typography>
          </Box>
          <Box
            padding={2}
            marginTop={2}
            borderTop='1px solid lightgrey'
          >
            <Typography>
              {listing.description}
            </Typography>
          </Box>
        </Box>
        <QuestionView
          listing={listing}
          borderRadius={5}
          marginTop={2}
          padding={2}
        />
      </Box>
    </Container>
  )
}

export default ListingPage