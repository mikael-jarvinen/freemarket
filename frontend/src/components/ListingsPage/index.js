// this is the root component for rendering the page responsible for
// showing a listings page where you can browse listings

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadPage } from '../../store/listingsReducer'
import {
  Box,
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
import _ from 'lodash'
import { removeFrontFilters } from '../../utils'

const ListingsPage = () => {
  const history = useHistory()
  const search = queryString.parse(history.location.search)
  const dispatch = useDispatch()
  const { pages, pageCount, filters, resolving } = useSelector(state => state.listings)

  // determining the gridlist columns amount depending on screensize
  // and if a valid 'listing' query string has been provided to URL, when
  // a listingview is rendered
  let cols = 5 // default cols value
  if (!useMediaQuery(theme => theme.breakpoints.up('sm'))) {
    cols = 1 // for small screens 1 column is enough
  } else if (search.listing) {
    cols = 4 // when a listing querystring has been provided
  }

  useEffect(() => {
    if (!search.page || !search.ordering) {
      history.push({ search: '?page=1&ordering=created' })
    } else if (!pages[search.page] && !resolving) {
      dispatch(loadPage(search.page, search))
    } else if (!_.isEqual(filters, removeFrontFilters(search))) {
      dispatch(loadPage(search.page, search))
    }
  }, [dispatch, history.location.search, pages, history])

  if (!pages[search.page]) {
    return <Typography>Loading</Typography>
  }

  return (
    <Box display='flex'>
      <Box
        padding={2}
        flexGrow={1}
        minWidth='30vw'
      >
        <Box
          padding={2}
          flexGrow={1}
          display='flex'
          borderBottom='1px solid lightgrey'
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
        <Box overflow='auto' maxHeight='60vh' padding={2}>
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
      </Box>
      <ListingView listing={pages[search.page].listings.find(({ id }) =>
        id === Number(search.listing))}/>
    </Box>
  )
}

export default ListingsPage