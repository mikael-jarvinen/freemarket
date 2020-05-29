// This component renders text that acts also as a button

import React from 'react'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const TextButton = ({ onClick, text }) => {
  return (
    <Typography onClick={onClick} style={{ cursor: 'pointer' }}>
      {text}
    </Typography>
  )
}

TextButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default TextButton