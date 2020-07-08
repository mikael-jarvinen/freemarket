// this renders the starting page of the website, this page 
// contains representations of 4 listings from each main category,
// except from the 'Other' category

import React, { useState, useEffect } from 'react'
import { Box, useTheme } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { get } from '../services/listingService'
import Loader from 'react-loader-spinner'
import Listing from './ListingsPage/Listing'
import TextButton from './TextButton'
import queryString from 'query-string'

const StartingPage = () => {
  const theme = useTheme()
  const history = useHistory()
  const [listings, setListings] = useState(null)

  // useEffect to fetch the listings
  useEffect(() => {
    const electronics = get(0, { 
      limit: 4,
      category: 'COMPUTERS,SMARTPHONES,SMARTDEVICES,PERIPHERALS,TELEVISIONS'
    })
    const vehicles = get(0, {
      limit: 4,
      category: 'CARS,MOTORCYCLES,BICYCLES'
    })
    const clothes = get(0, {
      limit: 4,
      category: 'SHOES,PANTS,SHIRTS,JACKETS,HATS'
    })
    const home = get(0, {
      limit: 4,
      category: 'KITCHEN,APPLIANCES,FURNITURE'
    })

    Promise.all([
      electronics,
      vehicles,
      clothes,
      home
    ]).then(responses => {
      setListings({
        electronics: responses[0].results,
        vehicles: responses[1].results,
        clothes: responses[2].results,
        home: responses[3].results
      })
    })
  }, [])

  // if the promises in useEffect are still resolving render a 
  // loader spinner instead
  if (!listings) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        flexGrow={1}
        alignItems='center'
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
    <Box flexGrow={1} padding={2}>
      <Box margin={2} padding={1}>
        <TextButton
          text='Electronics'
          variant='h5'
          onClick={() => history.push('/listings', { search: queryString.stringify({
            page: 1,
            ordering: 'created',
            category: 'COMPUTERS,SMARTPHONES,SMARTDEVICES,PERIPHERALS,TELEVISIONS'
          })})}
        />
        <Box display='flex'>
          {listings.electronics.map(l => 
            <Listing redirect key={l.id} listing={l}/>)}
        </Box>
      </Box>
      <Box margin={2} padding={1}>
        <TextButton
          text='Vehicles'
          variant='h5'
          onClick={() => history.push('/listings', { search: queryString.stringify({
            page: 1,
            ordering: 'created',
            category: 'CARS,MOTORCYCLES,BICYCLES'
          })})}
        />
        <Box display='flex'>
          {listings.vehicles.map(l => 
            <Listing redirect key={l.id} listing={l}/>)}
        </Box>
      </Box>
      <Box margin={2} padding={1}>
        <TextButton
          text='Clothes'
          variant='h5'
          onClick={() => history.push('/listings', { search: queryString.stringify({
            page: 1,
            ordering: 'created',
            category: 'SHOES,PANTS,SHIRTS,JACKETS,HATS'
          })})}
        />
        <Box display='flex'>
          {listings.clothes.map(l => 
            <Listing redirect key={l.id} listing={l}/>)}
        </Box>
      </Box>
      <Box margin={2} padding={1}>
        <TextButton
          text='Home'
          variant='h5'
          onClick={() => history.push('/listings', { search: queryString.stringify({
            page: 1,
            ordering: 'created',
            category: 'KITCHEN,APPLIANCES,FURNITURE'
          })})}
        />
        <Box display='flex'>
          {listings.home.map(l => 
            <Listing redirect key={l.id} listing={l}/>)}
        </Box>
      </Box>
    </Box>
  )
}

export default StartingPage