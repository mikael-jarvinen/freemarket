// this reducer is responsible for handling the listings state that
// holds information about the currently loaded page of listings
// and 2 recently viewed pages of listings

import { get } from '../services/listingService'

const initialState = {
  currentPage: {
    page: null,
    listings: null
  },
  recents: []
}

// Returns an action creator that loads a new page
export const loadPage = page => {
  const offset = (page - 1) * 20
  return async dispatch => {
    const response = await get(offset)
    dispatch({
      type: 'LOAD_PAGE',
      data: {
        page,
        listings: response.results
      }
    })
  }
}

const listingsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOAD_PAGE':
    return {
      ...state,
      recents: state.recents.concat(state.currentPage),
      currentPage: action.data
    }
  default:
    return state
  }
}

export default listingsReducer