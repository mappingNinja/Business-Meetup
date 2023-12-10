import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/settings.scss'
import Header from '../common/header'
import EditProfile from '../assets/images/edit-profile.png'
import ChangePasswordIcon from '../assets/images/change-password.png'
import ProfileForm from '../assets/images/profile-form.png'
import ThemeIcon from '../assets/images/theme.png'
import BlockUser from '../assets/images/block-user.png'
import DeleteUser from '../assets/images/delete-user.png'
import { ReactComponent as ArrowDownIcon } from '../assets/images/arrow-down.svg'
import ChangeTheme from '../components/settings/change-theme'
import BockedUsers from '../components/settings/blocked-users'
import PreFilledForm from '../components/settings/pre-filled-form'
import DeleteAccount from '../components/settings/delete-deactivate'
import AddCompanyDetails from '../components/settings/add-company-details'
import AddPaymentDetails from '../components/settings/add-payment-details'
import AddContactDetails from '../components/settings/add-contact-details'
import AddCreditPolicy from '../components/settings/add-credit-policy'
import ChangePassword from '../components/settings/change-password'
import Auth from '../libs/auth'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const SETTINGS = {
  EDIT_PROFILE: 'ep',
  CHANGE_PASSWORD: 'cp',
  PREFILLED_FORMS: 'pf',
  THEME: 'th',
  BLOCKED_USERS: 'bu',
  DELETE_ACCOUNT: 'da'
}
function Settings () {
  const [activeSetting, setActiveSetting] = useState(SETTINGS.CHANGE_PASSWORD)
  const location = useLocation();

  const navigate = useNavigate()
  useEffect(() => {
    const user = Auth.getCurrentUser()
    if (!user) {
      navigate('/')
    }

    if(location?.state?.PreFilled === "true")
    {
      setActiveSetting(SETTINGS.PREFILLED_FORMS);
    }
  }, [])
  const changeSetting = (e, page) => {
    e.preventDefault()
    setActiveSetting(page)
  }

  return (
    <>
      <Header home />

      <div className='grey-bg'>
        <div className='container-fluid'>
          <div className='layout-grid-box-column2'>
            <div className='layout-grid layout-grid--left'>
              <div className='sidebar-title'>
                <h6>Settings</h6>
                <a className='collapse-button mobile-view' data-toggle='collapse' href='#collapseSidebar' role='button' aria-expanded='false' aria-controls='collapseSearch'><ArrowDownIcon /></a>
              </div>
              <div className='card sidebar-nav collapse desktop-view' id='collapseSidebar'>
                <ul active={activeSetting}>
                  <li name='ep' className='sidebar-nav--item'><Link to={'/edit-profile'}><span className='icon'><img src={EditProfile} alt='edit profile' /></span>Edit profile</Link></li>
                  <li name='cp' className={'sidebar-nav--item ' + (activeSetting === SETTINGS.CHANGE_PASSWORD ? 'active' : '')}>
                    <Link to={''} onClick={(e) => changeSetting(e, SETTINGS.CHANGE_PASSWORD)}>
                      <span className='icon'><img src={ChangePasswordIcon} alt='change password' /></span>Change password
                    </Link>
                  </li>
                  <li name='pf' className={'sidebar-nav--item ' + (activeSetting === SETTINGS.PREFILLED_FORMS ? 'active' : '')}>
                    <Link to={''} onClick={(e) => changeSetting(e, SETTINGS.PREFILLED_FORMS)}>
                      <span className='icon'><img src={ProfileForm} alt='pre-filled form details' /></span>Manage Prefilled Forms
                    </Link>
                  </li>
                  <li name='th' className={'sidebar-nav--item ' + (activeSetting === SETTINGS.THEME ? 'active' : '')}>
                    <Link to={''} onClick={(e) => changeSetting(e, SETTINGS.THEME)}>
                      <span className='icon'><img src={ThemeIcon} alt='change theme' /></span>Theme
                    </Link>
                  </li>
                  <li name='bu' className={'sidebar-nav--item ' + (activeSetting === SETTINGS.BLOCKED_USERS ? 'active' : '')}>
                    <Link to={''} onClick={(e) => changeSetting(e, SETTINGS.BLOCKED_USERS)}>
                      <span className='icon'><img src={BlockUser} alt='blocked users' /></span>Blocked user list
                    </Link>
                  </li>
                  <li name='da' className={'sidebar-nav--item ' + (activeSetting === SETTINGS.DELETE_ACCOUNT ? 'active' : '')}>
                    <Link to={''} onClick={(e) => changeSetting(e, SETTINGS.DELETE_ACCOUNT)}>
                      <span className='icon'><img src={DeleteUser} alt='delete user' /></span>Delete or Deactivate Account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='layout-grid layout-grid--main'>
              <div className={'card ' + (activeSetting === SETTINGS.CHANGE_PASSWORD ? 'small-box' : '') + (activeSetting === SETTINGS.THEME ? 'small-box' : '') + (activeSetting === SETTINGS.BLOCKED_USERS ? 'small-box' : '') + (activeSetting === SETTINGS.DELETE_ACCOUNT ? 'small-box' : '')}>
                <div className='card-body'>
                  {
                    activeSetting === SETTINGS.CHANGE_PASSWORD &&
                    <>
                      <ChangePassword />
                    </>
                  }
                  {
                    activeSetting === SETTINGS.THEME && <ChangeTheme />
                  }
                  {
                    activeSetting === SETTINGS.BLOCKED_USERS && <BockedUsers />
                  }
                  {
                    activeSetting === SETTINGS.PREFILLED_FORMS && <>
                      <PreFilledForm />
                    
                     
                     
                     
                    </>
                  }
                  {
                    activeSetting === SETTINGS.DELETE_ACCOUNT &&
                    <>
                      <DeleteAccount />
                    </>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
