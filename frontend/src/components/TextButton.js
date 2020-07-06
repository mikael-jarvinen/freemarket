// This component renders text that acts also as a button

import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const TextButton = ({ onClick, text, ...props }) => {
  const [ hover, setHover ] = useState(false)

  const { color, ...rest } = props

  return (
    <Typography
      onClick={onClick}
      style={{ cursor: 'pointer', textDecoration: !hover || 'underline' }}
      {...rest}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      color={hover ? 'secondary' : color || 'textPrimary'}
      fontWeight='bold'
    >
      {text}
    </Typography>
  )
}

TextButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string
}

export default TextButton