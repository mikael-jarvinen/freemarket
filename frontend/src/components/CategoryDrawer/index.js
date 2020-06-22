// this renders a drawer where you can push different category
// querystrings

import React from 'react'
import { Box } from '@material-ui/core'
import CategoryButton from './CategoryButton'
import SubCategoryButton from './SubCategoryButton'

const CategoryDrawer = () => {
  return (
    <Box padding={5} border='1px solid lightgrey' borderTop={0}>
      <CategoryButton category='Browse All'/>
      <CategoryButton category='Electronics'>
        <SubCategoryButton category='computers'/>
        <SubCategoryButton category='smartphones'/>
        <SubCategoryButton category='smartdevices'/>
        <SubCategoryButton category='peripherals'/>
        <SubCategoryButton category='televisions'/>
      </CategoryButton>
      <CategoryButton category='Vehicles'>
        <SubCategoryButton category='cars'/>
        <SubCategoryButton category='motorcycles'/>
        <SubCategoryButton category='bicycles'/>
      </CategoryButton>
      <CategoryButton category='Clothes'>
        <SubCategoryButton category='shoes'/>
        <SubCategoryButton category='pants'/>
        <SubCategoryButton category='shirts'/>
        <SubCategoryButton category='jackets'/>
        <SubCategoryButton category='hats'/>
      </CategoryButton>
      <CategoryButton category='Home'>
        <SubCategoryButton category='kitchen'/>
        <SubCategoryButton category='appliances'/>
        <SubCategoryButton category='furniture'/>
      </CategoryButton>
      <CategoryButton category='Other'/>
    </Box>
  )
}

export default CategoryDrawer