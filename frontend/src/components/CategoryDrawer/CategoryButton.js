// Renders a button meant to represent a category
// onClick pushes a new category querystring

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box , Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import queryString from 'query-string'

const CategoryButton = ({ children, category }) => {
  const [hover, setHover] = useState(false)
  const history = useHistory()
  const search = queryString.parse(history.location.search)

  let newSearch = null
  switch (category) {
  case 'Browse All':
    break
  case 'Electronics':
    newSearch = {
      ...search,
      category: 'COMPUTERS,SMARTPHONES,SMARTDEVICES,PERIPHERALS,TELEVISIONS'
    }
    break
  case 'Vehicles':
    newSearch = {
      ...search,
      category: 'CARS,MOTORCYCLES,BICYCLES'
    }
    break
  case 'Clothes':
    newSearch = {
      ...search,
      category: 'SHOES,PANTS,SHIRTS,JACKETS,HATS'
    }
    break
  case 'Home':
    newSearch = {
      ...search,
      category: 'KITCHEN,APPLIANCES,FURNITURE'
    }
    break
  case 'Other':
    newSearch = {
      ...search,
      category: 'OTHER'
    }
    break
  default:
    newSearch = { ...search }
    break
  }

  return (
    <Box
      padding={1}
      margin={1}
      bgcolor={hover ? 'secondary.light' : 'secondary.main'}
      borderRadius={2}
      boxShadow={3}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => history.push({ search: queryString.stringify(newSearch)})}
    >
      <Typography color='textSecondary'>{category}</Typography>
    </Box>
  )
}

CategoryButton.propTypes = {
  category: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.func)
}

export default CategoryButton