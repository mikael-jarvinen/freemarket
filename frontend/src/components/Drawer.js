// Renders a Material ui drawer

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Drawer, Box, Divider } from '@material-ui/core'
import TextButton from './TextButton'
import Footer from './footer'

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
              variant='h6'
              text='Home'
            />
          </Box>
          <Box marginTop={1} marginBottom={1}>
            <TextButton
              onClick={() => history.push('/listings?page=1&ordering=created')}
              variant='h6'
              text='Browse All'
            />
          </Box>
          <Divider/>
          <Box marginTop={1} marginBottom={1}>
            <TextButton
              onClick={() => history.push(
                '/listings?page=1&ordering=created&category=ELECTRONICS'
              )}
              text='Electronics'
              variant='h6'
            />
            <Box marginLeft={2}>
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=COMPUTERS'
                )}
                variant='body2'
                text='computers'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=SMARTPHONES'
                )}
                variant='body2'
                text='smartphones'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=SMARTDEVICES'
                )}
                variant='body2'
                text='smartdevices'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=PERIPHERALS'
                )}
                variant='body2'
                text='peripherals'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=TELEVISIONS'
                )}
                variant='body2'
                text='televisions'
              />
            </Box>
          </Box>
          <Divider/>
          <Box marginTop={1} marginBottom={1}>
            <TextButton
              onClick={() => history.push(
                '/listings?page=1&ordering=created&category=VEHICLES'
              )}
              text='Vehicles'
              variant='h6'
            />
            <Box marginLeft={2}>
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=CARS'
                )}
                variant='body2'
                text='cars'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=MOTORCYCLES'
                )}
                variant='body2'
                text='motorcycles'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=BICYCLES'
                )}
                variant='body2'
                text='bicycles'
              />
            </Box>
          </Box>
          <Divider/>
          <Box marginTop={1} marginBottom={1}>
            <TextButton
              onClick={() => history.push(
                '/listings?page=1&ordering=created&category=CLOTHES'
              )}
              text='Clothes'
              variant='h6'
            />
            <Box marginLeft={2}>
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=SHOES'
                )}
                variant='body2'
                text='shoes'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=PANTS'
                )}
                variant='body2'
                text='pants'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=SHIRTS'
                )}
                variant='body2'
                text='shirts'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=JACKETS'
                )}
                variant='body2'
                text='jackets'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=HATS'
                )}
                variant='body2'
                text='hats'
              />
            </Box>
          </Box>
          <Divider/>
          <Box marginTop={1} marginBottom={1}>
            <TextButton
              onClick={() => history.push(
                '/listings?page=1&ordering=created&category=HOME'
              )}
              text='Home'
              variant='h6'
            />
            <Box marginLeft={2}>
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=KITCHEN'
                )}
                variant='body2'
                text='kitchen'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=APPLIANCES'
                )}
                variant='body2'
                text='appliances'
              />
              <TextButton
                onClick={() => history.push(
                  '/listings?page=1&ordering=created&category=FURNITURE'
                )}
                variant='body2'
                text='furniture'
              />
            </Box>
          </Box>
          <Divider/>
          <Box marginTop={1} marginBottom={1}>
            <TextButton
              onClick={() => history.push(
                '/listings?page=1&ordering=created&category=OTHER'
              )}
              text='Other'
              variant='h6'
            />
          </Box>
          <Divider/>
          <Box display='flex' flexGrow={1} flexDirection='column-reverse'>
            <Footer/>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerComponent