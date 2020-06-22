// Renders a clickable text representing a category
// onClick pushes new category querystring

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Box, Divider } from '@material-ui/core'
import queryString from 'query-string'
import TextButton from '../TextButton'

const SubCategoryButton = ({ category }) => {
  const [hover, setHover] = useState(false)
  const history = useHistory()
  const value = category.toUpperCase()
  const search = queryString.parse(history.location.search)

  return (
    <Box>
      <Box
        padding={1}
        onClick={() => history.push({
          search: queryString.stringify({
            ...search,
            category: value
          })
        })}
        color={ hover ? 'secondary.light' : null }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <TextButton text={category}/>
      </Box>
      <Divider/>
    </Box>
  )
}

SubCategoryButton.propTypes = {
  category: PropTypes.string
}

export default SubCategoryButton