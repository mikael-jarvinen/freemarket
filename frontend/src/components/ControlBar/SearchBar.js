import React from 'react'
import { TextField, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({ onSearch, placeholder }) => {
  const handleSubmit = event => {
    event.preventDefault()
    onSearch(event.target.search.value)
    event.target.search.value = ''
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

export default SearchBar