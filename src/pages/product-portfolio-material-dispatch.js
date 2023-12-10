import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/order.scss'
import Header from '../common/header'
import Breadcrumb from "../common/breadcrumb";
import { ReactComponent as AttachmentIcon } from '../assets/images/attachment.svg'
import { Link, useNavigate } from 'react-router-dom';
function ProductMaterialDispatch () {
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
              <li className='step completed'>
                <div className='step-indicator'>6</div>
                <div className='step-label'>Payment</div>
                <div className='step-tag'>Buyers</div>
              </li>
              <li className='step completed'>
                <div className='step-indicator'>7</div>
                <div className='step-label'>E-way Bill</div>
                <div className='step-tag'>Seller</div>
              </li>
              <li className='step active'>
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
          <div className='page-title'><h6>Dockets Details - (Seller)</h6></div>
            <div className='company-detail bank-detail'>
              <div className='row'>
                <div className='form-field col-sm'>
                  <label className='form-label'>Transporter</label>
                  <input type='text' name='Transporter' id='Transporter' className='form-input' placeholder='Enter Your Transporter Name' />
                </div>
                <div className='form-field col-sm'>
                  <label className='form-label'>Docket Number</label>
                  <input type='text' name='docket_num' id='docket_num' className='form-input' placeholder='Enter Your Docket Number' />
                </div>
              </div>
              <div className='row'>
                <div className='form-field col-sm'>
                  <label className='form-label'>Shipment Date</label>
                  <input type='date' name='sdate' id='sdate' className='form-input' placeholder='Please Select Date' />
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
            <Link to={'/product-e-bill'} className='button button-blue'>Previous</Link>
            <Link to={'/product-delivered'} className='button button-primary'>Next</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductMaterialDispatch
