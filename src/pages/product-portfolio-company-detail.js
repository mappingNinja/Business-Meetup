import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/order.scss'
import Header from '../common/header'
import Breadcrumb from "../common/breadcrumb";
import CompanyLogo from "../assets/images/company-logo.png";
import { ReactComponent as TickIcon } from "../assets/images/tick-icon.svg";
import { Link, useNavigate } from 'react-router-dom';
function ProductCompanyDetail () {
  return (
    <>
      <Header home />

      <div className='grey-bg'>
        <div className='container-fluid order-page'>
          <Breadcrumb />
          <div className='steps'>
            <ul>
              <li className='step completed'>
                <div className='step-indicator'>1</div>
                <div className='step-label'>Short Order</div>
                <div className='step-tag'>Buyers</div>
              </li>
              <li className='step active'>
                <div className='step-indicator'>2</div>
                <div className='step-label'>Company Details</div>
                <div className='step-tag'>Buyer/Seller</div>
              </li>
              <li className='step'>
                <div className='step-indicator'>3</div>
                <div className='step-label'>Purchase Order</div>
                <div className='step-tag'>Buyer/Seller</div>
              </li>
              <li className='step'>
                <div className='step-indicator'>4</div>
                <div className='step-label'>Invoice</div>
                <div className='step-tag'>Seller</div>
              </li>
              <li className='step'>
                <div className='step-indicator'>5</div>
                <div className='step-label'>Bank Details</div>
                <div className='step-tag'>Seller</div>
              </li>
              <li className='step'>
                <div className='step-indicator'>6</div>
                <div className='step-label'>Payment</div>
                <div className='step-tag'>Buyers</div>
              </li>
              <li className='step'>
                <div className='step-indicator'>7</div>
                <div className='step-label'>E-way Bill</div>
                <div className='step-tag'>Seller</div>
              </li>
              <li className='step'>
                <div className='step-indicator'>8</div>
                <div className='step-label'>Material Dispatch</div>
                <div className='step-tag'>Seller</div>
              </li>
              <li className='step'>
                <div className='step-indicator'>9</div>
                <div className='step-label'>Delivered</div>
                <div className='step-tag'>Buyer/Seller</div>
              </li>
            </ul>
          </div>
          <div className='order product-order company-detail-page'>
            <div className='company-detail'>
              <div className="flex-box">
                <div className="flex-item">
                  <div className='page-title'><h6>Company Details - Sellers</h6></div>
                  <input
                    type="radio"
                    name="company_detail"
                    id="company_detail"
                  />
                  <label htmlFor="company_detail">
                    <span className="tick-mark">
                      <TickIcon />
                    </span>
                    <div className="company-detail--filled">
                      <div className="company-profile">
                        <div className="company-profile-image">
                          <img src={CompanyLogo} className="profile-pic"/>
                        </div>
                        <div className="company-profile-content">
                          <div className="company-profile-name">
                            <h6>ABC Group</h6>
                            <ul>
                              <li>
                                <label>GST</label>:
                                <span>NHXXXXXXX0834<span className="verified"><TickIcon /></span></span>
                              </li>
                              <li>
                                <label>PAN NO</label>:
                                <span>CGAEWD2432p<span className="verified"><TickIcon /></span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="company-info">
                        <div className="info-box">
                          <div className="info-item">
                            <label>Shipping Address</label>
                            <span>38, XYN ESTATE, PALDI, AHMEDABAD-380002</span>
                            </div>
                          <div className="row">
                            <div className="col-sm">
                              <div className="info-item">
                                <label>STATE</label>
                                <span>GUJARAT</span>
                              </div>
                            </div>
                            <div className="col-sm">
                              <div className="info-item">
                                <label>STATE CODE</label>
                                <span>24</span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm">
                              <div className="info-item">
                                <label>MOBILE NUMBER</label>
                                <span>990XXXXXXX</span>
                              </div>
                            </div>
                            <div className="col-sm">
                              <div className="info-item">
                                <label>EMAIL ID</label>
                                <span>xyzcorpo@gmail.com</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex-item">
                  <div className='page-title'><h6>Company Details - Buyer</h6></div>
                  <input
                    type="radio"
                    name="company_detail"
                    id="company_detail"
                  />
                  <label htmlFor="company_detail">
                    <span className="tick-mark">
                      <TickIcon />
                    </span>
                    <div className="company-detail--filled">
                      <div className="company-profile">
                        <div className="company-profile-image">
                          <img src={CompanyLogo} className="profile-pic"/>
                        </div>
                        <div className="company-profile-content">
                          <div className="company-profile-name">
                            <h6>India Mart Group</h6>
                            <ul>
                              <li>
                                <label>GST</label>:
                                <span>NHXXXXXXX0834<span className="verified"><TickIcon /></span></span>
                              </li>
                              <li>
                                <label>PAN NO</label>:
                                <span>CGAEWD2432p<span className="verified"><TickIcon /></span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="company-info">
                        <div className="info-box">
                          <div className="info-item">
                            <label>Shipping Address</label>
                            <span>38, XYN ESTATE, PALDI, AHMEDABAD-380002</span>
                            </div>
                          <div className="row">
                            <div className="col-sm">
                              <div className="info-item">
                                <label>STATE</label>
                                <span>GUJARAT</span>
                              </div>
                            </div>
                            <div className="col-sm">
                              <div className="info-item">
                                <label>STATE CODE</label>
                                <span>24</span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm">
                              <div className="info-item">
                                <label>MOBILE NUMBER</label>
                                <span>990XXXXXXX</span>
                              </div>
                            </div>
                            <div className="col-sm">
                              <div className="info-item">
                                <label>EMAIL ID</label>
                                <span>xyzcorpo@gmail.com</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className='btn-wrap'>
            <Link to={'/product-short-order'} className='button button-blue'>Previous</Link>
            <Link to={'/product-purchase-order'} className='button button-primary'>Next</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCompanyDetail
