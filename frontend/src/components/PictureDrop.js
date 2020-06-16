// This renders a react-informed custom field for files
// drop zone which accepts only 1 image
// of type jpeg or png and of size no more than 50mb
// after receiving file renders the image

import React from 'react'
import { Box, Typography } from '@material-ui/core'
import DropZone from 'react-dropzone'
import { useField } from 'informed'
import PropTypes from 'prop-types'

const validate = file => {
  if (file.size > 51200) {
    return 'File is too large, >50mb'
  } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    return 'File is not of type jpeg or png'
  }
}

const PictureDrop = props => {
  const { fieldState, fieldApi, render, userProps} = useField({ ...props, validate, fieldType: 'image'})

  const { value } = fieldState
  const { setValue, setTouched } = fieldApi
  const { onBlur, ...rest } = userProps

  const handleDrop = files => {
    setValue(files[0])
  }

  return render(
    <Box
      padding={2}
      onBlur={e => {
        setTouched(true)
        if (onBlur) {
          onBlur(e)
        }
      }}
      style={fieldState.error ? { border: 'solid 1px red' } : null}
    >
      <DropZone onDrop={handleDrop} {...rest}>
        {({ getRootProps, getInputProps}) => (
          <section>
            <Box
              {...getRootProps()}
              maxWidth='15vh'
              maxHeight='15vw'
              border='5px dashed lightgrey'
              padding={1}
              style={value ? { backgroundImage: URL.createObjectURL(value) } : null}
            >
              <input {...getInputProps()}/>
              {value
                ? (
                  <img
                    src={URL.createObjectURL(value)}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    alt='preview'
                  />
                )
                : (<Typography variant='caption'>
                  Drag and drop some files here, or click to select files
                </Typography>)}
            </Box>
          </section>
        )}
      </DropZone>
      <Box flexGrow={1} display='flex' justifyContent='center'>
        <Typography color='error'>
          {fieldState.error ? (
            <small style={{ color: 'red' }}>{fieldState.error}</small>
          ) : null}
        </Typography>
      </Box>
    </Box>
  )
}

PictureDrop.propTypes = {
  onDrop: PropTypes.func
}

export default PictureDrop