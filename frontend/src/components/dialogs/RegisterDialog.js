// this component renders a dialog modal which contains a register form

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dialog } from '@material-ui/core'
import RegisterForm from './RegisterForm'
import queryString from 'query-string'

const LoginDialog = () => {
  const history = useHistory()
  const search = queryString.parse(history.location.search)

  return (
    <Dialog open={true} onClose={() => history.push({ search: queryString.stringify({
      ...search,
      dialog: null
    }) })}>
      <RegisterForm />
    </Dialog>
  )
}

export default LoginDialog