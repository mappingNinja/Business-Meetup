import React, { useState } from 'react'
import eye from '../../assets/images/eye.svg'
import eyeOff from '../../assets/images/eye-off-line.svg'
import '../../common/scss/pages/settings.scss'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { ReactComponent as InfoIcon } from '../../assets/images/info.svg'
import Otp from './otp'
import { post } from '../../libs/http-hydrate'
import FieldValidationError from '../error-messages/field-validation-error'
import { PASSWORD_RULES } from '../../constants/password-rules'
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

function ChangePassword () {
  const { isStrongPassword } = validator
  const [showPassword, setShowPassword] = useState([false, false, false])
  const [verificationCode, setVerificationCode] = useState([]);
  const navigate = useNavigate()
  
  const initialFields = {
    oldPassword: {
      value: '',
      validation: true
    },
    newPassword: {
      value: '',
      validation: true
    },
    confirmPassword: {
      value: '',
      validation: true
    }
  }

  const initialCalls = {
    getOTP: {
      clickEvent: false,
      sent: false,
      error: false,
      message: ''
    },
    changePassword: {
      clickEvent: false,
      sent: false,
      error: false,
      message: ''
    },
    OTPScreen: {
      isOpen: false
    }
  }

  const [fields, setFields] = useState(initialFields)
  const [calls, setCalls] = useState(initialCalls)
  const EVENTS = {
    GET_OTP: 'getOTP',
    CHANGE_PASSWORD: 'changePassword'
  }

  const setFieldValue = (field, value) => {
    setFields(prev => {
      return {
        ...prev,
        [field]: {
          value,
          validation: true
        }
      }
    })
  }

  const setFieldValidation = (field, validation) => {
    console.log('setting validation', field, validation)
    setFields(prev => {
      return {
        ...prev,
        [field]: {
          ...prev[field],
          validation
        }
      }
    })
  }
  const setClickEvent = (event, value) => {
    setCalls(prev => {
      return {
        ...prev,
        [event]: {
          ...prev[event],
          clickEvent: value
        }
      }
    })
  }

  const setCallSent = (event, value) => {
    setCalls(prev => {
      return {
        ...prev,
        [event]: {
          ...prev[event],
          sent: value,
          error: false
        }
      }
    })
  }

  const setCallError = (event, value, message = '') => {
    setCalls(prev => {
      return {
        ...prev,
        [event]: {
          ...prev[event],
          sent: false,
          error: value,
          message
        }
      }
    })
  }

  const sendPasswordResetOTP = async (e) => {
    e.preventDefault()
    if (fields.oldPassword.value) {
      setClickEvent(EVENTS.GET_OTP, true)
      setVerificationCode(prev => { return [] })
      setCallSent(EVENTS.CHANGE_PASSWORD, false)
      setClickEvent(EVENTS.CHANGE_PASSWORD, false)
      setCallError(EVENTS.CHANGE_PASSWORD, false, '')
      try {
        const payload = new FormData()
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
          }
        }
        payload.append('old_password', fields.oldPassword.value)
        const result = await post('/user/setting/change_password_otp', payload, config)
        if (result.status === 200) {
          setCallSent(EVENTS.GET_OTP, true)
        } else if (result.status === 400) {
          setCallError(EVENTS.GET_OTP, true, 'Invalid Password')
        }
      } catch (error) {
        console.log('error in sending OTP: ', error.response)
        setCallError(EVENTS.GET_OTP, true, error.response.data.message)
      }
    }
  }

  const preCheck = () => {
    const { oldPassword, newPassword, confirmPassword } = fields
    const { getOTP } = calls
    return oldPassword.value &&
      newPassword.value &&
      newPassword.validation &&
      (newPassword.value === confirmPassword.value) &&
      getOTP.sent
  }

  const gotoOTPScreen = (e) => {
    e.preventDefault()
    if (preCheck()) {
      setCalls(prev => {
        return {
          ...prev,
          OTPScreen: {
            isOpen: true
          }
        }
      })
    }
  }

  const sendChangePasswordReq = async (e) => {
    e.preventDefault()
    const { confirmPassword } = fields
    setClickEvent(EVENTS.CHANGE_PASSWORD, true)
    if (verificationCode.length === 6) {
      try {
        const payload = new FormData()
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
          }
        }
        payload.append('new_password', confirmPassword.value)
        payload.append('verification_code', verificationCode.join(''))
        const result = await post('/user/setting/change_password', payload, config)
        if (result.status === 200) {
          setCallSent(EVENTS.CHANGE_PASSWORD, true);
          fields.oldPassword.value = '';
          fields.newPassword.value = '';
          fields.confirmPassword.value = '';
          calls.OTPScreen.isOpen =false

        } else if (result.status === 400) {
          setCallError(EVENTS.CHANGE_PASSWORD, true, 'Invalid Verification Code')
        } else {
          setCallError(EVENTS.CHANGE_PASSWORD, true, result.response.data.message)
        }
      } catch (error) {
        console.log('error in change pass request: ', error.response)
        setCallError(EVENTS.CHANGE_PASSWORD, true, error.response.data.message)
      }
    } else {
      setCallError(EVENTS.CHANGE_PASSWORD, true, 'Please Enter 6 digit Verification code')
    }
  }

  const togglePasswordView = (e, field) => {
    e.preventDefault()
    let toggle = [...showPassword]
    toggle[field] = !showPassword[field]
    setShowPassword([...toggle])
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setFields({ ...initialFields })
    setCalls({ ...initialCalls })
  }

  return (
    <>
      {
        !calls.OTPScreen.isOpen &&
        <div className='change-password'>
          <div className='section-title'>
            <h6>Change Password</h6>
            <span className='tooltip-icon'>
              <OverlayTrigger
                key='mobile-tip'
                placement='top'
                overlay={
                  <Tooltip id='tooltip-mobile-tip'>
                    You can change your password
                  </Tooltip>
                }
              >
                <InfoIcon />
              </OverlayTrigger>
            </span>
          </div>
          <form onSubmit={gotoOTPScreen}>
            <div className='form-field'>
              <label className='form-label'>Old Password</label>
              <input
                type={showPassword[0] ? 'text' : 'password'}
                name='pass'
                className='form-input'
                placeholder='Enter Your Old Password'
                required
                value={fields.oldPassword.value}
                onChange={e => {
                  setFieldValue('oldPassword', e.target.value)
                  setCallSent(EVENTS.GET_OTP, false)
                  setCallError(EVENTS.GET_OTP, false)
                  setVerificationCode([])
                }}
                onBlur={e => {
                  const { value } = e.target
                  if (value) {
                    sendPasswordResetOTP(e)
                  }
                }}
              />
              <button className='toggle-password'>
                <img
                  src={showPassword[0] ? eyeOff : eye}
                  alt='view-password'
                  onClick={e => {
                    togglePasswordView(e, 0)
                  }}
                />
              </button>
              {(calls.getOTP.clickEvent && calls.getOTP.error) && <FieldValidationError message={calls.getOTP.message} />}
            </div>
            <div className='form-field'>
              <label className='form-label'>New Password</label>
              <input
                type={showPassword[1] ? 'text' : 'password'}
                name='pass'
                className='form-input'
                placeholder='Enter Your New Password'
                required
                value={fields.newPassword.value}
                onChange={e => {
                  setFieldValue('newPassword', e.target.value)
                  setFieldValidation('confirmPassword', true)
                  if(!e.target.value == ""){
                    setFieldValidation('newPassword', isStrongPassword(e.target.value, PASSWORD_RULES))

                  }
                }}
                // onBlur={e => setFieldValidation('newPassword', isStrongPassword(e.target.value, PASSWORD_RULES))}
              />
              <button className='toggle-password'><img src={showPassword[1] ? eyeOff : eye} alt='view-password' onClick={e => togglePasswordView(e, 1)} /></button>
              {!fields.newPassword.validation && <FieldValidationError message='Password should be minimum 8 characters long, with at-least one lowercase, uppercase, number and a symbol(like # or _).' />}
            </div>
            <div className='form-field'>
              <label className='form-label'>Confirm New Password</label>
              <input
                type={showPassword[2] ? 'text' : 'password'}
                name='pass'
                className='form-input'
                placeholder='Enter Your Confirm New Password'
                required
                value={fields.confirmPassword.value}
                onChange={e => {
                  setFieldValue('confirmPassword', e.target.value)
                  setFieldValidation('confirmPassword', true)
                }}
                onBlur={e => {
                  if (fields.newPassword.value !== fields.confirmPassword.value) {
                    setFieldValidation('confirmPassword', false)
                  }
                }}
              />
              <button className='toggle-password'><img src={showPassword[2] ? eyeOff : eye} alt='view-password' onClick={e => togglePasswordView(e, 2)} /></button>
              {!fields.confirmPassword.validation && <FieldValidationError message='Please retype the password correctly' />}
            </div>
            <div className='form-button'>
            <input className='button button-primary' type='submit' value='Send OTP' />
              <button className='button button-secondary' onClick={handleCancel}>Cancel</button>
              
            </div>
          </form>
        </div>
      }

      {
        calls.OTPScreen.isOpen &&
        <div className='card small-box'>
          <div className='card-body'>
            <Otp verificationCode={verificationCode} setVerificationCode={setVerificationCode} onSubmit={sendChangePasswordReq} sendOTPRequest={sendPasswordResetOTP} request={calls.changePassword} setCallError={setCallError} setClickEvent={setClickEvent} />
          </div>
        </div>
      }
    </>
  )
}

export default ChangePassword
