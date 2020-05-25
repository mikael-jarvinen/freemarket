// reducer responsible for the login dialog state

const initialState = {
  open: false,
}

export const closeDialog = () => {
  return {
    type: 'CLOSE'
  }
}

export const openDialog = () => {
  return {
    type: 'OPEN'
  }
}

export const showMessage = message => {
  return {
    type: 'MESSAGE',
    data: {
      message
    }
  }
}

const loginDialogReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'CLOSE':
    return {
      ...state,
      open: false
    }
  case 'OPEN':
    return {
      ...state,
      open: true
    }
  case 'MESSAGE':
    return {
      ...state,
      message: action.data.message
    }
  default:
    return state
  }
}

export default loginDialogReducer