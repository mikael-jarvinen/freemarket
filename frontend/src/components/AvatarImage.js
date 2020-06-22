// renders a circularly cropped image

import React from 'react'
import PropTypes from 'prop-types'

const AvatarImage = ({ src, alt, radius, border }) => {
  return <img
    src={src}
    alt={alt}
    width={radius * 2}
    height={radius * 2}
    style={{
      overflow: 'hidden',
      borderRadius: radius,
      border: border
    }}
  />
}

AvatarImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  border: PropTypes.string
}

export default AvatarImage