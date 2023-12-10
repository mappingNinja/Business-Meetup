import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/order.scss'
import Header from '../common/header'
import Breadcrumb from "../common/breadcrumb";
import { ReactComponent as SaveDraftIcon } from '../assets/images/save-draft.svg'
import { ReactComponent as SendOfferIcon } from '../assets/images/send-offer.svg'
import { ReactComponent as NegotiationIcon } from '../assets/images/short-negotiation.svg'
import { Link, useNavigate } from 'react-router-dom';
function ProductShortOrder () {
  return (
    <>
      <Header home />

      <div className='grey-bg'>
        <div className='container-fluid order-page'>
        <Breadcrumb />
        <div className='steps'>
          <ul>
            <li className='step active'>
              <div className='step-indicator'>1</div>
              <div className='step-label'>Short Order</div>
              <div className='step-tag'>Buyers</div>
            </li>
            <li className='step'>
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
          <div className='order product-order'>
              <div className='page-title'>
                <h6>Short Order</h6>
              </div>
              <div className='order-table'>
                <span className='order-id'><strong>Order ID #BUM234324</strong></span>
                <table>
                  <thead>
                    <tr>
                      <th>Sr NO</th>
                      <th>General Product Category</th>
                      <th>Product Category, Product Sub Category</th>
                      <th>Product Differentiation</th>
                      <th>Required Qty</th>
                      <th>Seller Offer Price per Qty</th>
                      <th className='height-light'>Buyer Negotiation Price</th>
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
                      <td className='height-light'><input placeholder='Enter Value' type='text' /></td>
                      <td>₹324234</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Indusstrial Supplies</td>
                      <td>Hardware,Nails</td>
                      <td>Brand:Any, Size:1X2</td>
                      <td>3</td>
                      <td>₹34067</td>
                      <td className='height-light'><input placeholder='Enter Value' type='text' /></td>
                      <td>₹104234</td>
                    </tr>
                    <tr>
                      <td colSpan={'6'}></td>
                      <td className='height-light'>Total</td>
                      <td className='height-light'>₹1234234</td>
                    </tr>
                    <tr>
                      <td colSpan={'6'}></td>
                      <td className='height-light'>2% Freight</td>
                      <td className='height-light'>₹22322</td>
                    </tr>
                    <tr>
                      <td colSpan={'6'}></td>
                      <td className='height-light'>Total after freight</td>
                      <td className='height-light'>₹234322</td>
                    </tr>
                    <tr>
                      <td colSpan={'6'}></td>
                      <td className='height-light'>GST 18%</td>
                      <td className='height-light'>₹24322</td>
                    </tr>
                    <tr>
                      <td className='height-light'>Profile ID</td>
                      <td className='height-light'>23443</td>
                      <td colSpan={'2'} className='height-light'>Payment Terms</td>
                      <td colSpan={'2'} className='height-light'>Advance</td>
                      <td className='height-light'>Total Invoice Value</td>
                      <td className='height-light'>₹234324</td>
                    </tr>
                  </tbody>
                </table>
                <div className='btn-wrap'>
                  <Link to={'/product-company-detail'} className='button button-primary button-primary--bordered'><SendOfferIcon />Send Offer</Link>
                  <Link to={'/negotiation-buyer'} className='button button-primary button-primary--bordered'><NegotiationIcon />Negotiation</Link>
                  <button className='button button-blue button-blue--bordered'><SaveDraftIcon />Save Draft</button>
                  <button className='button button-primary'>Cancel</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductShortOrder
