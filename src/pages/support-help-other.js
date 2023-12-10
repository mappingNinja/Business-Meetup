import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/settings.scss'
import '../common/scss/pages/support.scss'
import Header from '../common/header'
import { ReactComponent as ArrowDownIcon } from '../assets/images/arrow-down.svg'
import { ReactComponent as SearchIcon } from '../assets/images/search-icon.svg'
import ProductImage from '../assets/images/product-image1.png'
import CompanyLogo from '../assets/images/company-logo.png'
import { Link, useNavigate } from 'react-router-dom';
function SupportOther () {
  return (
    <>
      <Header home />

      <div className='grey-bg'>
        <div className='container-fluid support-page'>
        <div className='page-title'>
              <h6>BusiMeet Help Center | 24x7 Customer Care Support</h6>
            </div>
          <div className='layout-grid-box-column2 '>
            
            <div className='layout-grid layout-grid--left'>
              
              <div className='card sidebar-nav support-sidebar'>
              <div className='sidebar-title'>
                <h6>TYPE OF ISSUE</h6>
                <a className='collapse-button mobile-view' data-toggle='collapse' href='#collapseSidebar' role='button' aria-expanded='false' aria-controls='collapseSearch'><ArrowDownIcon /></a>
              </div>
                <ul className='collapse desktop-view'  id='collapseSidebar'>
                  <li className='sidebar-nav--item'><Link to={'/support'}>Help with your issues</Link></li>
                  <li className='sidebar-nav--item active'>Help with your order</li>
                </ul>
              </div>
            </div>
            <div className='layout-grid layout-grid--main'>
              <div className='card small-box'>
                <div className='card-body'>
                  <div className='support-issue'>
                    <div className='section-title'>
                      <h6>Select Your Order and Other</h6>
                    </div>
                    <div className='support-other'>
                    <div className="tabs tabs--solid">
                      <ul>
                        <li className="active">
                        <Link to={'/support-order'}>Orders</Link>
                        </li>
                        <li>
                          <a href="">Ads</a>
                        </li>
                      </ul>
                    </div>
                    <div className='search-box'>
                      <input type='text' className='form-input' placeholder='Search' />
                      <button className='search-button'><SearchIcon /></button>
                    </div>
                    </div>
                    <div className='orders'>
                      <div className='order-item'>
                        <div className='image-block'><img src={ProductImage} /></div>
                        <div className='content-block'>
                          <h6>Black+Decker 650W Rebating Planer, KW712</h6>
                          <div className='company-name'>
                            <img src={CompanyLogo} />
                            ABC Group
                          </div>
                          <ul>
                          <li><label>Order ID</label>:<span>#34323423423523</span></li>
                          </ul>
                        </div>
                      </div>
                      <div className='order-item'>
                        <div className='image-block'><img src={ProductImage} /></div>
                        <div className='content-block'>
                          <h6>Black+Decker 650W Rebating Planer, KW712</h6>
                          <div className='company-name'>
                            <img src={CompanyLogo} />
                            ABC Group
                          </div>
                          <ul>
                          <li><label>Order ID</label>:<span>#34323423423523</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SupportOther
