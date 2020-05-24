// reducer responsible for the login dialog state
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

const loginDialogReducer = (state = false, action) => {
  switch(action.type) {
  case 'CLOSE':
    return false
  case 'OPEN':
    return true
  default:
    return state
  }
}

export default loginDialogReducer