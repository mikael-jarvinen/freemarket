import React from 'react'
import { Typography } from '@material-ui/core'

const TextButton = ({ onClick, text }) => {
  return (
    <Typography onClick={onClick} style={{ cursor: 'pointer' }}>
      {text}
    </Typography>
  )
}

export default TextButton