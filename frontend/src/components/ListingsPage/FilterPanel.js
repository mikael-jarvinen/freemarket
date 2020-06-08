// This component renders a row of buttons and fields where we can modify
// and input filters and sorting

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Select, MenuItem, Typography } from '@material-ui/core'
import queryString from 'query-string'

const FilterPanel = () => {
  const history = useHistory()
  const { ordering } = queryString.parse(history.location.search)
  const sortFilters = ordering.split(',')

  return (
    <Box
      padding={2}
      paddingTop={0}
      display='flex'
      flexDirection='row'
      alignItems='center'
    >
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
  )
}

export default FilterPanel