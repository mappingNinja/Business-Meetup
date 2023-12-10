import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/short-order.scss'
import Header from '../common/header'
import ProductImage from '../assets/images/product-image1.png'
import CompanyLogo from '../assets/images/company-logo.png'
import { ReactComponent as SearchIcon } from '../assets/images/search-icon.svg'
import { ReactComponent as PendingIcon } from '../assets/images/pending.svg'
import { ReactComponent as LinkIcon } from '../assets/images/link-icon.svg'
import { ReactComponent as DownloadIcon } from '../assets/images/short-download.svg'
import { ReactComponent as SendIcon } from '../assets/images/short-send.svg'
import { ReactComponent as RejectIcon } from '../assets/images/short-reject.svg'
import ShortOngoingIcon from '../assets/images/short-ongoing-icon.svg'
import ShortCompletedIcon from '../assets/images/short-comleted.svg'
import { Link, useNavigate } from 'react-router-dom';
function ShortOrderBuyer () {
  return (
    <>
      <Header home />

      <div className='grey-bg'>
        <div className='container-fluid support-page'>
          <div className='short-order'>
            <div className='short-order-head'>
              <div className='page-title'><h6>Short Order</h6></div>
              <div className='order-filter'>
                <div className="tabs tabs--solid">
                  <ul>
                    <li className="active">
                      <Link to={''}>All</Link>
                    </li>
                    <li>
                      <Link to={''}>From Post</Link>
                    </li>
                    <li>
                      <Link to={''}>From Portfolio</Link>
                    </li>
                  </ul>
                </div>
                <div className='search-box'>
                  <input type='text' className='form-input' placeholder='Search' />
                  <button className='search-button'><SearchIcon /></button>
                </div>
              </div>
              <div className="short">
                <select className="form-input"><option>Sort By</option><option>Newest</option><option>Oldest</option></select>
              </div>
            </div>
            <div className="tabs tabs--transparent">
              <ul>
                <li className="active">
                  <Link to={''}>All</Link>
                </li>
                <li>
                  <Link to={''}>Pending request</Link>
                </li>
                <li>
                  <Link to={''}>Ongoing SO</Link>
                </li>
                <li>
                  <Link to={''}>Completed SO</Link>
                </li>
              </ul>
            </div>
            <div className='orders'>
              <div className='order-item'>
                <div className='image-block'><img src={ProductImage} /></div>
                <div className='content-block'>
                    <div className='left'>
                      <h6>Black+Decker 650W Rebating Planer, KW712</h6>
                      <div className='company-name'>
                        <img src={CompanyLogo} />
                        ABC Group
                      </div>
                      <ul>
                      <li><label>Order ID</label>:<span>#34323423423523</span></li>
                      </ul>
                    </div>
                    <div className='right'>
                      <div className='status'>
                        <PendingIcon />
                        <span className='status-label'>Pending request</span>
                      </div>
                      <a className='view-btn'><LinkIcon />View Post</a>
                      <div className='btn-wrap'>
                        <button className='button button-green button-green--bordered btn-release'><SendIcon />Release Short Order</button>
                        <button className='button button-red button-red--bordered btn-reject'><RejectIcon />Reject</button>
                      </div>
                    </div>
                </div>
                <div className='order-item-footer'>
                  <ul>
                    <li>Start Date: 10th Jan 2022</li>
                    <li>QTY: 10</li>
                    <li>Initial price: ₹70032  </li>
                    <li>offer price received from buyer: ₹70032</li>
                    <li>revised offer from me: ₹70032</li>
                    <li>final offer from seller : ₹70032</li>
                  </ul>
                </div>
              </div>
              <div className='order-item'>
                <div className='image-block'><img src={ProductImage} /></div>
                <div className='content-block'>
                    <div className='left'>
                      <h6>Black+Decker 650W Rebating Planer, KW712</h6>
                      <div className='company-name'>
                        <img src={CompanyLogo} />
                        ABC Group
                      </div>
                      <ul>
                      <li><label>Order ID</label>:<span>#34323423423523</span></li>
                      </ul>
                    </div>
                    <div className='right'>
                      <div className='status'>
                      <img src={ShortOngoingIcon} />
                        <span className='status-label'>Ongoing So</span>
                      </div>
                      <a className='view-btn'><LinkIcon />View Post</a>
                      <div className='step-label'><span className='counter'>3</span>Step - 3 (Purchase Order)</div>
                    </div>
                </div>
                <div className='order-item-footer'>
                  <ul>
                    <li>SO release date: 10th Jan 2022</li>
                    <li>SO ID: #12323434</li>
                    <li>PO ID: 12234433</li>
                    <li>Invoice Number: NA </li>
                    <li>final Amout : ₹70032</li>
                  </ul>
                </div>
              </div>
              <div className='order-item'>
                <div className='image-block'><img src={ProductImage} /></div>
                <div className='content-block'>
                    <div className='left'>
                      <h6>Black+Decker 650W Rebating Planer, KW712</h6>
                      <div className='company-name'>
                        <img src={CompanyLogo} />
                        ABC Group
                      </div>
                      <ul>
                      <li><label>Order ID</label>:<span>#34323423423523</span></li>
                      </ul>
                    </div>
                    <div className='right'>
                      <div className='time'><span>Completed date: </span>13th Jan 2022</div>
                      <div className='status'>
                      <img src={ShortCompletedIcon} />
                        <span className='status-label'>Complete</span>
                      </div>
                      <a className='view-btn'><LinkIcon />View Post</a>
                      <button className='button button-primary'><DownloadIcon />Download Invoice</button>
                    </div>
                </div>
                <div className='order-item-footer'>
                  <ul>
                    <li>SO release date: 10th Jan 2022</li>
                    <li>SO ID: #12323434</li>
                    <li>PO ID: 12234433</li>
                    <li>Invoice Number: NA </li>
                    <li>final Amout : ₹70032</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShortOrderBuyer
