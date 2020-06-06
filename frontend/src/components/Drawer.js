// Renders a Material ui drawer

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Drawer, Box } from '@material-ui/core'
import TextButton from './TextButton'

const DrawerComponent = () => {
  const history = useHistory()

  return (
    <Drawer
      variant='permanent'
    >
      <Box marginTop={10} width='13vw'>
        <Box margin={1}>
          <TextButton
            onClick={() => history.push('/listings?page=1')}
            text='browse listings'
          />
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerComponent