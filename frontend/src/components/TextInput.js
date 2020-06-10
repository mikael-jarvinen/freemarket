// renders a custom textinput for informed forms
// wraps a material ui textfield with informed magic

import React from 'react'
import { TextField, Box, Typography } from '@material-ui/core'
import { asField } from 'informed'

const TextInput = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState
  const { setValue, setTouched } = fieldApi
  const { onChange, onBlur, forwardedRef, ...rest } = props

  return (
    <React.Fragment>
      <Box>
        <TextField
          {...rest}
          ref={forwardedRef}
          value={!value && value !== 0 ? '' : value}
          onChange={e => {
            setValue(e.target.value)
            if (onChange) {
              onChange(e)
            }
          }}
          onBlur={e => {
            setTouched(true)
            if (onBlur) {
              onBlur(e)
            }
          }}
          style={fieldState.error ? { border: 'solid 1px red' } : null}
        />
        <Typography>
          {fieldState.error ? (
            <small style={{ color: 'red' }}>{fieldState.error}</small>
          ) : null}
        </Typography>
      </Box>
    </React.Fragment>
  )
})

export default TextInput