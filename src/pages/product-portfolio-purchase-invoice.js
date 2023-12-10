import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/order.scss'
import Header from '../common/header'
import Breadcrumb from "../common/breadcrumb";
import CompanyLogo from "../assets/images/company-logo.png";
import { ReactComponent as TickIcon } from "../assets/images/tick-icon.svg";
import { Link, useNavigate } from 'react-router-dom';
function ProductPurchaseInvoice () {
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
              <li className='step completed'>
                <div className='step-indicator'>2</div>
                <div className='step-label'>Company Details</div>
                <div className='step-tag'>Buyer/Seller</div>
              </li>
              <li className='step completed'>
                <div className='step-indicator'>3</div>
                <div className='step-label'>Purchase Order</div>
                <div className='step-tag'>Buyer/Seller</div>
              </li>
              <li className='step active'>
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
          <div className='order product-order purchase-order-page'>
          <div className='page-title'><h6>Invoice</h6><button className='button button-primary'>Generate Purchase Order</button></div>
            <div className='company-detail purchase-order'>
              <div className='invoice-top'>
                <div className="row info-box">
                  <div className="col-sm">
                    <div className="info-item">
                      <label>Order Date</label>
                      <span>15/03/2021</span>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="info-item">
                      <label>Order ID</label>
                      <span>#BUM234324</span>
                    </div>
                  </div>
                  <div className="col-sm info-box">
                    <div className="info-item">
                      <label>Price per pc</label>
                      <span>₹10000</span>
                    </div>
                  </div>
                  <div className="col-sm">
                      <div className="info-item">
                        <label>Item Code</label>
                        <span>HHVSSCBH</span>
                      </div>
                    </div>
                    <div className="col-sm info-box">
                      <div className="info-item">
                        <label>HSN Code</label>
                        <span>RVHSVHAB</span>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="info-item">
                        <label>CGST- 9% (a)</label>
                        <span>₹4000</span>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="info-item">
                        <label>SGST- 9% (b)</label>
                        <span>₹4000</span>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="info-item">
                        <label>Total GST: 18% (B)</label>
                        <span>₹4000</span>
                      </div>
                    </div>
                </div>
              </div>
              <div className="flex-box">
                <div className="flex-item">
                  <strong>PO ID: #234345345</strong>
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
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex-item">
                  <strong>Buyer (Bill to)</strong>
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
                            <h6>XYZ Group</h6>
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
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex-item">
                  <div className="row info-box">
                    <div className="col-sm">
                      <div className="info-item">
                        <label>MOBILE NUMBER</label>
                        <span>990XXXXXXX</span>
                      </div>
                    </div>
                    <div className="col-sm info-box">
                      <div className="info-item">
                        <label>BANK IFSC CODE</label>
                        <span>ICIC002XXX</span>
                      </div>
                    </div>
                  </div>
                  <div className="row info-box">
                    <div className="col-sm">
                      <div className="info-item">
                        <label>Email</label>
                        <span>adgg@gmail.com</span>
                      </div>
                    </div>
                    <div className="col-sm info-box">
                      <div className="info-item">
                        <label>Bank Branch</label>
                        <span>PALDI</span>
                      </div>
                    </div>
                  </div>
                  <div className="row info-box">
                    <div className="col-sm">
                      <div className="info-item">
                        <label>BANK NAME</label>
                        <span>ICICI Bank</span>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="info-item">
                        <label>UPI APP</label>
                        <span>GOOGLE PAY, PHONEPE, PAYTM</span>
                      </div>
                    </div>
                  </div>
                  <div className="row info-box">
                    <div className="col-sm">
                      <div className="info-item">
                        <label>BANK ACCOUNT NO</label>
                        <span>13022200XXXXXXX</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='order-table'>
                <table>
                  <thead>
                    <tr>
                      <th>Sr NO</th>
                      <th>General Product Category</th>
                      <th>Product Category, Product Sub Category</th>
                      <th>Product Differentiation</th>
                      <th>Required Qty</th>
                      <th>Seller Offer Price per Qty</th>
                      <th>Total Gross Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Indusstrial Supplies</td>
                      <td>Power Tools, Angle Grinder</td>
                      <td>Brand:Bosch, Size:7</td>
                      <td>5</td>
                      <td>₹70067</td>
                      <td>₹324234</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Indusstrial Supplies</td>
                      <td>Hardware,Nails</td>
                      <td>Brand:Any, Size:1X2</td>
                      <td>3</td>
                      <td>₹34067</td>
                      <td>₹104234</td>
                    </tr>
                    <tr>
                      <td colSpan={'5'}></td>
                      <td className='height-light'>Total</td>
                      <td className='height-light'>₹1234234</td>
                    </tr>
                    <tr>
                      <td colSpan={'5'}></td>
                      <td className='height-light'>2% Freight</td>
                      <td className='height-light'>₹22322</td>
                    </tr>
                    <tr>
                      <td colSpan={'5'}></td>
                      <td className='height-light'>Total after freight</td>
                      <td className='height-light'>₹234322</td>
                    </tr>
                    <tr>
                      <td colSpan={'5'}></td>
                      <td className='height-light'>GST 18%</td>
                      <td className='height-light'>₹24322</td>
                    </tr>
                    <tr>
                      <td className='height-light'>Profile ID</td>
                      <td className='height-light'>23443</td>
                      <td colSpan={'2'} className='height-light'>Payment Terms</td>
                      <td colSpan={'1'} className='height-light'>Advance</td>
                      <td className='height-light'>Total Invoice Value</td>
                      <td className='height-light'>₹234324</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='btn-wrap'>
            <Link to={'/product-purchase-order'} className='button button-blue'>Previous</Link>
              <button className='button button-primary download-btn'>Download Invoice</button>
              <Link to={'/product-bank-detail'} className='button button-primary'>Next</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPurchaseInvoice
