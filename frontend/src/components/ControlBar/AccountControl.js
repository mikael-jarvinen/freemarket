import React from 'react'

const AccountControl = ({ user }) => {
  return (
    <div>
      logged in as {user.display_name}
    </div>
  )
}

export default AccountControl