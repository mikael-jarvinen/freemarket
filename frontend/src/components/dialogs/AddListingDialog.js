// renders a dialog which contains a form for posting a new listing

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dialog, Box, Typography, Container } from '@material-ui/core'
import { Form, Text, TextArea } from 'informed'

const AddListingDialog = () => {
  const history = useHistory()

  const handleSubmit = values => {
    console.log(values)
  }

  return (
    <Dialog open={true} onClose={() => history.push({ search: null })}>
      <Box padding={2} bgcolor='primary.main'>
        <Typography>
          Add Listing
        </Typography>
      </Box>
      <Form onSubmit={handleSubmit}>
        <Box padding={2}>
          <Container>
            <Box display='flex' flexWrap='wrap'>
              <Box padding={2} marginRight={2}>
                <label>
                  <Typography>
                    Title:
                  </Typography>
                  <Text field='title'/>
                </label>
              </Box>
              <Box padding={2} marginRight={2}>
                <label>
                  <Typography>
                    Price:
                  </Typography>
                  <Text field='price' type='number'/>
                </label>
              </Box>
            </Box>
            <Box padding={2}>
              <label>
                <Typography>
                  Postal code:
                </Typography>
                <Text field='postal_code'/>
              </label>
            </Box>
            <Box padding={2}>
              <label>
                <Typography>
                  Description:
                </Typography>
                <TextArea field='description' rows={3} cols={25}/>
              </label>
            </Box>
          </Container>
        </Box>
      </Form>
    </Dialog>
  )
}

export default AddListingDialog