// this is the root component for rendering the page responsible for
// showing a listings page where you can browse listings

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
import FilterPanel from './FilterPanel'

const ListingsPage = () => {
  const history = useHistory()
  const search = queryString.parse(history.location.search)
  const dispatch = useDispatch()
  const { pages, pageCount } = useSelector(state => state.listings)

  // determining the gridlist columns amount depending on screensize
  // and if a valid 'listing' query string has been provided to URL, when
  // a listingview is rendered
  let cols = 4 // default cols value
  if (!useMediaQuery(theme => theme.breakpoints.up('sm'))) {
    cols = 1 // for small screens 1 column is enough
  } else if (search.listing) {
    cols = 3 // when a listing querystring has been provided
  }

  useEffect(() => {
    if (!search.page || !search.ordering) {
      history.push({ search: '?page=1&ordering=created' })
    } else if (!pages[search.page]) {
      dispatch(loadPage(search.page, search))
    }
  }, [dispatch, history.location.search, history, pages, search])

  if (!pages[search.page]) {
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
          >
            <Box display='flex' flexDirection='column' flexGrow={1}>
              <FilterPanel/>
              <Box display='flex' justifyContent='center'>
                <Pagination
                  count={pageCount}
                  color='secondary'
                  page={Number(search.page)}
                  onChange={(event, page) => history.push({
                    search: queryString.stringify({ ...search, page })
                  })}
                />
              </Box>
            </Box>
          </Box>
          <GridList cols={cols} cellHeight={200}>
            {
              pages[search.page].listings.map(listing => 
                <GridListTile
                  key={listing.id}
                  onClick={() => history.push({
                    search: queryString.stringify({ ...search, listing: listing.id })
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
        <ListingView listing={pages[search.page].listings.find(({ id }) =>
          id === Number(search.listing))}/>
      </Box>
    </Container>
  )
}

export default ListingsPage