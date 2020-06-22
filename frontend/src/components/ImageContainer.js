// Renders an image keeping the aspect ratio by adding blank space
// image can be opened in react-viewer

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import Viewer from 'react-viewer'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'


const ImageContainer = ({ src, alt, ...rest }) => {
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  return (
    <Box
      {...rest}
      style={{ cursor: 'pointer' }}
      height={171}
      width={304}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      display='flex'
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: 304,
          height: 171,
          overflow: 'hidden',
          objectFit: 'scale-down',
          opacity: hover ? 0.5 : 1
        }}
      />
      {hover
        ? <Box
          position='fixed'
          height={171}
          width={304}
          display='flex'
          justifyContent='center'
          alignItems='center'
          onClick={() => setVisible(true)}
        >
          <ZoomInIcon opacity={0.5}/>
          <ZoomOutIcon opacity={0.5}/>
        </Box>
        : null}
      <Viewer
        visible={visible}
        onClose={() => setVisible(false)}
        images={[{ src, alt }]}
        changeable={false}
      />
    </Box>
  )
}

ImageContainer.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
}

export default ImageContainer