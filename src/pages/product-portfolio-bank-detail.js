import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/order.scss'
import Header from '../common/header'
import Breadcrumb from "../common/breadcrumb";
import UPICode from "../assets/images/upi-qr-code.jpg";
import { Link, useNavigate } from 'react-router-dom';
function ProductBankDetail () {
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
              <li className='step completed'>
                <div className='step-indicator'>4</div>
                <div className='step-label'>Invoice</div>
                <div className='step-tag'>Seller</div>
              </li>
              <li className='step active'>
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
          <div className='order product-order bank-detail-page'>
          <div className='page-title'><h6>Bank Details - Sellers</h6></div>
            <div className='company-detail bank-detail'>
              <div className="flex-box">
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
                  <div className='upi-code'>
                    <div className='upi-code-number info-box'>
                      <div className="info-item">
                        <label>UPI APP NUMBER</label>
                        <span>8017562618</span>
                      </div>
                    </div>
                    <div className='upi-code-qr'>
                      <img src={UPICode} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='btn-wrap'>
            <Link to={'/product-purchase-invoice'} className='button button-blue'>Previous</Link>
            <Link to={'/product-payment'} className='button button-primary'>Next</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductBankDetail
