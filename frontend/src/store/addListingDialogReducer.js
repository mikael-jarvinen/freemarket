// reducer that holds state information about the AddListingDialog alerts

const initialState = {
  message: null
}

// creates an action that sets an alert message to AddListingDialog
export const showMessage = message => {
  return {
    type: 'LISTING_DIALOG_MESSAGE',
    data: {
      message
    }
  }
}

export const titleAlert = message => {
  return {
    type: 'TITLE_ALERT',
    data: {
      message
    }
  }
}

export const priceAlert = message => {
  return {
    type: 'PRICE_ALERT',
    data: {
      message
    }
  }
}

export const postalCodeAlert = message => {
  return {
    type: 'POSTAL_CODE_ALERT',
    data: {
      message
    }
  }
}

export const descriptionAlert = message => {
  return {
    type: 'DESCRIPTION_ALERT',
    data: {
      message
    }
  }
}

const addListingDialogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LISTING_DIALOG_MESSAGE':
    return {
      ...state,
      message: action.data.message
    }
  case 'TITLE_ALERT':
    return {
      ...state,
      titleAlert: action.data.message
    }
  case 'PRICE_ALERT':
    return {
      ...state,
      priceAlert: action.data.message
    }
  case 'POSTAL_CODE_ALERT':
    return {
      ...state,
      postalCodeAlert: action.data.message
    }
  case 'DESCRIPTION_ALERT':
    return {
      ...state,
      descriptionAlert: action.data.message
    }
  default:
    return state
  }
}

export default addListingDialogReducer