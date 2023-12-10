import React, { useContext, useEffect, useState } from 'react'
import '../common/scss/pages/order.scss'
import Header from '../common/header'
import { ReactComponent as SaveDraftIcon } from '../assets/images/save-draft.svg'
import { ReactComponent as SendOfferIcon } from '../assets/images/send-offer.svg'
import { Link, useNavigate } from 'react-router-dom';
function SendNegotiation () {
  return (
    <>
      <Header home />

      <div className='grey-bg'>
        <div className='container-fluid order-page'>
          <div className='order'>
              <div className='page-title'>
                <h6>Buyer Send Negotiation Price / Buyer View </h6>
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
                  <button className='button button-primary button-primary--bordered'><SendOfferIcon />Send Offer</button>
                  <button className='button button-blue button-blue--bordered'><SaveDraftIcon />Save Draft</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SendNegotiation
