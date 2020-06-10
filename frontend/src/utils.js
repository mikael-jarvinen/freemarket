// collection of utility functions

// takes an object containing filters and returns an object
// with frontend specific filters removed
// eslint-disable-next-line no-unused-vars
export const removeFrontFilters = ({ listing, dialog, page, ...rest }) => rest

// takes an object containing filters and returns an object
// with frontend specific filter 'listing' removed
// eslint-disable-next-line no-unused-vars
export const removeListingFilter = ({ listing, ...rest }) => rest

// takes an object containing filters and returns an object
// with frontend specific filter 'dialog' removed
// eslint-disable-next-line no-unused-vars
export const removeDialogFilter = ({ dialog, accountform, ...rest }) => rest