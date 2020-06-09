// this reducer is responsible for handling the listings state that
// holds information about the currently loaded page of listings
// and 2 recently viewed pages of listings

import { get } from '../services/listingService'
import _ from 'lodash'
import { removeFrontFilters } from '../utils'

const initialState = {
  pageCount: null,
  results: null,
  pages: {},
  filters: {},
  resolving: false
}

// Returns action creators that loads a new page, set count of pages
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
    if (!_.isEqual(filtersState, removeFrontFilters(filters))) {
      dispatch({ type: 'TOGGLE_RESOLVING' })
      dispatch({
        type: 'SET_FILTERS',
        data: {
          filters: removeFrontFilters(filters)
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
    dispatch({
      type: 'SET_RESULTS_COUNT',
      data: response.count
    })
    dispatch({ type: 'TOGGLE_RESOLVING' })
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
  case 'SET_PAGE_COUNT':
    return {
      ...state,
      pageCount: action.data.pageCount
    }
  case 'SET_RESULTS_COUNT':
    return {
      ...state,
      results: action.data
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