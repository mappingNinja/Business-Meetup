import React from 'react'
import '../../common/scss/pages/settings.scss'
import FieldValidationError from '../error-messages/field-validation-error'
import OTPInputs from '../OTPInputs'

function Otp (props) {
  const {
    verificationCode,
    setVerificationCode,
    onSubmit,
    request,
    setCallError,
    sendOTPRequest,
    setClickEvent
  } = props

  return (
    <>
      <div className='otp-section'>
        <div className='section-title'><h6>Enter OTP For Change Password</h6></div>
        <p>We have sent OTP on your Registered Email Address</p>
        <form onSubmit={onSubmit}>
          <OTPInputs
            verificationCode={verificationCode}
            setCallError={setCallError}
            setClickEvent={setClickEvent}
            setVerificationCode={setVerificationCode}
          />
          <div className='form-button'>
            <button className='button button-blue' onClick={sendOTPRequest}>Resend OTP</button>
            <input
              className={'button' + (request.clickEvent ? (request.error ? ' button-red' : ' button-green') : ' button-primary')}
              type='submit'
              value={request.clickEvent ? (request.error ? 'Try Again' : 'Password Changed!') : 'Submit'}
            />
          </div>
          {(request.clickEvent && request.error) && <FieldValidationError message={request.message} />}
        </form>
      </div>
    </>
  )
}

export default Otp
