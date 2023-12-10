import { useContext, useState } from 'react'
import eye from '../../../assets/images/eye.svg'
import eyeOff from '../../../assets/images/eye-off-line.svg'
import '../../../common/scss/pages/settings.scss'
import { ReactComponent as DownloadIcon } from '../../../assets/images/download-icon.svg'

function PermanentlyDeleteAccount () {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordView = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }
  return (
    <>
      <div className='delete-account'>
        <form>
          <div className='form-field'>
            <label className='form-label'>Password</label>
            <input type={showPassword ? 'text' : 'password'} name='pass' className='form-input' placeholder='Enter Your Password' required />
            <button className='toggle-password'><img src={showPassword ? eyeOff : eye} alt='view-password' onClick={togglePasswordView} /></button>
          </div>
          <div className='form-button'>
            <button className='button button-primary' data-toggle="modal" data-target="#deleteModal">Delete</button>
          </div>
        </form>
        <div className="modal fade delete-modal" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete Your Account</h5>
                <p>We’re sorry to see you go.</p>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className='alert alert--highlight'>
                  <p>Also you can still recover your account by sending us email on <a href='mailto:busimeetsupport@gmail.com'>busimeetsupport@gmail.com</a> after 30 days all data will be permemntaly removed from server.</p>
                </div>
                {/* <OTPInputs
                  verificationCode={verificationCode}
                  setCallError={setCallError}
                  setClickEvent={setClickEvent}
                  setVerificationCode={setVerificationCode}
                /> */}
              </div>
              <div className="modal-footer">
                <button type="button" className="button button-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="button button-primary">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default PermanentlyDeleteAccount
