// this reducer is responsible for handling the listings state that
// holds information about the currently loaded page of listings
// and 2 recently viewed pages of listings

import { get } from '../services/listingService'
import { getById } from '../services/userService'
import _ from 'lodash'

const initialState = {
  pageCount: null,
  pages: {},
  filters: {},
  resolving: false
}

// Returns action creators that load a new page, set count of pages
// and if filters are unequal to current filters set new filters and
// clear current cached filters
export const loadPage = (page, filters) => {
  const offset = (page - 1) * 20
  return async (dispatch, getState) => {
    const filtersState = getState().listings.filters
    const response = await get(offset, filters)
    const listingCount = response.count
    const pageCount = Math.floor(listingCount / 21) + 1

    // update filter change to store
    if (!_.isEqual(filtersState, { ...filters, page: null, listing: null })) {
      dispatch({ type: 'TOGGLE_RESOLVING' })
      dispatch({
        type: 'SET_FILTERS',
        data: {
          filters: {
            ...filters,
            page: null,
            listing: null
          }
        }
      })
      dispatch({
        type: 'LOAD_PAGE',
        data: {
          page,
          listings: response.results
        }
      })
    } else {
      dispatch({ type: 'TOGGLE_RESOLVING' })
      dispatch({
        type: 'LOAD_PAGE',
        data: {
          page,
          listings: response.results
        }
      })
    }
    dispatch({
      type: 'SET_PAGE_COUNT',
      data: {
        pageCount
      }
    })
    dispatch({ type: 'TOGGLE_RESOLVING' })
  }
}

// populates the owner field by listing id
export const loadOwner = listingId => {
  return async (dispatch, getState) => {
    const pages = getState().listings.pages
    let pageKey = null
    for (const key in pages) {
      const page = pages[key]
      if (page.listings.find(({ id }) => id === listingId)) {
        pageKey = key
        break
      }
    }

    const listings = pages[pageKey].listings
    const userId = listings.find(({ id }) => id === listingId).owner
    const owner = await getById(userId)

    dispatch({
      type: 'POPULATE_OWNER',
      data: {
        page: pageKey,
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
      }
    }
  case 'POPULATE_OWNER':
    return {
      ...state,
      pages: {
        ...state.pages,
        [action.data.page]: {
          ...action.data.page,
          listings: state.pages[action.data.page].listings.map(l => {
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
    }
  case 'SET_PAGE_COUNT':
    return {
      ...state,
      pageCount: action.data.pageCount
    }
  case 'SET_FILTERS':
    return {
      ...state,
      filters: action.data.filters,
      pages: {}
    }
  case 'TOGGLE_RESOLVING':
    return {
      ...state,
      resolving: !state.resolving
    }
  default:
    return state
  }
}

export default listingsReducer