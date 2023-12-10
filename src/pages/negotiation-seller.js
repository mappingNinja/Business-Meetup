import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/short-order.scss'
import Header from '../common/header'
import ProductImage from '../assets/images/product-image1.png'
import CompanyLogo from '../assets/images/company-logo.png'
import { ReactComponent as SearchIcon } from '../assets/images/search-icon.svg'
import { ReactComponent as LinkIcon } from '../assets/images/link-icon.svg'
import { ReactComponent as DownloadIcon } from '../assets/images/short-download.svg'
import InitialOfferReceivedIcon from '../assets/images/initial-offer-received.svg'
import OfferReceivedIcon from '../assets/images/reviced-offer-request.svg'
import RejectedOfferIcon from '../assets/images/rejeted-offer.svg'
import DraftOfferIcon from '../assets/images/draft-offer.svg'
import RequestedOfferIcon from '../assets/images/requested-offer.svg'
import { ReactComponent as SendIcon } from '../assets/images/short-send.svg'
import { ReactComponent as RejectIcon } from '../assets/images/short-reject.svg'
import { ReactComponent as AcceptIcon } from '../assets/images/offer-accept.svg'
import { Link, useNavigate } from 'react-router-dom';
function NegotiationsSeller () {
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
                      <li><label>Description</label>:<span>Lorem Ipsum is simply dummy text of the printing and typesetting indu....</span></li>
                      <li><label>Payment Terms</label>:<span>Credit</span></li>
                      </ul>
                    </div>
                    <div className='right'>
                      <div className='status'>
                      <img src={InitialOfferReceivedIcon} />
                        <span className='status-label'>Initial offer Received</span>
                      </div>
                      <a className='view-btn'><LinkIcon />View Post</a>
                      <div className='btn-wrap'>
                        <button className='button button-green button-green--bordered btn-release'><AcceptIcon />Accept</button>
                        <button className='button button-red button-red--bordered btn-reject'><RejectIcon />Reject</button>
                        <button className='button button-green button-green--bordered btn-release'><SendIcon />Send Revise Offer</button>
                      </div>
                    </div>
                </div>
                <div className='order-item-footer'>
                  <ul>
                    <li>Start Date: 10th Jan 2022</li>
                    <li>QTY: 10</li>
                    <li>Initial price: ₹70032  </li>
                    <li>offer price received from buyer: N/ A</li>
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
                      <li><label>Description</label>:<span>Lorem Ipsum is simply dummy text of the printing and typesetting indu....</span></li>
                      <li><label>Payment Terms</label>:<span>Credit</span></li>
                      </ul>
                    </div>
                    <div className='right'>
                      <div className='status'>
                      <img src={OfferReceivedIcon} />
                        <span className='status-label'>Revised offer request</span>
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
                    <li>offer price received from buyer: N/ A</li>
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
                      <li><label>Description</label>:<span>Lorem Ipsum is simply dummy text of the printing and typesetting indu....</span></li>
                      <li><label>Payment Terms</label>:<span>Credit</span></li>
                      </ul>
                    </div>
                    <div className='right'>
                      <div className='status'>
                      <img src={OfferReceivedIcon} />
                        <span className='status-label'>Revised offer request</span>
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
                    <li>offer price received from buyer: N/ A</li>
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
                      <li><label>Description</label>:<span>Lorem Ipsum is simply dummy text of the printing and typesetting indu....</span></li>
                      <li><label>Payment Terms</label>:<span>Credit</span></li>
                      </ul>
                    </div>
                    <div className='right'>
                    <div className='time color-red'><span>Rejected Date: </span>10th Jan 2022</div>
                      <div className='status'>
                      <img src={RejectedOfferIcon} />
                        <span className='status-label'>Rejected offers</span>
                      </div>
                      <a className='view-btn'><LinkIcon />View Post</a>
                     
                    </div>
                </div>
                <div className='order-item-footer'>
                  <ul>
                    <li>Start Date: 10th Jan 2022</li>
                    <li>QTY: 10</li>
                    <li>Initial price: ₹70032  </li>
                    <li>offer price received from buyer: N/ A</li>
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
                      <li><label>Description</label>:<span>Lorem Ipsum is simply dummy text of the printing and typesetting indu....</span></li>
                      <li><label>Payment Terms</label>:<span>Credit</span></li>
                      </ul>
                    </div>
                    <div className='right'>
                      <div className='status'>
                      <img src={DraftOfferIcon} />
                        <span className='status-label'>Drafts</span>
                      </div>
                      <a className='view-btn'><LinkIcon />View Post</a>
                      <div className='btn-wrap'>
                        <button className='button button-primary'>View Draft</button>
                      </div>
                    </div>
                </div>
                <div className='order-item-footer'>
                  <ul>
                    <li>Start Date: 10th Jan 2022</li>
                    <li>QTY: 10</li>
                    <li>Initial price: ₹70032  </li>
                    <li>offer price received from buyer: N/ A</li>
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
                      <li><label>Description</label>:<span>Lorem Ipsum is simply dummy text of the printing and typesetting indu....</span></li>
                      <li><label>Payment Terms</label>:<span>Credit</span></li>
                      </ul>
                    </div>
                    <div className='right'>
                      <div className='status'>
                      <img src={RequestedOfferIcon} />
                        <span className='status-label'>requested for short order </span>
                      </div>
                      <a className='view-btn'><LinkIcon />View Post</a>
                     
                    </div>
                </div>
                <div className='order-item-footer'>
                  <ul>
                    <li>Start Date: 10th Jan 2022</li>
                    <li>QTY: 10</li>
                    <li>Initial price: ₹70032  </li>
                    <li>offer price received from buyer: N/ A</li>
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

export default NegotiationsSeller
