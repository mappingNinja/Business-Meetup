import React, { useState } from 'react'
import '../../../common/scss/pages/settings.scss'
import ContinueToPassword from './continue-to-password'
import { ReactComponent as DownloadIcon } from '../../../assets/images/download-icon.svg'

const TYPES = {
  DELETE: 'delete',
  DEACTIVATE: 'deactivate'
}
const initialState = {
  type: TYPES.DEACTIVATE,
  step2: false,
  OTPVerified: false,
  PasswordVerified: false
}

function DeleteAccount () {
  const [state, setState] = useState(initialState)

  const changeState = (field, value) => {
    setState(prev => {
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const handleContinue = (e) => {
    e.preventDefault()
    changeState('step2', true)
  }

  return (
    <>
      {
        !state.step2 &&
        <div className='delete-account'>
          <div className='section-title'><h6>Delete or Deactivate Account </h6></div>
          <form>
            <div className='form-field'>
              <input type='radio' name='delete_account' id='deactivate_account' defaultChecked={state.type === TYPES.DEACTIVATE} onChange={e => changeState('type', TYPES.DEACTIVATE)} />
              <label htmlFor='deactivate_account'>
                <h6>Deactivate Account</h6>
                <p className='sub-heading'>This can be temporary.</p>
                <p>Your account will be disabled and your name and photos will be removed from most things you've shared.</p>
              </label>
            </div>
            <div className='form-field'>
              <input type='radio' name='delete_account' id='delete_account' defaultChecked={state.type === TYPES.DELETE} onChange={e => changeState('type', TYPES.DELETE)} />
              <label htmlFor='delete_account'>
                <h6>Delete account</h6>
                <p className='sub-heading'>This is permanent.</p>
                <p>When you delete your BusiMeet account, you won't be able to retrieve the content or information you've shared on BusiMeet. Your Deals and all of your Conversation will also be deleted.</p>
              </label>
            </div>

            <div className='form-button'>
              <button className='button button-primary' onClick={handleContinue}>Continue</button>
            </div>
          </form>
        </div>
      }
      {
        state.type === TYPES.DEACTIVATE &&
        state.step2 &&
        <ContinueToPassword changeParentState={changeState} parentState={state}>
          <div className='section-title'><h6>Please enter your password to continue</h6></div>
          <p>The page you are trying to visit requires that you re-enter your password.</p>
        </ContinueToPassword>
      }
      {
        state.type === TYPES.DELETE &&
        state.step2 &&
        <ContinueToPassword changeParentState={changeState} parentState={state}>
          <>
            <div className='section-title'><h6>Permanently delete account</h6></div>
            <p>If you want to permanently delete your BusiMeet account, let us know. Once the deletion process begins, you won't be able to reactivate your account or retrieve any of the content or information you have added.</p>
            {/*<div className='download-info'>
              <div className='icon'><DownloadIcon /></div>
              <div className='info'>
                <h6>Download your information</h6>
                <p>You have 677 product, 1.3K posts and more uploaded to BusiMeet. You can download this content before it's permanently deleted along with your account</p>
              </div>
              <button className='button button-blue button-download'>Download Info</button>
      </div>*/}
          </>
        </ContinueToPassword>
      }
    </>
  )
}

export default DeleteAccount
