import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/settings.scss'
import '../common/scss/pages/support.scss'
import '../common/scss/pages/short-order.scss'
import Header from '../common/header'
import { ReactComponent as ArrowDownIcon } from '../assets/images/arrow-down.svg'
import { ReactComponent as AttachmentIcon } from '../assets/images/attachment.svg'
import { ReactComponent as EmojiIcon } from '../assets/images/emoji.svg'
import TeslaIcon from "../assets/images/tesla-icon.jpg";
import logoSmall from "../assets/images/logo-small.svg";
import { ReactComponent as MoreIcon } from "../assets/images/more-icon.svg";
import { ReactComponent as SendIcon } from "../assets/images/send-icon.svg";
import { ReactComponent as FilterIcon } from "../assets/images/filter-icon.svg";
import { ReactComponent as SearchIcon } from '../assets/images/search-icon.svg'
import profilePic from "../assets/images/profile.png";
import { Link, useNavigate } from 'react-router-dom';
function ChatRoom () {
  return (
    <>
      <Header home />

      <div className='grey-bg'>
        <div className='container-fluid support-page chat-room'>
        <div className='page-title'>
              <h6>Meeting Room</h6>
              <div className='btn-wrap'>
                <button className='button button-blue'>Form Filled: 10</button>
                <button className='button button-primary'>Recent Chat: 10</button>
                <button className='button button-green button-online'>Online User: 10</button>
              </div>
            </div>
          <div className='layout-grid-box-column2 '>
            
            <div className='layout-grid layout-grid--left'>
              
              <div className='card sidebar-nav support-sidebar chat-room-sidebar'>
              <div className='sidebar-title'>
                <div className='ticket-head'>
                  <div className='ticket-head--top'>
                  <div className="tabs tabs--solid">
                      <ul>
                        <li className="active">
                        <Link to={'/support-ongoing-ticket'}>Recent Chat</Link>
                        </li>
                        <li>
                          <a href="">Online User</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                </div>
                <a className='collapse-button mobile-view collapsed' data-toggle='collapse' href='#collapseSidebar' role='button' aria-expanded='false' aria-controls='collapseSearch'><ArrowDownIcon /></a>
              </div>
                <div className='tickets-list collapse desktop-view' id='collapseSidebar'>
                <div className='search-box'>
                  <input type='text' className='form-input' placeholder='Search' />
                  <button className='search-button'><SearchIcon /></button>
                </div>
                <ul>
                  <li className='sidebar-nav--item'>
                    <div className="user-profile">
                      <div className="user-profile-image">
                        <img src={profilePic} className="profile-pic" />
                      </div>
                      <div className="user-profile-content">
                        <div className="user-profile-name">
                          <h6>Ravi Panchal</h6>
                          <p>
                            <img src={TeslaIcon} />
                            Tesla
                          </p>
                        </div>
                        <button className="button button-primary button-online">
                          Online
                        </button>
                      </div>
                    </div>  
                  </li>
                  <li className='sidebar-nav--item'>
                  <div className="user-profile">
                      <div className="user-profile-image">
                        <img src={profilePic} className="profile-pic" />
                      </div>
                      <div className="user-profile-content">
                        <div className="user-profile-name">
                          <h6>Ravi Panchal</h6>
                          <p>
                            <img src={TeslaIcon} />
                            Tesla
                          </p>
                        </div>
                        <button className="button button-primary button-online">
                          Online
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className='sidebar-nav--item'>
                  <div className="user-profile">
                      <div className="user-profile-image">
                        <img src={profilePic} className="profile-pic" />
                      </div>
                      <div className="user-profile-content">
                        <div className="user-profile-name">
                          <h6>Ravi Panchal</h6>
                          <p>
                            <img src={TeslaIcon} />
                            Tesla
                          </p>
                        </div>
                        <button className="button button-primary button-offline">
                          Offline
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className='sidebar-nav--item'>
                  <div className="user-profile">
                      <div className="user-profile-image">
                        <img src={profilePic} className="profile-pic" />
                      </div>
                      <div className="user-profile-content">
                        <div className="user-profile-name">
                          <h6>Ravi Panchal</h6>
                          <p>
                            <img src={TeslaIcon} />
                            Tesla
                          </p>
                        </div>
                        <button className="button button-primary button-offline">
                        Offline
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                </div>
              </div>
            </div>
            <div className='layout-grid layout-grid--main'>
              <div className='card'>
                <div className='card-body p-0'>
                  <div className='chat-header'>
                    <div className="user-profile">
                      <div className="user-profile-image">
                        <img src={profilePic} className="profile-pic" />
                        <span className='status online'></span>
                      </div>
                      <div className="user-profile-content">
                        <div className="user-profile-name">
                          <h6>Ravi Panchal <span className='followers'>10k Follower</span></h6>
                          <p>
                            <img src={TeslaIcon} />
                            Tesla
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='search-box'>
                      <input type='text' className='form-input' placeholder='Search Chat' />
                      <button className='search-button'><SearchIcon /></button>
                    </div>
                    <div className="more-btn">
                            <div className="nav-item dropdown account-dropdown">
                              <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <MoreIcon />
                              </a>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                              >
                                <a className="dropdown-item" href="#">
                                  Report
                                </a>
                              </div>
                            </div>
                          </div>
                  </div>
                  <div className='chat-body'>
                    <div className='sender'>
                      <div className='message'>
                        <p>Hey! 👋 How are you doing today? What you been up to?</p>
                      </div>
                      <div className='time'>10:13 AM</div>
                    </div>
                    <div className='receiver'>
                    <div className='profile-pic'><img src={profilePic} /></div>
                      <div className='profile'>
                      <div className='message'>
                        <p>Hey! 👋 Ankit Please Provide me Your AD ID</p>
                      </div>
                        <div className='message'>
                        <p>Hey! 👋 Ankit Please Provide me Your AD ID</p>
                      </div>
                      <div className='time'>10:13 AM</div>
                      </div>
                    </div>
                    <div className='sender'>
                      <div className='message'>
                        <p>Hey! 👋 How are you doing today? What you been up to?</p>
                      </div>
                      <div className='time'>10:15 AM</div>
                    </div>
                    <div className='receiver'>
                    <div className='profile-pic'><img src={profilePic} /></div>
                      <div className='profile'>
                        
                        <div className='message'>
                        <p>Hey! 👋 How are you doing today? What you been up to?</p>
                      </div>
                      <div className='time'>10:20 AM</div>
                      </div>
                    </div>
                    <div className='receiver'>
                    <div className='profile-pic'><img src={profilePic} /></div>
                      <div className='profile'>
                        
                        <div className='message'>
                        <p>Hey! 👋 How are you doing today? What you been up to?</p>
                      </div>
                      <div className='time'>10:25 AM</div>
                      </div>
                    </div>
                    <div className='sender'>
                      <div className='message'>
                        <p>Hey! 👋 How are you doing today? What you been up to?</p>
                      </div>
                      <div className='time'>10:15 AM</div>
                    </div>
                  </div>
                </div>
                <div className='card-footer send-message'>
                  <div className='chat-box'>
                    <input type='text' className='form-input' placeholder='Type Meassage' />
                    <div className='emoji-btn'><EmojiIcon /></div>
                    <div className='attach-btn'><AttachmentIcon /></div>
                    <div className="tags">
                      <span className="tag">Company Details</span>
                      <span className="tag">Bank Details</span>
                      <span className="tag">Credit Policy</span>
                      <span className="tag">Contact Info</span>
                      <span className="tag">Docket Details</span>
                      <span className="tag">Other Attachments</span>
                    </div>
                  </div>
                  <button className='button button-primary'><SendIcon /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatRoom
