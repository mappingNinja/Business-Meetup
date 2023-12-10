import { useContext, useState } from 'react'
import '../common/scss/pages/landing.scss'
import landingVector from '../assets/images/landing-vector.svg'
import eye from '../assets/images/eye.svg'
import eyeOff from '../assets/images/eye-off-line.svg'
import isEmail from 'validator/lib/isEmail'
import Auth from '../libs/auth'
import { AuthContext } from '../context/Auth.context'
import { ReactComponent as CloseCircleLineIcon } from '../assets/images/close-circle-line.svg'
import Header from '../common/header'
import { trim } from 'lodash'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const LOGIN = {
  INITIAL: 'on login screen',
  LOGGED_IN: 'logged in',
  LOADING: 'loading',
  ERROR: 'error'
}

function Login () {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [validation, setValidation] = useState({ email: true, password: true })
  const [login, setLogin] = useState({ status: LOGIN.INITIAL, error: undefined })
  const {
    setIsLoggedIn
  } = useContext(AuthContext)

  const togglePasswordView = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = trim(e.target.uname.value)
    const password = trim(e.target.pass.value)

    setValidation(prev => {
      return {
        ...prev,
        email: isEmail(email),
        password
      }
    })
    const errorHandler = (response) => {
      console.log('in error handler: ', response)
      if (response.status === 401) {
        setLogin({ status: LOGIN.ERROR, error: new Error('Your email address or password is incorrect') })
      } else {
        setLogin({ status: LOGIN.ERROR, error: new Error("Sorry! we can't process your request. Please try again after some time!") })
      }
    }

    if (isEmail(email) && password) {
      setLogin(prev => { return { ...prev, status: LOGIN.LOADING } })
      const formdata = new FormData()
      formdata.append('email', email)
      formdata.append('password', password)
      try {
        const response = await Auth.login(formdata)
        if (response.status === 200) {
          setIsLoggedIn(true)
          setLogin(prev => { return { ...prev, status: LOGIN.LOGGED_IN } })
          navigate("/")
        } else {
          errorHandler(response)
        }
      } catch (error) {
        console.log('in catch error: ', error)
        errorHandler(error)
      }
    } else {
      console.log('validation error')
    }
  }

  return (
    <>
      <Header login />
      <div className='landing-page'>
        <div className='container-fluid'>
          <div className='landing-page--left'>
            <div className='heading'>
              <h4>
                Welcome to <span className='color-primary'>Business Social Media !</span>{' '}
              </h4>
              <h5>
                Login to join network of the largest business community
              </h5>
            </div>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <div className='form-field'>
                  <label className='form-label'>Enter your email id</label>
                  <input
                    type='text'
                    name='uname'
                    className='form-input'
                    placeholder='Enter your email id'
                    onFocus={e => {
                      (login.status === LOGIN.ERROR) && setLogin(prev => { return { ...prev, status: LOGIN.INITIAL } })
                      !validation.email && setValidation(prev => { return { ...prev, email: true } })
                    }}
                    onInvalid={e => e.target.setCustomValidity('Please enter your email address')}
                    onInput={e => e.target.setCustomValidity('')}
                    required
                  />
                  {!validation.email && <p className='error-message'> <CloseCircleLineIcon />Enter a valid email</p>}
                </div>
                <div className='form-field'>
                  <label className='form-label'>Enter Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='pass'
                    className='form-input'
                    placeholder='Enter your password'
                    onFocus={e => {
                      (login.status === LOGIN.ERROR) && setLogin(prev => { return { ...prev, status: LOGIN.INITIAL } })
                      !validation.email && setValidation(prev => { return { ...prev, email: true } })
                    }}
                    onInvalid={e => e.target.setCustomValidity('Please enter password')}
                    onInput={e => e.target.setCustomValidity('')}
                    required
                  />
                  <button className='toggle-password'>
                    <img src={showPassword ? eyeOff : eye} alt='view-password' onClick={togglePasswordView} />
                  </button>
                  <div className='forgot-link'>
                    <Link to={'/forgot-password'} className='color-primary'>
                      Forgot Password?
                    </Link>
                  </div>
                  {!validation.password && <p className='error-message'> <CloseCircleLineIcon />Enter a valid password</p>}
                  {(login.status === LOGIN.ERROR) && <p className='error-message'> <CloseCircleLineIcon /> {login.error.message}</p>}
                </div>
                <div className='form-button'>
                  <input
                    className='button button-primary'
                    type='submit'
                    value={(login.status === LOGIN.LOADING) ? 'Loading...' : 'Sign In'}
                  />
                </div>
              </form>
              <div className='signup-link'>
                New to BusiMeet?{' '}
                <Link to={'/signup'} className='color-primary'>
                  JoinNow
                </Link>
              </div>
            </div>
          </div>
          <div className='landing-page--right'>
            <img src={landingVector} alt='landing_vector' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
