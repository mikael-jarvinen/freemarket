// collection of utility functions

// takes an object containing filters and returns an object
// with frontend specific filters removed
// eslint-disable-next-line no-unused-vars
export const removeFrontFilters = ({ listing, dialog, page, accountform, ...rest }) => rest

// takes an object containing filters and returns an object
// with frontend specific filter 'listing' removed
// eslint-disable-next-line no-unused-vars
export const removeListingFilter = ({ listing, ...rest }) => rest

// takes an object containing filters and returns an object
// with frontend specific filter 'dialog and 'accountform' removed
// eslint-disable-next-line no-unused-vars
export const removeDialogFilter = ({ dialog, accountform, ...rest }) => rest

// takes an object containing filters and returns an object
// with frontend specific filter 'accountform' removed
// eslint-disable-next-line no-unused-vars
export const removeAFormFilter = ({ accountform, ...rest }) => rest

// takes and object containing fitlers and returns an object
// with category filter removed
// eslint-disable-next-line no-unused-vars
export const removeCategoryFilter = ({ category, ...rest }) => rest