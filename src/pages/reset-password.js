import React, { useEffect, useState } from 'react'
import '../common/scss/pages/landing.scss'
import forgotPasswordVector from '../assets/images/forgot-password-vector.svg'
import { ReactComponent as CloseCircleLineIcon } from '../assets/images/close-circle-line.svg'
import { post } from '../libs/http-hydrate'
import Header from '../common/header'
import { useNavigate, useParams } from 'react-router-dom'
import { trim } from 'lodash'
import eye from '../assets/images/eye.svg'
import eyeOff from '../assets/images/eye-off-line.svg'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ReactComponent as InfoIcon } from '../assets/images/info.svg'
import { PASSWORD_RULES } from '../constants/password-rules'
import validator from 'validator'
import Auth from '../libs/auth'

export default function ResetPassword (props) {
  const { token } = useParams()
  const [fields, setFields] = useState({
    password: { value: '', show: false, isValid: true },
    confirmPassword: { value: '', show: false, isValid: true }
  })
  const [apiCall, setAPICall] = useState({ sent: false, error: '' })

  const navigate = useNavigate()
  useEffect(() => {
    const user = Auth.getCurrentUser()
    if (user && user.token) {
      navigate('/')
    }
  }, [])

  const clearFields = () => {
    setFields(prev => {
      return {
        ...prev,
        password: { value: '', show: false, isValid: true },
        confirmPassword: { value: '', show: false, isValid: true }
      }
    })
  }

  const validateInputs = (p, cp) => {
    console.log(p, cp, p === cp)
    if (p !== cp) {
      setFields(prev => {
        return {
          ...prev,
          confirmPassword: {
            ...prev.confirmPassword,
            isValid: false
          }
        }
      })
    } else if (!validator.isStrongPassword(p, PASSWORD_RULES)) {
      setFields(prev => {
        return {
          ...prev,
          password: {
            ...prev.password,
            isValid: false
          }
        }
      })
    } else if (p && cp) {
      return true
    }
  }

  const makeAPICall = async () => {
    try {
      const formdata = new FormData()
      formdata.append('password', fields.password.value)
      formdata.append('token', token)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const data = await post('/reset_password', formdata, config)
      //  const data = await dummyRequest({ status: 200 })
      if (data.status === 200) {
        clearFields()
        setAPICall(prev => {
          return {
            ...prev,
            sent: true,
            error: ''
          }
        })
      } else {
        setAPICall(prev => {
          return {
            ...prev,
            sent: false,
            error: 'Please try again after sometime.'
          }
        })
      }
    } catch (error) {
      setAPICall(prev => {
        return {
          ...prev,
          sent: false,
          error: 'Email link expired.'
        }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let { password, confirmPassword } = fields
    password = trim(password.value)
    confirmPassword = trim(confirmPassword.value)

    if (validateInputs(password, confirmPassword)) {
      await makeAPICall()
    }
  }

  const togglePasswordView = (e, fieldId) => {
    e.preventDefault()
    if (fieldId === 1) {
      setFields(prev => {
        return {
          ...prev,
          password: {
            ...prev.password,
            show: !prev.password.show
          }
        }
      })
    } else if (fieldId === 2) {
      setFields(prev => {
        return {
          ...prev,
          confirmPassword: {
            ...prev.confirmPassword,
            show: !prev.confirmPassword.show
          }
        }
      })
    }
  }

  return (
    <>
      <Header login />
      <div className='landing-page forgot-page'>
        <div className='container-fluid'>
          <div className='landing-page--left'>
            <div className='heading'>
              <h4>
                Reset Password?
              </h4>
              <h5>
                Enter new password and re-type the same
                in the field below.
              </h5>
            </div>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <div className='form-field'>
                  <label className='form-label'>Enter New Password<span className='mendatory'>*</span>
                    <span className='tooltip-icon'>
                      <OverlayTrigger
                        key='password-tip'
                        placement='top'
                        overlay={
                          <Tooltip id='tooltip-password-tip'>
                            Password should be minimum 8 characters long, with at-least one lowercase, uppercase, number and a symbol(like # or _).
                          </Tooltip>
                        }
                      >
                        <InfoIcon />
                      </OverlayTrigger>
                    </span>
                  </label>
                  <input
                    type={fields.password.show ? 'text' : 'password'}
                    name='new-password'
                    className='form-input'
                    placeholder='Enter new password'
                    value={fields.password.value}
                    onChange={e => {
                      const { value } = e.target
                      setFields(prev => {
                        return {
                          ...prev,
                          password: {
                            ...prev.password,
                            value
                          }
                        }
                      })
                    }}
                    onFocus={e => {
                      setFields(prev => {
                        return {
                          ...prev,
                          password: {
                            ...prev.password,
                            isValid: true
                          }
                        }
                      })
                    }}
                    onBlur={e => {
                      const { value } = e.target
                      setTimeout(() => {
                        setFields(prev => {
                          return {
                            ...prev,
                            password: {
                              ...prev.password,
                              isValid: validator.isStrongPassword(trim(value), PASSWORD_RULES)
                            }
                          }
                        })
                      }, 500)
                    }}
                    onInvalid={e => e.target.setCustomValidity('Please enter new password')}
                    onInput={e => e.target.setCustomValidity('')}
                    required
                  />
                  <button className='toggle-password'>
                    <img src={fields.password.show ? eyeOff : eye} alt='view-password' onClick={e => togglePasswordView(e, 1)} />
                  </button>
                  {!fields.password.isValid && <p className='error-message'> <CloseCircleLineIcon />Enter a valid password</p>}
                </div>
                <div className='form-field'>
                  <label className='form-label'>Confirm New Password<span className='mendatory'>*</span>
                  </label>
                  <input
                    type={fields.confirmPassword.show ? 'text' : 'password'}
                    name='confirm-password'
                    value={fields.confirmPassword.value}
                    className='form-input'
                    placeholder='Please re-enter new password'
                    onChange={e => {
                      const { value } = e.target
                      setFields(prev => {
                        return {
                          ...prev,
                          confirmPassword: {
                            ...prev.confirmPassword,
                            value
                          }
                        }
                      })
                    }}
                    onFocus={e => {
                      setFields(prev => {
                        return {
                          ...prev,
                          confirmPassword: {
                            ...prev.confirmPassword,
                            isValid: true
                          }
                        }
                      })
                    }}
                    onInvalid={e => e.target.setCustomValidity('Please re-enter new password')}
                    onInput={e => e.target.setCustomValidity('')}
                    required
                  />
                  <button className='toggle-password'>
                    <img src={fields.confirmPassword.show ? eyeOff : eye} alt='view-confirmed-password' onClick={e => togglePasswordView(e, 2)} />
                  </button>
                </div>
                <div className='form-button'>
                  <input
                    className={`button ${apiCall.sent ? 'button-green' : 'button-primary'}`}
                    type='submit'
                    value={apiCall.sent ? 'Your password has been reset!' : 'Submit'}
                  />
                </div>
                {!fields.confirmPassword.isValid && <p className='error-message'> <CloseCircleLineIcon />Passwords don't match!</p>}
                {apiCall.error && <p className='error-message'> <CloseCircleLineIcon />{apiCall.error}</p>}
              </form>
              <div className='signup-link'>
                Return to{' '}
                <a href='/' className='color-primary'>
                  Login
                </a>
              </div>
            </div>
          </div>
          <div className='landing-page--right'>
            <img src={forgotPasswordVector} alt='forgotPasswordVector' />
          </div>
        </div>
      </div>
    </>
  )
}
