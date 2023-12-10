import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/order.scss'
import Header from '../common/header'
import Breadcrumb from "../common/breadcrumb";
import EBill from "../assets/images/e-bil.jpg";
import { Link, useNavigate } from 'react-router-dom';
function ProductEBill () {
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
              <li className='step active'>
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
          <div className='order product-order e-bill-page'>
          <div className='page-title'><h6>E-way Bill receipt (Seller) - (Optional)</h6></div>
            <div className='company-detail e-bill'>
              <img src={EBill} />
            </div>
            <div className='btn-wrap'>
            <Link to={'/product-payment'} className='button button-blue'>Previous</Link>
            <Link to={'/product-material-dispatch'} className='button button-primary'>Next</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductEBill
