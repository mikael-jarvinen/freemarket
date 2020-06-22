// this is the root component for rendering the page responsible for
// showing a listings page where you can browse listings

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadPage } from '../../store/listingsReducer'
import { Box, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import queryString from 'query-string'
import ListingView from './ListingView'
import Listing from './Listing'
import FilterPanel from './FilterPanel'
import _ from 'lodash'
import { removeFrontFilters } from '../../utils'

const ListingsPage = () => {
  const history = useHistory()
  const search = queryString.parse(history.location.search)
  const dispatch = useDispatch()
  const { pages, pageCount, filters, resolving } = useSelector(state => state.listings)

  useEffect(() => {
    const s = queryString.parse(history.location.search)

    if (!s.page || !s.ordering) {
      history.push({ search: '?page=1&ordering=created' })
    } else if (!pages[s.page] && !resolving) {
      dispatch(loadPage(s.page, s))
    } else if (!_.isEqual(filters, removeFrontFilters(s)) && !resolving) {
      dispatch(loadPage(s.page, s))
    }
  }, [dispatch, history.location.search, pages, history, filters, resolving])

  if (!pages[search.page]) {
    return <Typography>Loading</Typography>
  }

  return (
    <Box display='flex' flexGrow={1}>
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
        <Box
          height='60vh'
          padding={2}
          display='flex'
          flexGrow={1}
          flexWrap='wrap'
          overflow='auto'
        >
          {pages[search.page].listings.map(l => 
            <Listing key={l.id} listing={l}/>)}
        </Box>
      </Box>
      <ListingView listing={pages[search.page].listings.find(({ id }) =>
        id === Number(search.listing))}/>
    </Box>
  )
}

export default ListingsPage