// this reducer is responsible for handling the listings state that
// holds information about the currently loaded page of listings
// and 2 recently viewed pages of listings

import { get } from '../services/listingService'
import { getById } from '../services/userService'

const initialState = {
  pageCount: null,
  pages: {}
}

// Returns an action creator that loads a new page
export const loadPage = page => {
  const offset = (page - 1) * 20
  return async dispatch => {
    const response = await get(offset)
    const listingCount = response.count
    const pageCount = Math.floor(listingCount / 21) + 1

    dispatch({
      type: 'LOAD_PAGE',
      data: {
        page,
        listings: response.results
      }
    })
    dispatch({
      type: 'SET_PAGE_COUNT',
      data: {
        pageCount
      }
    })
  }
}

// populates the owner field by listing id
export const loadOwner = listingId => {
  return async (dispatch, getState) => {
    const listings = getState().listings.currentPage.listings
    const userId = listings.find(({ id }) => id === listingId).owner
    const owner = await getById(userId)

    dispatch({
      type: 'POPULATE_OWNER',
      data: {
        listing: listingId,
        owner
      }
    })
  }
}

const listingsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOAD_PAGE':
    return {
      ...state,
      pages: {
        ...state.pages,
        [`${action.data.page}`]: action.data
      },
      currentPage: action.data
    }
  case 'POPULATE_OWNER':
    return {
      ...state,
      currentPage: {
        ...state.currentPage,
        listings: state.currentPage.listings.map(l => {
          if (l.id === action.data.listing) {
            return {
              ...l,
              owner: action.data.owner
            }
          } else {
            return l
          }
        })
      }
    }
  case 'SET_PAGE_COUNT':
    return {
      ...state,
      pageCount: action.data.pageCount
    }
  default:
    return state
  }
}

export default listingsReducer