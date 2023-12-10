import React from 'react'
import { ReactComponent as CloseCircleLineIcon } from '../../assets/images/close-circle-line.svg'

export default function FieldValidationError (props) {
  const { name, message } = props
  return (
    <p className='error-message'>
      {
        message && <><CloseCircleLineIcon />{message}</>
      }
      {
        name && <><CloseCircleLineIcon /> {`Please enter valid ${name}`}</>
      }
    </p>
  )
}
