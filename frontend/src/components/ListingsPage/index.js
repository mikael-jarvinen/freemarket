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
import queryString from 'query-string'
import ListingView from './ListingView'

const ListingsPage = () => {
  const { search } = useLocation()
  const { listing } = queryString.parse(search)
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentPage } = useSelector(state => state.listings)

  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'))

  if (!currentPage.page) {
    dispatch(loadPage(1))
    return <Typography>Loading</Typography>
  }

  return (
    <Box display='flex'>
      <Container>
        <Box>
          <Box maxHeight='70vh' overflow='auto' padding={2}>
            <GridList cols={matches ? 3 : 1} cellHeight={200}>
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
        </Box>
      </Container>
      <ListingView
        listing={currentPage.listings.find(({ id }) => 
          id === Number(listing)
        )}
      />
    </Box>
  )
}

export default ListingsPage