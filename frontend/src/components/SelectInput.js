// Renders a custom informed Select input from material ui Select component

import React from 'react'
import { Select, Box, Typography } from '@material-ui/core'
import { asField } from 'informed'

const SelectComponent = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState
  const { setValue, setTouched } = fieldApi
  const { onChange, onBlur, forwardedRef, children, ...rest } = props

  return (
    <React.Fragment>
      <Box>
        <Select
          autoWidth
          displayEmpty
          {...rest}
          ref={forwardedRef}
          value={!value && value !== 0 ? '' : value}
          onChange={e => {
            setValue(e.target.value)
            if (onChange) {
              onChange(e)
            }
          }}
          rowsMax={10}
          onBlur={e => {
            setTouched(true)
            if (onBlur) {
              onBlur(e)
            }
          }}
          style={fieldState.error ? { border: 'solid 1px red' } : null}
        >
          {children}
        </Select>
        <Typography>
          {fieldState.error ? (
            <small style={{ color: 'red' }}>{fieldState.error}</small>
          ) : null}
        </Typography>
      </Box>
    </React.Fragment>
  )
})

export default SelectComponent