// This component is a searchbar made with material-ui/core

import React from 'react'
import { useHistory } from 'react-router-dom'
import { TextField, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import PropTypes from 'prop-types'
import queryString from 'query-string'

const SearchBar = ({ onSearch, placeholder }) => {
  const history = useHistory()
  const search = queryString.parse(history.location.search)

  const handleSubmit = event => {
    event.preventDefault()
    onSearch(event.target.search.value)
  }

  return (
    <Box 
      bgcolor='white'
      padding={0.5}
      borderRadius={2}
      display='flex'
      alignItems='center'
    >
      <form onSubmit={handleSubmit}>
        <Box display='flex' width='40vh'>
          <TextField
            name='search'
            placeholder={placeholder}
            fullWidth={true}
            defaultValue={search.search}
          />
          <SearchIcon
            style={{ cursor: 'pointer' }}
            color='primary'
          />
        </Box>
      </form>
    </Box>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string
}

export default SearchBar