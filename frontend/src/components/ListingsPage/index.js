// this is the root component for rendering the page responsible for
// showing a listings page where you can browse listings

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { loadPage } from '../../store/listingsReducer'
import {
  Box,
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  useMediaQuery
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import queryString from 'query-string'
import ListingView from './ListingView'

const ListingsPage = () => {
  const { search } = useLocation()
  const { listing } = queryString.parse(search)
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentPage, pageCount } = useSelector(state => state.listings)

  // determining the gridlist columns amount depending on screensize
  // and if a valid 'listing' query string has been provided to URL, when
  // a listingview is rendered
  let cols = 4 // default cols value
  if (!useMediaQuery(theme => theme.breakpoints.up('sm'))) {
    cols = 1 // for small screens 1 column is enough
  } else if (listing) {
    cols = 3 // when a listing querystring has been provided
  }

  if (!currentPage.page) {
    dispatch(loadPage(1))
    return <Typography>Loading</Typography>
  }

  return (
    <Container>
      <Box display='flex'>
        <Box
          maxHeight='70vh'
          overflow='auto'
          padding={2}
          flexGrow={1}
          minWidth='30vw'
        >
          <Box
            padding={2}
            flexGrow={1}
            display='flex'
            justifyContent='center'
          >
            <Pagination count={pageCount} color='secondary'>

            </Pagination>
          </Box>
          <GridList cols={cols} cellHeight={200}>
            {
              currentPage.listings.map(listing => 
                <GridListTile
                  key={listing.id}
                  onClick={() => history.push({
                    search: `?listing=${listing.id}`
                  })}
                  style={{ cursor: 'pointer' }}
                >
                  <GridListTileBar
                    title={listing.title}
                  />
                </GridListTile>
              )
            }
          </GridList>
        </Box>
        <ListingView
          listing={currentPage.listings.find(({ id }) => 
            id === Number(listing)
          )}
        />
      </Box>
    </Container>
  )
}

export default ListingsPage