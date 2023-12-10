import '../common/scss/pages/landing.scss'
import forgotPasswordVector from '../assets/images/forgot-password-vector.svg'
import { ReactComponent as CloseCircleLineIcon } from '../assets/images/close-circle-line.svg'
import { useEffect, useState } from 'react'
import { post } from '../libs/http-hydrate'
import Header from '../common/header'
import isEmail from 'validator/lib/isEmail'
import Auth from '../libs/auth'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPassword () {
  const [validation, setValidation] = useState({ email: true })
  const [error, setError] = useState({ status: false, message: '' })
  const [linkSent, setLinkSent] = useState(false)
  const REFRESH_TIME = 10
  const [refreshTimer, setRefreshTimer] = useState(REFRESH_TIME)
  const navigate = useNavigate()

  useEffect(() => {
    const user = Auth.getCurrentUser()
    if (user && user.token) {
      navigate('/')
    }
  })

  const startRefreshTimer = () => {
    let count = refreshTimer
    const timer = setInterval(() => {
      count--
      setRefreshTimer(count)
      if (count < 0) {
        clearInterval(timer)
        setRefreshTimer(REFRESH_TIME)
        setLinkSent(false)
      }
    }, 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    document.getElementById('forgot_button').value = 'Please Wait...'
    const errorHandler = (response) => {
      if (response.status === 400) {
        setError({
          status: true,
          message: `We couldn't find an account associated with ${email}. Please try with an alternate email address.`
        })
      } else {
        setError({
          status: true,
          message: "Sorry! we can't process your request. Please try again after some time!"
        })
      }
    }

    if (!linkSent) {
      if (isEmail(email)) {
        try {
          const formdata = new FormData()
          formdata.append('email', email)
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          const data = await post('/forgot_password', formdata, config)
          //  const data = await dummyRequest({ status: 200 })
          if (data.status === 200) {
            setLinkSent(true)
            startRefreshTimer()
          } else {
            errorHandler(data)
          }
        } catch (error) {
          errorHandler(error.response)
        }
      } else {
        linkSent && setValidation({ email: false })
      }
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
                Trouble Logging In?
              </h4>
              <h5>
                Enter your email and we’ll send you a link
                to get back into your account.
              </h5>
            </div>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <div className='form-field'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    name='email'
                    className='form-input'
                    required
                    onInvalid={e => e.target.setCustomValidity('Please enter your email address')}
                    onInput={e => e.target.setCustomValidity('')}
                    placeholder='Enter your registered email'
                    onFocus={e => {
                      !validation.email && setValidation({ email: true })
                      error.status && setError({ status: false, message: '' })
                    }}
                  />
                  {!validation.email && <p className='error-message'> <CloseCircleLineIcon />Please enter a valid email</p>}
                </div>
                <div className='form-button'>
                  <input
                    id='forgot_button'
                    className={`button mb-3 ${linkSent ? 'button-green' : 'button-primary'}`}
                    type='submit'
                    value={linkSent ? "We've sent the password reset email!" : 'Send Link'}
                  />
                  {linkSent && <p>you can resend the link after {refreshTimer} seconds...</p>}
                </div>
                {error.status && <p className='error-message'> <CloseCircleLineIcon />{error.message}</p>}
              </form>
              <div className='signup-link'>
                Return to{' '}
                <Link to={'/'} className='color-primary'>
                  Login
                </Link>
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

export default ForgotPassword
