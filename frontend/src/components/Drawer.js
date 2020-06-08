// Renders a Material ui drawer

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Drawer, Box, Divider } from '@material-ui/core'
import TextButton from './TextButton'

const DrawerComponent = () => {
  const history = useHistory()

  return (
    <Drawer
      variant='permanent'
    >
      <Box
        marginTop={10}
        width='13vw'
        display='flex'
        flexDirection='column'
        flexGrow={1}
      >
        <Box
          margin={1}
          flexGrow={1}
          display='flex'
          flexDirection='column'
        >
          <Box marginTop={2}>
            <TextButton
              onClick={() => history.push('/')}
              text='home'
            />
          </Box>
          <Box marginTop={2}>
            <TextButton
              onClick={() => history.push('/listings?page=1&ordering=created')}
              text='browse listings'
            />
          </Box>
          <Divider/>
          <Box display='flex' flexGrow={1} flexDirection='column-reverse'>
            hello
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerComponent