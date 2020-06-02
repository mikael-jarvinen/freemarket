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

const addListingDialogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LISTING_DIALOG_MESSAGE':
    return {
      ...state,
      message: action.data.message
    }
  default:
    return state
  }
}

export default addListingDialogReducer