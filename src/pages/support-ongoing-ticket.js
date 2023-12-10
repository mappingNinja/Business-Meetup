import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/settings.scss'
import '../common/scss/pages/support.scss'
import Header from '../common/header'
import { ReactComponent as ArrowDownIcon } from '../assets/images/arrow-down.svg'
import { ReactComponent as AttachmentIcon } from '../assets/images/attachment.svg'
import logoSmall from "../assets/images/logo-small.svg";
import { ReactComponent as MoreIcon } from "../assets/images/more-icon.svg";
import { ReactComponent as SendIcon } from "../assets/images/send-icon.svg";
import { ReactComponent as FilterIcon } from "../assets/images/filter-icon.svg";
import { ReactComponent as SearchIcon } from '../assets/images/search-icon.svg'
import profilePic from "../assets/images/profile.png";
import { Link, useNavigate } from 'react-router-dom';
function SupportOngoing () {
  return (
    <>
      <Header home />

      <div className='grey-bg'>
        <div className='container-fluid support-page'>
          <div className='layout-grid-box-column2 '>
            
            <div className='layout-grid layout-grid--left'>
              
              <div className='card sidebar-nav support-sidebar'>
              <div className='sidebar-title'>
                <div className='ticket-head'>
                  <div className='ticket-head--top'>
                  <div className="tabs tabs--solid">
                      <ul>
                        <li className="active">
                        <Link to={'/support-ongoing-ticket'}>Ongoing</Link>
                        </li>
                        <li>
                          <a href="">Closed Ticket</a>
                        </li>
                      </ul>
                    </div>
                    <button className='filter-btn'><FilterIcon /></button>
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
                  <li className='sidebar-nav--item active'>
                    <div className='ticket-item'><div className='ticket-name'>My Ad Not Publish<span>Ad ID: #23435345346</span></div><div className='ticket-time'>10th jan 2021</div></div>
                    </li>
                  <li className='sidebar-nav--item'>
                  <div className='ticket-item'><div className='ticket-name'>Purchase Invoice Not Gernrate<span>Order ID: #23435345346</span></div><div className='ticket-time'>10th jan 2021</div></div>
                  </li>
                </ul>
                </div>
              </div>
            </div>
            <div className='layout-grid layout-grid--main'>
              <div className='card'>
                <div className='card-body p-0'>
                  <div className='chat-header'>
                    <div className='logo'><img src={logoSmall} />BusiMeet Support</div>
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
                        <p>Subject: Other</p>
                        <p>Question: My Ad Not Publish</p>
                        <p>Discription: NA</p>
                      </div>
                      <div className='time'>10:13 AM</div>
                    </div>
                    <div className='receiver'>
                    <div className='profile-pic'><img src={profilePic} /></div>
                      <div className='profile'>
                        
                        <div className='message'>
                        <p>Hey! 👋 Ankit Please Provide me Your AD ID</p>
                      </div>
                      <div className='time'>10:13 AM</div>
                      </div>
                    </div>
                    <div className='sender'>
                      <div className='message'>
                        <p>#234232525252522</p>
                      </div>
                      <div className='time'>10:15 AM</div>
                    </div>
                    <div className='receiver'>
                    <div className='profile-pic'><img src={profilePic} /></div>
                      <div className='profile'>
                        
                        <div className='message'>
                        <p>Ok Thanks We are Checking With Your issue.</p>
                      </div>
                      <div className='time'>10:20 AM</div>
                      </div>
                    </div>
                    <div className='receiver'>
                    <div className='profile-pic'><img src={profilePic} /></div>
                      <div className='profile'>
                        
                        <div className='message'>
                        <p>Now Your Ad Publish and Sorry For Facing This Type of Issue.</p>
                      </div>
                      <div className='time'>10:25 AM</div>
                      </div>
                    </div>
                    <div className='sender'>
                      <div className='message'>
                        <p>Thanks</p>
                      </div>
                      <div className='time'>10:15 AM</div>
                    </div>
                  </div>
                </div>
                <div className='card-footer send-message'>
                  <div className='chat-box'>
                    <input type='text' className='form-input' placeholder='Type Meassage' />
                    <div className='attach-btn'><AttachmentIcon /></div>
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

export default SupportOngoing
