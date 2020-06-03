// this is the root component for rendering the page responsible for
// showing a listings page where you can browse listings

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPage } from '../../store/listingsReducer'
import {
  Box,
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography
} from '@material-ui/core'

const ListingsPage = () => {
  const dispatch = useDispatch()
  const { currentPage } = useSelector(state => state.listings)

  if (!currentPage.page) {
    dispatch(loadPage(1))
    return <Typography>Loading</Typography>
  }

  return (
    <Box>
      <Container>
        <GridList cols={3}>
          {
            currentPage.listings.map(listing => 
              <GridListTile key={listing.id}>
                <GridListTileBar
                  title={listing.title}
                />
              </GridListTile>
            )
          }
        </GridList>
      </Container>
    </Box>
  )
}

export default ListingsPage