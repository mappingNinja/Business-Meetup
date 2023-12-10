import React,{ useContext, useEffect, useState } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import Auth from '../libs/auth'
import { post } from '../libs/http-hydrate'
function NetworkModal (props) {

  const user = Auth.getCurrentUser();
  const initialNetworkData = props.data;
 
  const [customers, setCustomers] = useState();
  const [retailers, setRetailers] = useState();
  const [dealers, setDealers] = useState();


  useEffect(()=> {
    setCustomers(initialNetworkData.customers)
    setRetailers(initialNetworkData.retailers)
    setDealers(initialNetworkData.dealers)
  },[initialNetworkData])

  const handleNetworkData = (e)=> {
    e.preventDefault();
    const formData = new FormData();

    formData.append('customers', customers)
    formData.append('retailers', retailers)
    formData.append('dealers', dealers)

     post('/user/network_details', formData, {headers:{'Authorization':`Bearer ${user.token}`}})
     .then((reponse)=> {
      if(reponse.status === 200) {
        window.location.reload(false);
      }
     })
     .catch((err)=> {
      alert("Something went wrong.......")
     })
  }

    return (
        <>
<div className="modal fade certifications-modal" id="NetworkModal" tabindex="-1" role="dialog" aria-labelledby="NetworkModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"> Update Network Details </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
                <div className='form-field'>
                  <label className='form-label'>Customers <span className='mendatory'></span></label>
                  <input type='number' name='cname' id='cname' className='form-input' value={customers} placeholder='How many customers you have?' onChange={(e)=> setCustomers(e.target.value)} />
                </div>
                <div className='form-field'>
                  <label className='form-label'>Retailers <span className='mendatory'></span></label>
                  <input type='number' name='cname' id='cname' className='form-input' value={retailers} placeholder='How many retailers you have?' onChange={(e)=> setRetailers(e.target.value)} />
                </div>
                <div className='form-field'>
                  <label className='form-label'>Dealers <span className='mendatory'></span></label>
                  <input type='number' name='cname' id='cname' className='form-input' value={dealers} placeholder='How many dealers you have?' onChange={(e)=> setDealers(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button  type="button" data-dismiss="modal" className="button button-primary" onClick={(e)=> handleNetworkData(e)}>Save</button>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default NetworkModal