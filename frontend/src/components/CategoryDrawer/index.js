// this renders a drawer where you can push different category
// querystrings

import React from 'react'
import { Box } from '@material-ui/core'
import CategoryButton from './CategoryButton'

const CategoryDrawer = () => {
  return (
    <Box padding={5} border='1px solid lightgrey' borderTop={0}>
      <CategoryButton category='Browse All'/>
      <CategoryButton category='Electronics'>

      </CategoryButton>
      <CategoryButton category='Vehicles'>

      </CategoryButton>
      <CategoryButton category='Clothes'>

      </CategoryButton>
      <CategoryButton category='Electronics'>

      </CategoryButton>
      <CategoryButton category='Home'>

      </CategoryButton>
      <CategoryButton category='Other'/>
    </Box>
  )
}

export default CategoryDrawer