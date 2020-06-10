// renders a dialog which contains a form for posting a new listing

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addListing } from '../../store/authReducer'
import {
  titleAlert,
  priceAlert,
  postalCodeAlert,
  descriptionAlert
} from '../../store/addListingDialogReducer'
import { useHistory } from 'react-router-dom'
import {
  Dialog,
  Box,
  Typography,
  Container,
  Button
} from '@material-ui/core'
import { Form } from 'informed'
import Alert from '../Alert'
import queryString from 'query-string'
import { removeDialogFilter } from '../../utils'
import TextInput from '../TextInput'

const AddListingDialog = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const search = queryString.parse(history.location.search)

  const messages = useSelector(state => state.addListingDialog)

  const titleValidate = value => {
    if (!value || value.length < 10) {
      dispatch(titleAlert('Title should contain atleast 10 characters'))
      return 'Title should contain atleast 10 characters'
    }

    // if validation succesfull clear alert
    dispatch(titleAlert(null))
  }

  const priceValidate = value => {
    if (!value || value < 0.1 || value > 9999999.99) {
      dispatch(priceAlert('Price should be in range of 0.1-9999999.99'))
      return 'Price should be in range of 0.1-9999999.99'
    }

    // if validation succesfull clear alert
    dispatch(priceAlert(null))
  }

  const postalCodeValidate = value => {
    if (!value) {
      dispatch(postalCodeAlert('Invalid postal code'))
      return 'Invalid postal code'
    }

    // if validation succesfull clear alert
    dispatch(postalCodeAlert(null))
  }

  const descriptionValidate = value => {
    if (!value || value.length < 10 || value.length > 1000) {
      dispatch(
        descriptionAlert(
          'Description should contain atleast 10 characters and max 1000'
        )
      )
      return 'Description should contain atleast 10 characters and max 1000'
    }

    // if validation succesfull clear alert
    dispatch(descriptionAlert(null))
  }

  return (
    <Dialog open={true} onClose={() => history.push({ search: queryString.stringify(
      removeDialogFilter(search)
    )})}>
      <Box padding={2} bgcolor='primary.main'>
        <Typography>
          Add Listing
        </Typography>
      </Box>
      <Alert severity='error' alert={messages.message}/>
      <Form onSubmit={values => dispatch(addListing(values))}>
        <Box padding={2}>
          <Container>
            <Box display='flex' flexWrap='wrap'>
              <Box padding={2} marginRight={2}>
                <label>
                  <Typography>
                    Title:
                  </Typography>
                  <TextInput
                    field='title'
                    validate={titleValidate}
                    validateOnBlur
                  />
                </label>
              </Box>
              <Box padding={2} marginRight={2}>
                <label>
                  <Typography>
                    Price:
                  </Typography>
                  <TextInput
                    field='price'
                    type='number'
                    validate={priceValidate}
                    validateOnBlur
                  />
                </label>
              </Box>
            </Box>
            <Box padding={2}>
              <label>
                <Typography>
                  Postal code:
                </Typography>
                <TextInput
                  field='postal_code'
                  validate={postalCodeValidate}
                  validateOnBlur
                />
              </label>
            </Box>
            <Box padding={2} display='flex' flexWrap='wrap'>
              <Box>
                <label>
                  <Typography>
                    Description:
                  </Typography>
                  <TextInput
                    field='description'
                    rows={3}
                    cols={25}
                    validate={descriptionValidate}
                    validateOnBlur
                    multiline
                  />
                </label>
              </Box>
              <Box
                display='flex'
                flexDirection='row-reverse'
                padding={2}
                flexGrow={1}
                alignItems='center'
              >
                <Button variant='contained' type='submit'>Post</Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Form>
    </Dialog>
  )
}

export default AddListingDialog