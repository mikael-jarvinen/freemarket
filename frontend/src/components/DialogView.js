// This component determines whic dialog to render based on the
// url params

import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginDialog from './dialogs/LoginDialog'
import RegisterDialog from './dialogs/RegisterDialog'
import AccountDialog from './dialogs/AccountDialog'
import AddListingDialog from './dialogs/AddListingDialog'
import queryString from 'query-string'

const DialogView = () => {
  const { search } = useLocation()
  const { dialog } = queryString.parse(search)

  if (dialog === 'login') {
    return <LoginDialog/>
  }

  if (dialog === 'register') {
    return <RegisterDialog/>
  }

  if (dialog === 'account') {
    return <AccountDialog/>
  }

  if (dialog === 'addlisting') {
    return <AddListingDialog/>
  }

  return null
}

export default DialogView