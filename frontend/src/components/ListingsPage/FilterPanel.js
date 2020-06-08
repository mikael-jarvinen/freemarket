// This component renders a row of buttons and fields where we can modify
// and input filters and sorting

import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Select,
  MenuItem,
  Typography,
  Button
} from '@material-ui/core'
import { Form } from 'informed'
import queryString from 'query-string'
import TextInput from '../TextInput'

const FilterPanel = () => {
  const history = useHistory()
  const search = queryString.parse(history.location.search)
  const sortFilters = search.ordering.split(',')

  const handleSubmit = values => {
    history.push({ search: queryString.stringify({
      ...search,
      price__gte: values.price_min,
      price__lte: values.price_max
    }) })
  }

  return (
    <Box
      padding={2}
      paddingTop={0}
      display='flex'
      flexGrow={1}
    >
      <Box display='flex' alignItems='center'>
        <Typography>Sort By:</Typography>
        <Select
          onChange={event => history.push({ search: `?page=1&ordering=${event.target.value}` })}
          value={sortFilters}
          multiple
        >
          <MenuItem value='price'>price asc.</MenuItem>
          <MenuItem value='-price'>price desc.</MenuItem>
          <MenuItem value='title'>title</MenuItem>
          <MenuItem value='created'>recent</MenuItem>
          <MenuItem value='-created'>oldest</MenuItem>
        </Select>
      </Box>
      <Box
        display='flex'
        flexGrow={1}
        justifyContent='center'
        alignItems='center'
      >
        <Typography>price range:</Typography>
        <Box
          marginLeft={1}
          display='flex'
          alignItems='center'
        >
          <Form onSubmit={handleSubmit}>
            <Box display='flex' alignItems='center'>
              <Box marginRight={1} maxWidth={45}>
                <TextInput
                  field='price_min'
                  placeholder='min'
                  type='number'
                  initialValue={search.price__gte}
                />
              </Box>
              -
              <Box marginLeft={1} maxWidth={45}>
                <TextInput
                  field='price_max'
                  placeholder='max'
                  type='number'
                  initialValue={search.price__lte}
                />
              </Box>
              <Box marginLeft={2} alignItems='center'>
                <Button size='small' variant='outlined' type='submit'>apply</Button>
              </Box>
            </Box>
          </Form>
        </Box>
      </Box>
    </Box>
  )
}

export default FilterPanel