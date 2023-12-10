import { useContext, useState, useEffect } from 'react'
import { ReactComponent as Close2Icon } from '../assets/images/close2-icon.svg'
import { ReactComponent as InfoIcon } from '../assets/images/info.svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
function VerifyGSTModal () {
    return (
        <>
<div className="modal fade verify-modal" id="VerifyGSTModal" tabindex="-1" role="dialog" aria-labelledby="VerifyGSTModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Enter GST Number and Verify GST Number</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><Close2Icon /></span>
                </button>
              </div>
              <div className="modal-body">
                <div className='form-field'>
                  <label className='form-label'>GST number<span className='info'><span className='tooltip-icon'>
                  <OverlayTrigger
                    key='mobile-tip'
                    placement='top'
                    overlay={
                      <Tooltip id='tooltip-mobile-tip'>
                        Enter GST Number
                      </Tooltip>
                    }
                  >
                    <InfoIcon />
                  </OverlayTrigger>
                </span></span></label>
                  <input type='text' name='gst' id='gst' className='form-input' placeholder='Enter GST number' />
                </div>
                <div className='form-field'>
                  <label className='form-label'>Mobile Number<span>(associated with GST)</span></label>
                  <input type='text' name='mo_number' id='mo_number' className='form-input' placeholder='Enter Mobile Number' />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button"className="button button-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default VerifyGSTModal