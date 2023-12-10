import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/order.scss'
import Header from '../common/header'
import Breadcrumb from "../common/breadcrumb";
import { ReactComponent as AttachmentIcon } from '../assets/images/attachment.svg'
import { Link, useNavigate } from 'react-router-dom';
function ProductPayment () {
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
              <li className='step completed'>
                <div className='step-indicator'>5</div>
                <div className='step-label'>Bank Details</div>
                <div className='step-tag'>Seller</div>
              </li>
              <li className='step active'>
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
          <div className='page-title'><h6>Payment Release - (Buyer)</h6></div>
            <div className='company-detail bank-detail'>
              <div className='row'>
                <div className='form-field col-sm'>
                  <label className='form-label'>Bank Name/Payment Mode</label>
                  <input type='text' name='mode' id='mode' className='form-input' placeholder='Enter Your Bank Name' />
                </div>
                <div className='form-field col-sm'>
                  <label className='form-label'>Account Number</label>
                  <input type='text' name='acc_num' id='acc_num' className='form-input' placeholder='Enter Your Account Number' />
                </div>
              </div>
              <div className='row'>
                <div className='form-field col-sm'>
                  <label className='form-label'>Payment Date</label>
                  <input type='date' name='pdate' id='pdate' className='form-input' placeholder='Please Select Date' />
                </div>
                <div className='form-field col-sm'>
                  <label className='form-label'>Amout</label>
                  <input type='text' name='amount' id='amount' className='form-input' placeholder='Enter Your Amount' />
                </div>
              </div>
              <div className='row'>
                <div className='form-field col-sm'>
                  <label className='form-label'>Reference ID</label>
                  <input type='text' name='rid' id='rid' className='form-input' placeholder='Enter Your Reference ID' />
                </div>
                <div className='form-field col-sm'>
                      <label className='form-label'>Attach File</label>
                      <div className='file-upload'>
                        <input type='file' id='upload_attachement' />
                        <label htmlFor='upload_attachement'>Please choose your attachment file<span className='icon'><AttachmentIcon /></span></label>
                      </div>
                    </div>
              </div>
            </div>
            <div className='btn-wrap'>
            <Link to={'/product-bank-detail'} className='button button-blue'>Previous</Link>
            <Link to={'/product-e-bill'} className='button button-primary'>Next</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPayment
