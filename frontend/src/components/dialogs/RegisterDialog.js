// this component renders a dialog modal which contains a register form

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dialog } from '@material-ui/core'
import RegisterForm from './RegisterForm'
import queryString from 'query-string'
import { removeDialogFilter } from '../../utils'

const RegisterDialog = () => {
  const history = useHistory()
  const search = queryString.parse(history.location.search)

  return (
    <Dialog open={true} onClose={() => history.push({ search: queryString.stringify(
      removeDialogFilter(search)
    )})}>
      <RegisterForm />
    </Dialog>
  )
}

export default RegisterDialog