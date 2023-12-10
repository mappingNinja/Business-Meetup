import { useContext, useState } from 'react'
import eye from '../../../assets/images/eye.svg'
import eyeOff from '../../../assets/images/eye-off-line.svg'
import '../../../common/scss/pages/settings.scss'
import OTPModal from './OTP-modal'
import { getAuthConfig, post } from '../../../libs/http-hydrate'
import FieldValidationError from '../../error-messages/field-validation-error'

const initialState = {
  password: '',
  clickEvent: false,
  error: false,
  errorMessage: ''
}

function ContinueToPassword (props) {
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState(initialState)
  const [showModal, setShowModal] = useState(false)


  const setFieldValue = (field, value) => {
    setState(prev => {
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const setClickEvent = (value) => {
    setFieldValue('clickEvent', value)
  }

  const setError = (error, message) => {
    setFieldValue('error', error)
    setFieldValue('errorMessage', message)
  }

  const togglePasswordView = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setClickEvent(true)
    if (state.password.trim()) {
      const formData = new FormData()
      formData.append('password', state.password)
      try {
        const result = await post('/user/setting/request_deactivate_account', formData, getAuthConfig())
        if (result.status === 200) {
          props.changeParentState('PasswordVerified', true)
          setError(false, '')
          setShowModal(true)
        } else {
          props.changeParentState('PasswordVerified', false)
          setError(true, result.statusText)
        }
      } catch (error) {
        props.changeParentState('PasswordVerified', false)
        setError(true, error.message)
      }
    } else {
      setError(true, 'please enter password')
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <>
      <div className='delete-account'>
        {props.children}
        <form onSubmit={handleSubmit}>
          <div className='form-field'>
            <label className='form-label'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='pass'
              className='form-input'
              placeholder='Enter Your Password'
              required
              value={state.password}
              onChange={e => {
                setFieldValue('password', e.target.value)
                setError(false, '')
              }}
            />
            <button className='toggle-password'><img src={showPassword ? eyeOff : eye} alt='view-password' onClick={togglePasswordView} /></button>
          </div>
          {state.clickEvent && (state.error ? <FieldValidationError message='Please Enter valid password' /> : '')}
          <div className='form-button' data-toggle='modal' data-target='#deleteModal'>
            <button className='button button-primary'>
              Continue
            </button>
          </div>
        </form>
        <OTPModal show={showModal} closeModal={closeModal} type={props.parentState} />
      </div>
    </>
  )
}

export default ContinueToPassword
